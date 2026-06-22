import type { CellPos, Selected, SelectionState, CursorState, RegionState, GeometryState } from './types';

function normalizeSelection(selection: Selected): Selected {
    const { start, end, rect } = selection;
    const reversed = end.y < start.y || (end.y === start.y && end.x < start.x);

    return reversed ? { start: end, end: start, rect } : selection;
}

export function isInSelection(col: number, row: number, selection: Selected): boolean {
    const { start, end, rect, bounds } = normalizeSelection(selection);

    if (row < start.y || row > end.y) return false;

    if (rect) {
        return col >= start.x && col <= end.x;
    }

    if (row === start.y && col < start.x) return false;
    if (row === start.y && bounds && col > bounds.x + bounds.width - 1) return false;
    if (row === end.y && col > end.x) return false;
    if (row === end.y && bounds && col < bounds.x) return false;

    if (row > start.y && row < end.y && bounds) {
        return col >= bounds.x && col <= bounds.x + bounds.width - 1;
    }

    return true;
}

export function getSelectedText(chars: string[][], selection: Selected): string {
    const { start, end, rect, bounds } = normalizeSelection(selection);
    const lines: string[] = [];

    for (let row = start.y; row <= end.y; row++) {
        const startCol = rect || row === start.y ? start.x : (bounds?.x ?? 0);
        const endCol =
            rect || row === end.y ? end.x : bounds ? bounds.x + bounds.width - 1 : (chars[row]?.length ?? 1) - 1;

        lines.push(
            (chars[row] || [])
                .slice(startCol, endCol + 1)
                .join('')
                .trimEnd(),
        );
    }

    return lines.join('\n');
}

export function clearSelected(chars: string[][], selection: Selected): CellPos {
    const { start, end, rect, bounds } = normalizeSelection(selection);

    for (let row = start.y; row <= end.y; row++) {
        const startCol = rect || row === start.y ? start.x : (bounds?.x ?? 0);
        const endCol = rect || row === end.y ? end.x : bounds ? bounds.x + bounds.width - 1 : chars[row].length - 1;

        for (let col = startCol; col <= endCol; col++) {
            chars[row][col] = '';
        }
    }

    return start;
}

export function Selection(state: SelectionState & CursorState & RegionState & GeometryState) {
    function withSelection(moveFn: () => void, extending: boolean) {
        if (extending) {
            if (!state.keyboardAnchor) {
                state.keyboardAnchor = { ...state.cursor };
            }

            moveFn();

            state.selected = {
                start: state.keyboardAnchor,
                end: { ...state.cursor },
            };
        } else {
            state.keyboardAnchor = null;
            state.selected = null;

            moveFn();
        }
    }

    function startMouseSelection(cell: CellPos) {
        state.selected = null;
        state.keyboardAnchor = null;
        state.selectionAnchor = cell;
    }

    function extendMouseSelection(cell: CellPos) {
        if (!state.selectionAnchor) return;

        const r = state.activeRegion;

        state.selected = {
            start: state.selectionAnchor,
            end: cell,
            bounds: r ? { x: r.x, width: r.width } : undefined,
        };
    }

    function endMouseSelection() {
        state.selectionAnchor = null;
    }

    function clearSelection() {
        state.selected = null;
        state.keyboardAnchor = null;
    }

    function selectAll() {
        const r = state.activeRegion;

        state.keyboardAnchor = null;
        state.selected = {
            start: {
                x: r ? r.x : 0,
                y: r ? r.y : 0,
            },
            end: {
                x: r ? r.x + r.width - 1 : state.cols - 1,
                y: r ? r.y + r.height - 1 : state.rows - 1,
            },
            rect: !!r,
        };
    }

    return { withSelection, startMouseSelection, extendMouseSelection, endMouseSelection, clearSelection, selectAll };
}
