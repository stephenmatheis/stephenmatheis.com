import type { CellPos } from '@/lib/tui';
import type { EditorState } from './editor';

export function createSelection(state: EditorState) {
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
