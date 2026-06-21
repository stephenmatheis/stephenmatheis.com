import type { CellPos, Selected } from './editor';
import type { EditorState } from './editor';

function normalizeSelection(selection: Selected): Selected {
    const { start, end } = selection;
    const reversed = end.y < start.y || (end.y === start.y && end.x < start.x);

    return reversed ? { start: end, end: start } : selection;
}

export function isInSelection(col: number, row: number, selection: Selected): boolean {
    const { start, end } = normalizeSelection(selection);

    if (row < start.y || row > end.y) return false;
    if (row === start.y && col < start.x) return false;
    if (row === end.y && col > end.x) return false;

    return true;
}

export function getSelectedText(chars: string[][], selection: Selected): string {
    const { start, end } = normalizeSelection(selection);
    const lines: string[] = [];

    for (let row = start.y; row <= end.y; row++) {
        const startCol = row === start.y ? start.x : 0;
        const endCol = row === end.y ? end.x : (chars[row]?.length ?? 1) - 1;

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
    const { start, end } = normalizeSelection(selection);

    for (let row = start.y; row <= end.y; row++) {
        const startCol = row === start.y ? start.x : 0;
        const endCol = row === end.y ? end.x : chars[row].length - 1;

        for (let col = startCol; col <= endCol; col++) {
            chars[row][col] = '';
        }
    }

    return start;
}

export function Selection(state: EditorState) {
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

        state.selected = { start: state.selectionAnchor, end: cell };
    }

    function endMouseSelection() {
        state.selectionAnchor = null;
    }

    function clearSelection() {
        state.selected = null;
        state.keyboardAnchor = null;
    }

    function selectAll() {
        state.keyboardAnchor = null;
        state.selected = {
            start: { x: 0, y: 0 },
            end: { x: state.cols - 1, y: state.rows - 1 },
        };
    }

    return { withSelection, startMouseSelection, extendMouseSelection, endMouseSelection, clearSelection, selectAll };
}
