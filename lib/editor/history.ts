import type { EditorState } from './editor';

// Creates a fully independent copy of the character buffer.
//
// Why not just spread the outer array (`[...chars]`)? That gives you a new
// array but the same inner row arrays — mutating chars[0][5] in the copy would
// also mutate the original. Undo snapshots need to be completely isolated from
// the live buffer, so every row must be its own new array.
//
// We spread each row one level deep (rather than using structuredClone) because
// each cell is a primitive string. Strings are immutable in JavaScript — once
// created, they can't be changed in place — so a shallow per-row copy is enough
// to fully isolate the snapshot.
function cloneChars(chars: string[][]): string[][] {
    return chars.map((row) => [...row]);
}

const MAX_HISTORY = 100;

export type HistoryActions = {
    draw(): void;
    clearSelection(): void;
};

export function createHistory(state: EditorState, actions: HistoryActions) {
    function snapshot() {
        state.undoStack.push({
            chars: cloneChars(state.chars),
            cursor: { ...state.cursor },
        });

        if (state.undoStack.length > MAX_HISTORY) {
            state.undoStack.shift();
        }

        state.redoStack = [];
    }

    function undo() {
        const prev = state.undoStack.pop();

        if (!prev) return;

        state.redoStack.push({
            chars: cloneChars(state.chars),
            cursor: { ...state.cursor },
        });

        state.chars = prev.chars;
        state.cursor = prev.cursor;
        actions.clearSelection();

        actions.draw();
    }

    function redo() {
        const next = state.redoStack.pop();

        if (!next) return;

        state.undoStack.push({
            chars: cloneChars(state.chars),
            cursor: { ...state.cursor },
        });

        state.chars = next.chars;
        state.cursor = next.cursor;
        actions.clearSelection();

        actions.draw();
    }

    return { snapshot, undo, redo };
}
