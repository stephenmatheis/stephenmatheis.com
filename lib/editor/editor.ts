import { render } from './render';
import { Keyboard } from './keyboard';
import { MouseHandlers } from './mouse';
import { History } from './history';
import { Cursor } from './cursor';
import { Buffer } from './buffer';
import { Selection } from './selection';
import { Canvas } from './setup';
import { log } from '@/lib/utils';
import { compose, getInputRef } from '@/lib/editor/tui';
import type { InputEventName, InputNode, InputRef, LayoutNode, Region } from '@/lib/editor/tui';

export type CellStyle = {
    bg?: string | null;
    placeholder?: string;
};

export type CellPos = {
    x: number;
    y: number;
};

export type Selected = {
    start: CellPos;
    end: CellPos;
    rect?: boolean;
};

export type Snapshot = {
    chars: string[][];
    cursor: CellPos;
};

export type EditorState = {
    cellWidth: number;
    cellHeight: number;
    fontStr: string;
    chars: string[][];
    displayChars: string[][];
    cols: number;
    rows: number;
    cursor: CellPos;
    regions: Region[];
    activeRegion: Region | null;
    cellStyles: Array<Array<CellStyle | null>>;
    displayCellStyles: Array<Array<CellStyle | null>>;
    selected: Selected | null;
    cursorVisible: boolean;
    isDragging: boolean;
    selectionAnchor: CellPos | null;
    keyboardAnchor: CellPos | null;
    undoStack: Snapshot[];
    redoStack: Snapshot[];
};

type Editor = {
    canvas: HTMLCanvasElement;
    textarea: HTMLTextAreaElement;
    container: HTMLElement;
};

export type StatusBar = {
    left?: string;
    center?: string;
    right?: string;
};

export type FloatAnchor =
    | { type: 'absolute'; x: number; y: number }
    | { type: 'cell'; cell: CellPos; side: 'below' | 'above' | 'right' | 'left' }
    | {
          type: 'corner';
          corner: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
          offsetX?: number;
          offsetY?: number;
      };

function Content(template: string, state: EditorState): string {
    const r = state.activeRegion;

    return template.replace(/\{(\w+)\}/g, (_, token: string) => {
        if (!r) return '';

        switch (token) {
            case 'ln':
                return String(state.cursor.y - r.y + 1);
            case 'col':
                return String(state.cursor.x - r.x + 1);
            case 'r_rows':
                return String(r.height);
            case 'r_cols':
                return String(r.width);
            case 'rows':
                return String(state.rows);
            case 'cols':
                return String(state.cols);
            default:
                return `{${token}}`;
        }
    });
}

