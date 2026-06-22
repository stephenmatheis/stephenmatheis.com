import { render, readTheme } from './render';
import type { Theme } from './render';
import { Keyboard } from './keyboard';
import { MouseHandlers } from './mouse';
import { History } from './history';
import { Cursor } from './cursor';
import { Buffer } from './buffer';
import { Selection } from './selection';
import { Canvas } from './setup';
import { Focus, readInputValue } from './focus';
import { composeStatusBar } from './statusbar';
import { log } from '@/lib/utils';
import { compose, getInputRef, disposeInput } from '@/lib/editor/tui';
import type { InputNode, LayoutNode, Region } from '@/lib/editor/tui';
import type { CellPos, CellStyle, Selected, EditorState, StatusBar, FloatAnchor } from './types';
export type { CellPos, CellStyle, Selected, Snapshot, EditorState, StatusBar, FloatAnchor } from './types';

type Editor = {
    canvas: HTMLCanvasElement;
    textarea: HTMLTextAreaElement;
    container: HTMLElement;
};

export function Editor({ canvas, textarea, container }: Editor) {
    const ctx = canvas.getContext('2d')!;

    log('EditorState created.');
    const state: EditorState = {
        cellWidth: 0,
        cellHeight: 0,
        fontStr: '',
        chars: [],
        displayChars: [],
        cols: 0,
        rows: 0,
        cursor: { x: 0, y: 0 },
        regions: [],
        activeRegion: null,
        cellStyles: [],
        displayCellStyles: [],
        selected: null,
        cursorVisible: true,
        isDragging: false,
        selectionAnchor: null,
        keyboardAnchor: null,
        undoStack: [],
        redoStack: [],
    };

    const inputMap = new Map<Region, InputNode>();

    let theme: Theme = readTheme();
    let currentNode: LayoutNode | null = null;
    let statusBarConfig: StatusBar | null = null;
    let currentModal: LayoutNode | null = null;
    let savedRegionIndex = 0;

    // Buffer layer invariant:
    //   mainChars        — the permanent main-layout buffer; always holds the composed main content.
    //   state.chars      — the active write target. Equals mainChars in normal operation; redirected to
    //                      a fresh grid when a modal is open so modal edits don't corrupt main content.
    //   state.displayChars — the composited output render() reads. Equals mainChars when no overlays are
    //                        active; a separate merged grid when a modal or float is visible. Layering
    //                        priority (highest first): modal > float > main.
    //
    // Six sites perform ref-swaps: showModal, hideModal, showFloat, clearFloat, hideFloat, and the Canvas
    // layout callback. All must leave these three pointers consistent when they return.
    let mainChars: string[][] = [];
    let mainCellStyles: Array<Array<CellStyle | null>> = [];
    let savedRegions: Region[] = [];
    let modalRect: { x: number; y: number; w: number; h: number } | null = null;
    let currentFloat: LayoutNode | null = null;
    let floatChars: string[][] | null = null;
    let floatRect: { x: number; y: number; w: number; h: number } | null = null;

    function createGrid<T>(fill: T): T[][] {
        return Array.from({ length: state.rows }, () => Array(state.cols).fill(fill));
    }

    function inRect(r: number, c: number, rect: { x: number; y: number; w: number; h: number } | null): boolean {
        if (!rect) return false;
        return r >= rect.y && r < rect.y + rect.h && c >= rect.x && c < rect.x + rect.w;
    }

    // Merge layers into display buffers. Priority (highest first): modal → float → main.
    // Each layer's bounding rect suppresses backfill from lower layers so empty interior
    // cells don't bleed through from the layer beneath.
    function compositeChars() {
        for (let r = 0; r < state.rows; r++) {
            for (let c = 0; c < state.cols; c++) {
                if (inRect(r, c, modalRect)) {
                    // state.chars is the modal write layer when a modal is open.
                    state.displayChars[r][c] = state.chars[r]?.[c] || '';
                } else if (inRect(r, c, floatRect)) {
                    state.displayChars[r][c] = floatChars![r]?.[c] || '';
                } else {
                    state.displayChars[r][c] = mainChars[r]?.[c] || '';
                }
            }
        }
    }

    function compositeStyles() {
        for (let r = 0; r < state.rows; r++) {
            for (let c = 0; c < state.cols; c++) {
                if (inRect(r, c, modalRect)) {
                    state.displayCellStyles[r][c] = state.cellStyles[r]?.[c] ?? null;
                } else if (inRect(r, c, floatRect)) {
                    // Floats are visual-only in v1 — no cellStyles layer.
                    state.displayCellStyles[r][c] = null;
                } else {
                    state.displayCellStyles[r][c] = mainCellStyles[r]?.[c] ?? null;
                }
            }
        }
    }

    // Rebuild the per-cell style grid every draw so placeholder/background stay
    // in sync with live input values without touching state.chars.
    function applyInputOverlays() {
        if (!state.cellStyles.length) return;

        for (let r = 0; r < state.rows; r++) {
            for (let c = 0; c < state.cols; c++) {
                state.cellStyles[r][c] = null;
            }
        }

        for (const [region, node] of inputMap) {
            const ref = getInputRef(node);
            if (!ref) continue;

            const isEmpty = readInputValue(ref) === '';
            const placeholder = node.placeholder ?? '';

            for (let y = region.y; y < region.y + region.height; y++) {
                for (let x = region.x; x < region.x + region.width; x++) {
                    if (y < 0 || y >= state.rows || x < 0 || x >= state.cols) continue;

                    const style: CellStyle = {};

                    if (node.background !== false) {
                        style.bg = typeof node.background === 'string' ? node.background : null;
                    }

                    if (placeholder && isEmpty) {
                        const idx = x - region.x;
                        if (idx < placeholder.length) style.placeholder = placeholder[idx];
                    }

                    state.cellStyles[y][x] = style;
                }
            }
        }
    }

    function positionModal(node: LayoutNode) {
        const w = (node as { width?: number }).width ?? 60;
        const h = (node as { height?: number }).height ?? 20;
        const x = Math.max(0, Math.floor((state.cols - w) / 2));
        const y = Math.max(0, Math.floor((state.rows - h) / 2));

        return { positioned: { ...node, x, y, width: w, height: h } as LayoutNode, x, y, w, h };
    }

    function showModal(node: LayoutNode) {
        savedRegionIndex = state.activeRegion ? Math.max(0, state.regions.indexOf(state.activeRegion)) : 0;
        savedRegions = state.regions;

        // Snapshot main input styles before we swap inputMap to the modal.
        const priorCellStyles = state.cellStyles;

        mainCellStyles = createGrid<CellStyle | null>(null);

        state.cellStyles = mainCellStyles;

        applyInputOverlays();

        state.cellStyles = priorCellStyles;

        // Redirect the active write layer to a fresh modal buffer.
        mainChars = state.chars;

        state.chars = createGrid('');
        state.cellStyles = createGrid<CellStyle | null>(null);
        state.displayChars = createGrid('');
        state.displayCellStyles = createGrid<CellStyle | null>(null);

        currentModal = node;

        const { positioned, x, y, w, h } = positionModal(node);

        modalRect = { x, y, w, h };

        const modalRegions = compose(positioned, state.chars);

        state.regions = modalRegions;

        inputMap.clear();

        focus.collectInputs(positioned);
        focus.focusRegion(0);
        draw();
    }

    function hideModal() {
        currentModal = null;
        modalRect = null;

        state.chars = mainChars;
        state.cellStyles = mainCellStyles;

        if (!currentFloat) {
            state.displayChars = mainChars;
            state.displayCellStyles = mainCellStyles;
        }

        state.regions = savedRegions;

        inputMap.clear();

        focus.collectInputs(currentNode!);
        focus.focusRegion(savedRegionIndex);
        draw();
    }

    function positionFloat(node: LayoutNode, anchor?: FloatAnchor) {
        const w = (node as { width?: number }).width ?? 40;
        const h = (node as { height?: number }).height ?? 10;
        let x = 0,
            y = 0;
        const a: FloatAnchor = anchor ?? { type: 'corner', corner: 'top-right' };

        if (a.type === 'absolute') {
            x = a.x;
            y = a.y;
        } else if (a.type === 'cell') {
            x = a.side === 'right' ? a.cell.x + 1 : a.side === 'left' ? a.cell.x - w : a.cell.x;
            y = a.side === 'below' ? a.cell.y + 1 : a.side === 'above' ? a.cell.y - h : a.cell.y;
        } else {
            const ox = a.offsetX ?? 1;
            const oy = a.offsetY ?? 1;
            x = a.corner.includes('right') ? state.cols - w - ox : ox;
            y = a.corner.includes('bottom') ? state.rows - h - oy : oy;
        }

        x = Math.max(0, Math.min(x, state.cols - w));
        y = Math.max(0, Math.min(y, state.rows - h));

        return { positioned: { ...node, x, y, width: w, height: h } as LayoutNode, x, y, w, h };
    }

    function showFloat(node: LayoutNode, anchor?: FloatAnchor) {
        currentFloat = node;
        // Capture current main styles before allocating the composite buffer.
        // mainCellStyles is only set in the modal path, so without a prior modal
        // it stays as [] and compositeStyles would return null for every cell.
        mainCellStyles = state.cellStyles;
        floatChars = createGrid('');

        const { positioned, x, y, w, h } = positionFloat(node, anchor);

        floatRect = { x, y, w, h };

        compose(positioned, floatChars);

        // Float doesn't redirect state.chars, change regions, or trap focus.
        // Allocate a separate composite buffer if display still points at mainChars.
        if (state.displayChars === mainChars) {
            state.displayChars = createGrid('');
            state.displayCellStyles = createGrid<CellStyle | null>(null);
        }

        draw();
    }

    // State-only teardown, no draw. Used by both hideFloat() and dismissFloatIfOutside
    // so the latter can let handleMouseDown's own draw() cover the render.
    function clearFloat() {
        currentFloat = null;
        floatChars = null;
        floatRect = null;

        if (!currentModal) {
            state.displayChars = mainChars;
            state.displayCellStyles = mainCellStyles;
        }
    }

    function hideFloat() {
        clearFloat();
        draw();
    }

    function draw() {
        if (!currentNode) return;

        applyInputOverlays();

        if (statusBarConfig) {
            log('draw() > writeStatusBar()');
            composeStatusBar(statusBarConfig, state, mainChars);
        }

        if (currentModal || currentFloat) {
            compositeChars();
            compositeStyles();
        }

        log('draw() > render()');
        render(ctx, state, theme);
    }

    function getComposeChars() {
        return statusBarConfig ? mainChars.slice(0, -1) : mainChars;
    }

    function applyLayout(node: LayoutNode, chars: string[][]): void {
        const regions = compose(node, chars);

        state.regions = regions;
        state.activeRegion = regions[0] ?? null;

        if (state.activeRegion) {
            state.cursor = { x: state.activeRegion.x, y: state.activeRegion.y };
        }

        inputMap.clear();

        focus.collectInputs(node);
    }

    const focus = Focus({ state, inputMap, draw });
    const cursor = Cursor(state);
    const buffer = Buffer({ state, cursor });
    const selection = Selection(state);
    const history = History({ state, selection });

    const { handleKeyDown } = Keyboard({
        state,
        draw,
        cursor,
        buffer,
        history,
        selection,
        focus: { focusNext: focus.focusNext, focusPrev: focus.focusPrev },
        inputActions: {
            isActiveInput: () => inputMap.has(state.activeRegion!),
            emitEvent: focus.emitInputEvent,
            emitChangeIfChanged: focus.checkAndEmitChange,
        },
        modalActions: {
            isOpen: () => currentModal !== null,
            dismiss: hideModal,
        },
        floatActions: {
            isOpen: () => currentFloat !== null,
            dismiss: hideFloat,
        },
    });
    const { handleMouseDown, handleMouseMove, handleMouseUp } = MouseHandlers({
        canvas,
        textarea,
        state,
        actions: {
            draw,
            startMouseSelection: selection.startMouseSelection,
            extendMouseSelection: selection.extendMouseSelection,
            endMouseSelection: selection.endMouseSelection,
            focusAtCell: focus.focusAtCell,
            endOfContent: () => (state.activeRegion ? focus.endOfContent(state.activeRegion) : { x: 0, y: 0 }),
            setCursor: cursor.jumpTo,
            dismissFloatIfOutside(cell: CellPos): boolean {
                if (currentFloat && floatRect && !inRect(cell.y, cell.x, floatRect)) {
                    clearFloat();

                    return true;
                }

                return false;
            },
        },
    });
    const { setSize } = Canvas({
        canvas,
        ctx,
        state,
        actions: {
            draw,
            onResize() {
                theme = readTheme();
            },
        },
        layout(chars) {
            log('? createSetup() > layout()');

            if (currentModal) {
                mainChars = createGrid('');

                if (currentNode) {
                    applyLayout(currentNode, statusBarConfig ? mainChars.slice(0, -1) : mainChars);

                    const savedCellStyles = state.cellStyles;

                    mainCellStyles = createGrid<CellStyle | null>(null);

                    state.cellStyles = mainCellStyles;

                    applyInputOverlays();

                    state.cellStyles = savedCellStyles;
                }

                state.chars = createGrid('');
                state.cellStyles = createGrid<CellStyle | null>(null);
                state.displayChars = chars;
                state.displayCellStyles = state.cellStyles;

                const { positioned, x, y, w, h } = positionModal(currentModal);

                modalRect = { x, y, w, h };

                const modalRegions = compose(positioned, state.chars);

                state.regions = modalRegions;

                inputMap.clear();

                focus.collectInputs(positioned);

                if (state.activeRegion) {
                    state.cursor = {
                        x: state.activeRegion.x,
                        y: state.activeRegion.y,
                    };
                }
            } else {
                mainChars = chars;
                state.displayChars = chars;
                state.displayCellStyles = state.cellStyles;

                if (!currentNode) return;

                log('! createSetup() > layout() > compose()');
                applyLayout(currentNode, statusBarConfig ? mainChars.slice(0, -1) : mainChars);

                if (currentFloat) {
                    state.displayChars = createGrid('');
                    state.displayCellStyles = createGrid<CellStyle | null>(null);

                    floatChars = createGrid('');

                    const { positioned: fp, x: fx, y: fy, w: fw, h: fh } = positionFloat(currentFloat);

                    floatRect = { x: fx, y: fy, w: fw, h: fh };

                    compose(fp, floatChars);
                }
            }

            if (currentModal && currentFloat) {
                floatChars = createGrid('');

                const { positioned: fp, x: fx, y: fy, w: fw, h: fh } = positionFloat(currentFloat);

                floatRect = { x: fx, y: fy, w: fw, h: fh };

                compose(fp, floatChars);
            }
        },
    });

    log('Attach event listeners.');
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseup', handleMouseUp);
    textarea.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', setSize);
    textarea.focus();

    return {
        get cols() {
            return state.cols;
        },
        get rows() {
            return state.rows;
        },
        get cursor() {
            return state.cursor;
        },
        get activeRegion() {
            return state.activeRegion;
        },
        root: {
            add(node: LayoutNode) {
                currentNode = node;

                log('editor.root.add() > compose()');
                applyLayout(node, getComposeChars());

                log('editor.root.add() > draw()');
                draw();
            },
        },
        modal: {
            show: showModal,
            hide: hideModal,
        },
        float: {
            show: showFloat,
            hide: hideFloat,
        },
        statusBar(config: StatusBar) {
            statusBarConfig = config;

            if (currentNode) {
                log('editor.statusBar() > compose()');
                applyLayout(currentNode, getComposeChars());
            }

            log('editor.statusBar() > draw()');
            draw();
        },
        destroy() {
            container.removeEventListener('mousedown', handleMouseDown);
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseup', handleMouseUp);
            textarea.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('resize', setSize);

            for (const node of inputMap.values()) {
                disposeInput(node);
            }

            inputMap.clear();
        },
    };
}
