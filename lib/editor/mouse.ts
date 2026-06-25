import type { CellPos, SelectionState, RegionState, CursorState, GeometryState } from './types';

type MouseHandlersProps = {
    container: HTMLElement;
    canvas: HTMLCanvasElement;
    textarea: HTMLTextAreaElement;
    state: SelectionState & RegionState & CursorState & GeometryState;
    draw(): void;
    startMouseSelection(cell: CellPos): void;
    extendMouseSelection(cell: CellPos): void;
    endMouseSelection(): void;
    focusAtCell(x: number, y: number): boolean;
    endOfContent(): CellPos;
    setCursor(pos: CellPos): void;
    dismissFloatIfOutside?(cell: CellPos): boolean;
};

function pixelToCell(clientX: number, clientY: number, canvas: HTMLCanvasElement, state: GeometryState): CellPos {
    const { left, top } = canvas.getBoundingClientRect();

    return {
        x: Math.max(0, Math.min(Math.floor((clientX - left) / state.cellWidth), state.cols - 1)),
        y: Math.max(0, Math.min(Math.floor((clientY - top) / state.cellHeight), state.rows - 1)),
    };
}

export function Mouse({
    container,
    canvas,
    textarea,
    state,
    draw,
    startMouseSelection,
    extendMouseSelection,
    endMouseSelection,
    focusAtCell,
    endOfContent,
    setCursor,
    dismissFloatIfOutside,
}: MouseHandlersProps) {
    // FIXME: Border click should set region to active
    function handleMouseDown(event: MouseEvent) {
        const cell = pixelToCell(event.clientX, event.clientY, canvas, state);
        const floatDismissed = dismissFloatIfOutside?.(cell) ?? false;

        if (!focusAtCell(cell.x, cell.y)) {
            if (floatDismissed) {
                draw();
            }

            return;
        }

        state.isDragging = true;
        state.cursorVisible = true;
        startMouseSelection(state.cursor);
        textarea.focus();
        draw();
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
        const eoc = endOfContent();
        const isAfterContent = cell.y > eoc.y || (cell.y === eoc.y && cell.x > eoc.x);
        const endpoint = isAfterContent ? eoc : cell;
        const anchor = state.selectionAnchor;

        if (endpoint.x !== anchor.x || endpoint.y !== anchor.y) {
            setCursor(endpoint);

            extendMouseSelection(endpoint);
            draw();
        }
    }

    function handleMouseUp() {
        state.isDragging = false;

        endMouseSelection();
    }

    return {
        add() {
            container.addEventListener('mousedown', handleMouseDown);
            container.addEventListener('mousemove', handleMouseMove);
            container.addEventListener('mouseup', handleMouseUp);
        },
        remove() {
            container.removeEventListener('mousedown', handleMouseDown);
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseup', handleMouseUp);
        },
    };
}
