import { compose } from '@/lib/tui';
import type { BoxNode } from '@/lib/tui';
import { render } from './render';
import { createKeyboard } from './keyboard';
import { createMouseHandlers } from './mouse';
import { createHistory } from './history';
import { createCursor } from './cursor';
import { createBuffer } from './buffer';
import { createSelection } from './selection';
import { createSetup } from './setup';

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

// All mutable editor state in one place. Keeping it as an explicit object
// (rather than loose `let` variables) means any module can be handed this
// object and immediately read or write shared state without needing a
// long parameter list or a closure.
export type EditorState = {
    cellWidth: number;
    cellHeight: number;
    fontStr: string;
    chars: string[][];
    cols: number;
    rows: number;
    cursor: CellPos;
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
        selected: null,
        cursorVisible: true,
        isDragging: false,
        selectionAnchor: null,
        keyboardAnchor: null,
        undoStack: [],
        redoStack: [],
    };

    let currentNode: BoxNode | null = null;

    const draw = () => render(ctx, state);
    const cursor = createCursor(state);
    const buffer = createBuffer(state, { moveCursor: cursor.moveCursor });
    const selection = createSelection(state);
    const history = createHistory(state, { draw, clearSelection: selection.clearSelection });
    const { handleKeyDown } = createKeyboard(state, draw, cursor, buffer, history, selection);
    const { handleMouseDown, handleMouseMove, handleMouseUp } = createMouseHandlers(canvas, textarea, state, {
        draw,
        startMouseSelection: selection.startMouseSelection,
        extendMouseSelection: selection.extendMouseSelection,
        endMouseSelection: selection.endMouseSelection,
    });
    const { setSize } = createSetup(canvas, ctx, state, { draw }, (chars) => {
        if (currentNode) compose(currentNode, chars);
    });

    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseup', handleMouseUp);
    textarea.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', setSize);
    textarea.focus();

    return {
        root: {
            add(node: BoxNode) {
                currentNode = node;
                compose(node, state.chars);
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
