import { render } from './render';
import { createKeyboard } from './keyboard';
import { createMouseHandlers } from './mouse';
import { createHistory } from './history';
import { createCursor } from './cursor';
import { createBuffer } from './buffer';
import { createSelection } from './selection';
import { createSetup } from './setup';
import { compose } from '@/lib/tui';
import type { LayoutNode, Region } from '@/lib/tui';

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

// Walk the layout tree and replace template tokens in TextNode content
// strings with live state values. Returns a new tree; does not mutate
// the original node the caller passed to root.add.
function resolveTokens(node: LayoutNode, state: EditorState): LayoutNode {
    if (node.kind === 'text') {
        const r = state.activeRegion;
        const content = (node.content ?? '').replace(/\{(\w+)\}/g, (_, token: string) => {
            if (!r) return '';

            switch (token) {
                case 'ln':
                    return String(state.cursor.y - r.y + 1);
                case 'col':
                    return String(state.cursor.x - r.x + 1);
                case 'rows':
                    return String(r.height);
                case 'cols':
                    return String(r.width);
                default:
                    return `{${token}}`;
            }
        });

        return { ...node, content };
    }

    return {
        ...node,
        children: node.children.map((child) => resolveTokens(child, state)),
    };
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

    let currentNode: LayoutNode | null = null;

    // Resolve template tokens, re-compose the layout, then render. Running
    // compose on every draw keeps Text node content fresh without requiring
    // a separate update step.
    const draw = () => {
        if (currentNode) {
            compose(resolveTokens(currentNode, state), state.chars);
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

    const { handleKeyDown } = createKeyboard(state, draw, cursor, buffer, history, selection, { focusNext, focusPrev });
    const { handleMouseDown, handleMouseMove, handleMouseUp } = createMouseHandlers(canvas, textarea, state, {
        draw,
        startMouseSelection: selection.startMouseSelection,
        extendMouseSelection: selection.extendMouseSelection,
        endMouseSelection: selection.endMouseSelection,
        focusAtCell,
    });
    const { setSize } = createSetup(canvas, ctx, state, { draw }, (chars) => {
        if (!currentNode) {
            return [];
        }

        const regions = compose(resolveTokens(currentNode, state), chars);

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

                const regions = compose(resolveTokens(node, state), state.chars);

                state.regions = regions;
                state.activeRegion = regions[0] ?? null;

                if (state.activeRegion) {
                    state.cursor = { x: state.activeRegion.x, y: state.activeRegion.y };
                }

                draw();
            },
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
