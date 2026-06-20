import type { EditorState } from './editor';

export type BufferActions = {
    moveCursor(dx: number, dy: number): void;
};

export function createBuffer(state: EditorState, actions: BufferActions) {
    function writeChar(char: string) {
        if (state.cursor.y < state.rows && state.cursor.x < state.cols) {
            state.chars[state.cursor.y][state.cursor.x] = char;

            actions.moveCursor(1, 0);
        }
    }

    function deleteChar() {
        const minX = state.activeRegion ? state.activeRegion.x : 0;

        if (state.cursor.x > minX) {
            actions.moveCursor(-1, 0);

            state.chars[state.cursor.y][state.cursor.x] = '';
        }
    }

    function handleEnter() {
        const minX = state.activeRegion ? state.activeRegion.x : 0;

        actions.moveCursor(-(state.cursor.x - minX), 1);
    }

    return { writeChar, deleteChar, handleEnter };
}
