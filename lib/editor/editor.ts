import { render } from './render';
import { Keyboard } from './keyboard';
import { MouseHandlers } from './mouse';
import { History } from './history';
import { Cursor } from './cursor';
import { Buffer } from './buffer';
import { Selection } from './selection';
import { Canvas } from './setup';
import { log } from '@/lib/utils';
import { compose } from '@/lib/editor/tui';
import type { BoxNode, Region } from '@/lib/editor/tui';

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

function composeStatusBar(config: StatusBar, state: EditorState) {
    const row = state.rows - 1;

    if (row < 0 || row >= state.chars.length) return;

    for (let col = 0; col < state.cols; col++) {
        state.chars[row][col] = '';
    }

    if (config.left) {
        const content = Content(config.left, state);

        for (let i = 0; i < content.length && i < state.cols; i++) {
            state.chars[row][i] = content[i];
        }
    }

    if (config.center) {
        const content = Content(config.center, state);
        const startX = Math.floor((state.cols - content.length) / 2);

        for (let i = 0; i < content.length; i++) {
            const col = startX + i;

            if (col >= 0 && col < state.cols) {
                state.chars[row][col] = content[i];
            }
        }
    }

    if (config.right) {
        const content = Content(config.right, state);
        const startX = state.cols - content.length;

        for (let i = 0; i < content.length; i++) {
            const col = startX + i;
            if (col >= 0 && col < state.cols) {
                state.chars[row][col] = content[i];
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

    function draw() {
        if (!currentNode) return;

        if (statusBarConfig) {
            log('draw() > writeStatusBar()');

            composeStatusBar(statusBarConfig, state);
        }

        log('draw() > render()');
        render(ctx, state);
    }

    function focusNext() {
        const i = state.activeRegion ? state.regions.indexOf(state.activeRegion) : -1;

        focusRegion(i + 1);
    }

    function focusPrev() {
        const i = state.activeRegion ? state.regions.indexOf(state.activeRegion) : 0;

        focusRegion(i - 1);
    }

    function focusRegion(index: number) {
        if (state.regions.length === 0) return;

        const i = ((index % state.regions.length) + state.regions.length) % state.regions.length;

        state.activeRegion = state.regions[i];
        state.cursor = { x: state.activeRegion.x, y: state.activeRegion.y };
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

    function applyLayout(node: BoxNode, chars: string[][]): void {
        const regions = compose(node, chars);

        state.regions = regions;
        state.activeRegion = regions[0] ?? null;

        if (state.activeRegion) {
            state.cursor = { x: state.activeRegion.x, y: state.activeRegion.y };
        }
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

            if (!currentNode) return;

            const composeChars = statusBarConfig ? chars.slice(0, -1) : chars;

            log('! createSetup() > layout() > compose()');
            applyLayout(currentNode, composeChars);
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
            add(node: BoxNode) {
                currentNode = node;

                log('editor.root.add() > compose()');
                applyLayout(node, getComposeChars());

                log('editor.root.add() > draw()');
                draw();
            },
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
