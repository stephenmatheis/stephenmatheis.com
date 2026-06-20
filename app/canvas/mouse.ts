import type { CellPos } from '@/lib/tui';
import type { EditorState } from './editor';

export type MouseActions = {
    draw(): void;
};

function pixelToCell(
    clientX: number,
    clientY: number,
    canvas: HTMLCanvasElement,
    state: EditorState,
): CellPos {
    const { left, top } = canvas.getBoundingClientRect();

    return {
        x: Math.max(0, Math.min(Math.floor((clientX - left) / state.cellWidth), state.cols - 1)),
        y: Math.max(0, Math.min(Math.floor((clientY - top) / state.cellHeight), state.rows - 1)),
    };
}

export function createMouseHandlers(
    canvas: HTMLCanvasElement,
    textarea: HTMLTextAreaElement,
    state: EditorState,
    actions: MouseActions,
) {
    function handleMouseDown(event: MouseEvent) {
        const cell = pixelToCell(event.clientX, event.clientY, canvas, state);

        state.cursor = cell;
        state.selected = null;
        state.selectionAnchor = cell;
        state.keyboardAnchor = null;
        state.isDragging = true;
        state.cursorVisible = true;
        textarea.focus();

        actions.draw();
    }

    function handleMouseMove(event: MouseEvent) {
        if (!state.isDragging || !state.selectionAnchor) return;

        const cell = pixelToCell(event.clientX, event.clientY, canvas, state);
        const anchor = state.selectionAnchor;

        if (cell.x !== anchor.x || cell.y !== anchor.y) {
            state.selected = { start: anchor, end: cell };
            state.cursor = cell;

            actions.draw();
        }
    }

    function handleMouseUp() {
        state.isDragging = false;
        state.selectionAnchor = null;
    }

    return { handleMouseDown, handleMouseMove, handleMouseUp };
}
