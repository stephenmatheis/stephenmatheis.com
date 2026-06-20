import { cloneChars } from '@/lib/tui';
import type { EditorState } from './editor';

const MAX_HISTORY = 100;

export type HistoryActions = {
    draw(): void;
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
        state.selected = null;
        state.keyboardAnchor = null;

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
        state.selected = null;
        state.keyboardAnchor = null;

        actions.draw();
    }

    return { snapshot, undo, redo };
}
