import type { CellPos } from './editor';
import type { EditorState } from './editor';

export type MouseActions = {
    draw(): void;
    startMouseSelection(cell: CellPos): void;
    extendMouseSelection(cell: CellPos): void;
    endMouseSelection(): void;
    focusAtCell(x: number, y: number): boolean;
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

        if (!actions.focusAtCell(cell.x, cell.y)) return;

        state.cursor = cell;
        state.isDragging = true;
        state.cursorVisible = true;
        actions.startMouseSelection(cell);
        textarea.focus();

        actions.draw();
    }

    function handleMouseMove(event: MouseEvent) {
        if (!state.isDragging || !state.selectionAnchor) return;

        const cell = pixelToCell(event.clientX, event.clientY, canvas, state);
        const anchor = state.selectionAnchor;

        if (cell.x !== anchor.x || cell.y !== anchor.y) {
            state.cursor = cell;
            actions.extendMouseSelection(cell);

            actions.draw();
        }
    }

    function handleMouseUp() {
        state.isDragging = false;
        actions.endMouseSelection();
    }

    return { handleMouseDown, handleMouseMove, handleMouseUp };
}
