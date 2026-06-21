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

    function createGrid<T>(fill: T): T[][] {
        return Array.from({ length: state.rows }, () => Array(state.cols).fill(fill));
    }

    // Merge modal layer on top of main layer into the display buffers.
    function compositeChars() {
        for (let r = 0; r < state.rows; r++) {
            for (let c = 0; c < state.cols; c++) {
                state.displayChars[r][c] = state.chars[r]?.[c] || mainChars[r]?.[c] || '';
            }
        }
    }

    function compositeStyles() {
        for (let r = 0; r < state.rows; r++) {
            for (let c = 0; c < state.cols; c++) {
                state.displayCellStyles[r][c] = state.cellStyles[r]?.[c] ?? mainCellStyles[r]?.[c] ?? null;
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
        const { positioned } = positionModal(node);
        const modalRegions = compose(positioned, state.chars);
        state.regions = modalRegions;
        inputMap.clear();
        collectInputs(positioned);
        focusRegion(0);
        draw();
    }

    function hideModal() {
        currentModal = null;

        state.chars = mainChars;
        state.displayChars = mainChars;
        state.cellStyles = mainCellStyles;
        state.displayCellStyles = mainCellStyles;
        state.regions = savedRegions;

        inputMap.clear();

        collectInputs(currentNode!);
        focusRegion(savedRegionIndex);
        draw();
    }

    function draw() {
        if (!currentNode) return;

        applyInputOverlays();

        if (statusBarConfig) {
            log('draw() > writeStatusBar()');
            composeStatusBar(statusBarConfig, state, mainChars);
        }

        if (currentModal) {
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
        state.cursor = { x: state.activeRegion.x, y: state.activeRegion.y };

        // Record the current value so we can detect a change when focus leaves.
        const input = inputMap.get(state.activeRegion);

        if (input) {
            const ref = getInputRef(input);

            if (ref) ref.valueOnFocus = readInputValue(ref);
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
                // Rebuild both layers for the new canvas dimensions.
                mainChars = createGrid('');

                if (currentNode) {
                    applyLayout(currentNode, statusBarConfig ? mainChars.slice(0, -1) : mainChars);

                    // Snapshot fresh main styles before switching inputMap to modal.
                    const savedCellStyles = state.cellStyles;

                    mainCellStyles = createGrid<CellStyle | null>(null);

                    state.cellStyles = mainCellStyles;

                    applyInputOverlays();

                    state.cellStyles = savedCellStyles;
                }

                state.chars = createGrid('');
                state.cellStyles = createGrid<CellStyle | null>(null);
                state.displayChars = chars; // fresh array from setup becomes composite output
                state.displayCellStyles = state.cellStyles;

                const { positioned } = positionModal(currentModal);
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
