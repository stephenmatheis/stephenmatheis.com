import type { EditorState } from './editor';

export type BufferProps = {
    state: EditorState;
    actions: {
        moveCursor(dx: number, dy: number): void;
    };
};

export function Buffer({ state, actions }: BufferProps) {
    function writeChar(char: string) {
        if (state.cursor.y < state.rows && state.cursor.x < state.cols) {
            const r = state.activeRegion;
            const maxX = r ? r.x + r.width - 1 : state.cols - 1;
            const minX = r ? r.x : 0;
            const maxY = r ? r.y + r.height - 1 : state.rows - 1;

            if (state.cursor.x === maxX) return;

            state.chars[state.cursor.y][state.cursor.x] = char;

            if (state.cursor.x >= maxX && state.cursor.y < maxY) {
                state.cursor = { x: minX, y: state.cursor.y + 1 };
                state.cursorVisible = true;
            } else {
                actions.moveCursor(1, 0);
            }
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

    return {
        writeChar,
        deleteChar,
        handleEnter,
    };
}
