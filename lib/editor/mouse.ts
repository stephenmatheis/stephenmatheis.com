import type { CellPos } from './editor';
import type { EditorState } from './editor';

type MouseHandlersProps = {
    canvas: HTMLCanvasElement;
    textarea: HTMLTextAreaElement;
    state: EditorState;
    actions: {
        draw(): void;
        startMouseSelection(cell: CellPos): void;
        extendMouseSelection(cell: CellPos): void;
        endMouseSelection(): void;
        focusAtCell(x: number, y: number): boolean;
        endOfContent(): CellPos;
        setCursor(pos: CellPos): void;
        dismissFloatIfOutside?(cell: CellPos): boolean;
    };
};

function pixelToCell(clientX: number, clientY: number, canvas: HTMLCanvasElement, state: EditorState): CellPos {
    const { left, top } = canvas.getBoundingClientRect();

    return {
        x: Math.max(0, Math.min(Math.floor((clientX - left) / state.cellWidth), state.cols - 1)),
        y: Math.max(0, Math.min(Math.floor((clientY - top) / state.cellHeight), state.rows - 1)),
    };
}

export function MouseHandlers({ canvas, textarea, state, actions }: MouseHandlersProps) {
    function handleMouseDown(event: MouseEvent) {
        const cell = pixelToCell(event.clientX, event.clientY, canvas, state);

        const floatDismissed = actions.dismissFloatIfOutside?.(cell) ?? false;

        if (!actions.focusAtCell(cell.x, cell.y)) {
            if (floatDismissed) {
                actions.draw();
            }

            return;
        }

        state.isDragging = true;
        state.cursorVisible = true;
        actions.startMouseSelection(state.cursor);
        textarea.focus();
        actions.draw();
    }

    function handleMouseMove(event: MouseEvent) {
        if (!state.isDragging || !state.selectionAnchor) return;

        const raw = pixelToCell(event.clientX, event.clientY, canvas, state);
        const r = state.activeRegion;
        const cell = r
            ? {
                  x: Math.max(r.x, Math.min(raw.x, r.x + r.width - 1)),
                  y: Math.max(r.y, Math.min(raw.y, r.y + r.height - 1)),
              }
            : raw;
        const eoc = actions.endOfContent();
        const isAfterContent = cell.y > eoc.y || (cell.y === eoc.y && cell.x > eoc.x);
        const endpoint = isAfterContent ? eoc : cell;
        const anchor = state.selectionAnchor;

        if (endpoint.x !== anchor.x || endpoint.y !== anchor.y) {
            actions.setCursor(endpoint);

            actions.extendMouseSelection(endpoint);
            actions.draw();
        }
    }

    function handleMouseUp() {
        state.isDragging = false;

        actions.endMouseSelection();
    }

    return { handleMouseDown, handleMouseMove, handleMouseUp };
}