// chars param is always mainChars — status bar must live in the main layer, not the active write layer.
function composeStatusBar(config: StatusBar, state: EditorState, chars: string[][]) {
    const row = state.rows - 1;

    if (row < 0 || row >= chars.length) return;

    for (let col = 0; col < state.cols; col++) {
        chars[row][col] = '';
    }

    if (config.left) {
        const content = Content(config.left, state);

        for (let i = 0; i < content.length && i < state.cols; i++) {
            chars[row][i] = content[i];
        }
    }

    if (config.center) {
        const content = Content(config.center, state);
        const startX = Math.floor((state.cols - content.length) / 2);

        for (let i = 0; i < content.length; i++) {
            const col = startX + i;

            if (col >= 0 && col < state.cols) {
                chars[row][col] = content[i];
            }
        }
    }

    if (config.right) {
        const content = Content(config.right, state);
        const startX = state.cols - content.length;

        for (let i = 0; i < content.length; i++) {
            const col = startX + i;
            if (col >= 0 && col < state.cols) {
                chars[row][col] = content[i];
            }
        }
    }
}

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

    let currentNode: LayoutNode | null = null;
    let statusBarConfig: StatusBar | null = null;
    let currentModal: LayoutNode | null = null;
    let savedRegionIndex = 0;

    // Layer buffers: mainChars is always the main layout; state.chars is the active write target
    // (= mainChars when no modal, = fresh modal buffer when modal is open).
    // state.displayChars is the composited output that render reads.
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

        collectInputs(positioned);
        focusRegion(0);
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

        collectInputs(currentNode!);
        focusRegion(savedRegionIndex);
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
        render(ctx, state);
    }

    function readInputValue(ref: InputRef): string {
        if (!ref.chars || !ref.region) return '';

        return (ref.chars[ref.region.y] ?? [])
            .slice(ref.region.x, ref.region.x + ref.region.width)
            .join('')
            .trimEnd();
    }

    function getActiveInput(): InputNode | null {
        return state.activeRegion ? (inputMap.get(state.activeRegion) ?? null) : null;
    }

    function emitInputEvent(event: InputEventName) {
        const input = getActiveInput();

        if (!input) return;

        const ref = getInputRef(input);

        if (!ref) return;

        ref.handlers[event]?.(readInputValue(ref));
    }

    function checkAndEmitChange() {
        const input = getActiveInput();

        if (!input) return;

        const ref = getInputRef(input);

        if (!ref) return;

        const current = readInputValue(ref);

        if (current !== ref.valueOnFocus) {
            ref.handlers.change?.(current);
            ref.valueOnFocus = current;
        }
    }

    function focusNext() {
        checkAndEmitChange();

        const i = state.activeRegion ? state.regions.indexOf(state.activeRegion) : -1;

        focusRegion(i + 1);
    }

    function focusPrev() {
        checkAndEmitChange();

        const i = state.activeRegion ? state.regions.indexOf(state.activeRegion) : 0;

        focusRegion(i - 1);
    }

    function focusRegion(index: number) {
        if (state.regions.length === 0) return;

        const i = ((index % state.regions.length) + state.regions.length) % state.regions.length;

        state.activeRegion = state.regions[i];

        const input = inputMap.get(state.activeRegion);

        if (input) {
            const ref = getInputRef(input);

            if (ref) {
                const value = readInputValue(ref);

                ref.valueOnFocus = value;

                state.cursor = {
                    x: Math.min(
                        state.activeRegion.x + value.length,
                        state.activeRegion.x + state.activeRegion.width - 1,
                    ),
                    y: state.activeRegion.y,
                };
            }
        } else {
            const r = state.activeRegion;
            let cx = r.x;
            let cy = r.y;

            for (let row = r.y + r.height - 1; row >= r.y; row--) {
                const text = (state.chars[row] ?? [])
                    .slice(r.x, r.x + r.width)
                    .join('')
                    .trimEnd();

                if (text.length > 0) {
                    cx = Math.min(r.x + text.length, r.x + r.width - 1);
                    cy = row;
                    break;
                }
            }

            state.cursor = { x: cx, y: cy };
        }
    }

    function focusAtCell(x: number, y: number): boolean {
        checkAndEmitChange();

        const index = state.regions.findIndex((r) => x >= r.x && x < r.x + r.width && y >= r.y && y < r.y + r.height);

        if (index === -1) return false;

        state.activeRegion = state.regions[index];

        const input = inputMap.get(state.activeRegion);

        if (input) {
            const ref = getInputRef(input);

            if (ref) {
                ref.valueOnFocus = readInputValue(ref);
            }
        }

        return true;
    }

    function getComposeChars() {
        return statusBarConfig ? mainChars.slice(0, -1) : mainChars;
    }

    function collectInputs(node: LayoutNode) {
        if (node.kind === 'input') {
            const ref = getInputRef(node);

            if (ref?.region) {
                ref.draw = draw;
                inputMap.set(ref.region, node);
            }
        } else if (node.kind === 'box') {
            for (const child of node.children) {
                collectInputs(child);
            }
        }
    }

    function applyLayout(node: LayoutNode, chars: string[][]): void {
        const regions = compose(node, chars);

        state.regions = regions;
        state.activeRegion = regions[0] ?? null;

        if (state.activeRegion) {
            state.cursor = { x: state.activeRegion.x, y: state.activeRegion.y };
        }

        inputMap.clear();

        collectInputs(node);
    }

    const cursor = Cursor(state);
    const buffer = Buffer({ state, actions: { moveCursor: cursor.moveCursor } });
    const selection = Selection(state);
    const history = History({ state, actions: { draw, clearSelection: selection.clearSelection } });

    const { handleKeyDown } = Keyboard({
        state,
        draw,
        cursor,
        buffer,
        history,
        selection,
        focus: { focusNext, focusPrev },
        inputActions: {
            isActiveInput: () => inputMap.has(state.activeRegion!),
            emitEvent: emitInputEvent,
            emitChangeIfChanged: checkAndEmitChange,
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
            focusAtCell,
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
        actions: { draw },
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

                collectInputs(positioned);

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
        },
    };
}
