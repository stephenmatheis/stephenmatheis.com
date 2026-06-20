import { render } from './render';
import { handleKeyDown } from './keyboard';
import { createMouseHandlers } from './mouse';
import { createHistory } from './history';
import { createCursor } from './cursor';
import { createBuffer } from './buffer';
import { createSetup } from './setup';
import type { CellPos, Selected } from '@/lib/tui';

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

    const draw = () => render(ctx, state);
    const { moveCursor, withSelection, wordJumpRight, wordJumpLeft, lineStart, lineEnd, docStart, docEnd } =
        createCursor(state);
    const { writeChar, deleteChar, handleEnter } = createBuffer(state, { moveCursor });
    const { snapshot, undo, redo } = createHistory(state, { draw });
    const { handleMouseDown, handleMouseMove, handleMouseUp } = createMouseHandlers(canvas, textarea, state, { draw });
    const { setSize } = createSetup(canvas, ctx, state, { draw });

    function onKeyDown(event: KeyboardEvent) {
        return handleKeyDown(event, state, {
            draw,
            snapshot,
            undo,
            redo,
            writeChar,
            deleteChar,
            handleEnter,
            withSelection,
            moveCursor,
            wordJumpRight,
            wordJumpLeft,
            lineStart,
            lineEnd,
            docStart,
            docEnd,
        });
    }

    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseup', handleMouseUp);
    textarea.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', setSize);
    textarea.focus();

    return {
        destroy() {
            container.removeEventListener('mousedown', handleMouseDown);
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseup', handleMouseUp);
            textarea.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('resize', setSize);
        },
    };
}
