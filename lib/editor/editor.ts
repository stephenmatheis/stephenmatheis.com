import { render } from './render';
import { createKeyboard } from './keyboard';
import { createMouseHandlers } from './mouse';
import { createHistory } from './history';
import { createCursor } from './cursor';
import { createBuffer } from './buffer';
import { createSelection } from './selection';
import { createSetup } from './setup';
import { compose } from '@/lib/tui';
import type { BoxNode, Region } from '@/lib/tui';

export type CellPos = {
    x: number;
    y: number;
};

export type Selected = {
    start: CellPos;
    end: CellPos;
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
    cols: number;
    rows: number;
    cursor: CellPos;
    regions: Region[];
    activeRegion: Region | null;
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

function resolveContent(template: string, state: EditorState): string {
    const r = state.activeRegion;

    return template.replace(/\{(\w+)\}/g, (_, token: string) => {
        if (!r) return '';

        switch (token) {
            case 'ln': return String(state.cursor.y - r.y + 1);
            case 'col': return String(state.cursor.x - r.x + 1);
            case 'rows': return String(r.height);
            case 'cols': return String(r.width);
            default: return `{${token}}`;
        }
    });
}

function writeStatusBar(config: StatusBar, state: EditorState) {
    const row = state.rows - 1;

    if (row < 0 || row >= state.chars.length) return;

    for (let col = 0; col < state.cols; col++) {
        state.chars[row][col] = '';
    }

    if (config.left) {
        const content = resolveContent(config.left, state);

        for (let i = 0; i < content.length && i < state.cols; i++) {
            state.chars[row][i] = content[i];
        }
    }

    if (config.center) {
        const content = resolveContent(config.center, state);
        const startX = Math.floor((state.cols - content.length) / 2);

        for (let i = 0; i < content.length; i++) {
            const col = startX + i;
            if (col >= 0 && col < state.cols) state.chars[row][col] = content[i];
        }
    }

    if (config.right) {
        const content = resolveContent(config.right, state);
        const startX = state.cols - content.length;

        for (let i = 0; i < content.length; i++) {
            const col = startX + i;
            if (col >= 0 && col < state.cols) state.chars[row][col] = content[i];
        }
    }
}

export function createEditor({ canvas, textarea, container }: Editor) {
    const ctx = canvas.getContext('2d')!;

    const state: EditorState = {
        cellWidth: 0,
        cellHeight: 0,
        fontStr: '',
        chars: [],
        cols: 0,
        rows: 0,
        cursor: { x: 0, y: 0 },
        regions: [],
        activeRegion: null,
        selected: null,
        cursorVisible: true,
        isDragging: false,
        selectionAnchor: null,
        keyboardAnchor: null,
        undoStack: [],
        redoStack: [],
    };

    let currentNode: BoxNode | null = null;
    let statusBarConfig: StatusBar | null = null;

    const draw = () => {
        if (statusBarConfig) {
            writeStatusBar(statusBarConfig, state);
        }

        render(ctx, state);
    };

    const cursor = createCursor(state);
    const buffer = createBuffer(state, { moveCursor: cursor.moveCursor });
    const selection = createSelection(state);
    const history = createHistory(state, { draw, clearSelection: selection.clearSelection });

    function focusRegion(index: number) {
        if (state.regions.length === 0) return;
        const i = ((index % state.regions.length) + state.regions.length) % state.regions.length;
        state.activeRegion = state.regions[i];
        state.cursor = { x: state.activeRegion.x, y: state.activeRegion.y };
    }

    function focusNext() {
        const i = state.activeRegion ? state.regions.indexOf(state.activeRegion) : -1;
        focusRegion(i + 1);
    }

    function focusPrev() {
        const i = state.activeRegion ? state.regions.indexOf(state.activeRegion) : 0;
        focusRegion(i - 1);
    }

    function focusAtCell(x: number, y: number): boolean {
        const index = state.regions.findIndex((r) => x >= r.x && x < r.x + r.width && y >= r.y && y < r.y + r.height);

        if (index === -1) return false;

        state.activeRegion = state.regions[index];

        return true;
    }

    function getComposeChars() {
        return statusBarConfig ? state.chars.slice(0, -1) : state.chars;
    }

    const { handleKeyDown } = createKeyboard(state, draw, cursor, buffer, history, selection, { focusNext, focusPrev });
    const { handleMouseDown, handleMouseMove, handleMouseUp } = createMouseHandlers(canvas, textarea, state, {
        draw,
        startMouseSelection: selection.startMouseSelection,
        extendMouseSelection: selection.extendMouseSelection,
        endMouseSelection: selection.endMouseSelection,
        focusAtCell,
    });
    const { setSize } = createSetup(canvas, ctx, state, { draw }, (chars) => {
        if (!currentNode) return [];

        const composeChars = statusBarConfig ? chars.slice(0, -1) : chars;
        const regions = compose(currentNode, composeChars);

        state.regions = regions;
        state.activeRegion = regions[0] ?? null;

        if (state.activeRegion) {
            state.cursor = { x: state.activeRegion.x, y: state.activeRegion.y };
        }

        return regions;
    });

    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseup', handleMouseUp);
    textarea.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', setSize);
    textarea.focus();

    return {
        get cols() { return state.cols; },
        get rows() { return state.rows; },
        get cursor() { return state.cursor; },
        get activeRegion() { return state.activeRegion; },
        root: {
            add(node: BoxNode) {
                currentNode = node;

                const regions = compose(node, getComposeChars());

                state.regions = regions;
                state.activeRegion = regions[0] ?? null;

                if (state.activeRegion) {
                    state.cursor = { x: state.activeRegion.x, y: state.activeRegion.y };
                }

                draw();
            },
        },
        statusBar(config: StatusBar) {
            statusBarConfig = config;

            if (currentNode) {
                const regions = compose(currentNode, getComposeChars());
                state.regions = regions;
                state.activeRegion = regions[0] ?? null;
                if (state.activeRegion) {
                    state.cursor = { x: state.activeRegion.x, y: state.activeRegion.y };
                }
            }

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
