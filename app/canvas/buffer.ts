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
        if (state.cursor.x > 0) {
            actions.moveCursor(-1, 0);

            state.chars[state.cursor.y][state.cursor.x] = '';
        }
    }

    function handleEnter() {
        actions.moveCursor(-state.cursor.x, 1);
    }

    return { writeChar, deleteChar, handleEnter };
}
