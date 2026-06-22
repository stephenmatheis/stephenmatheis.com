import type { ContentState, CursorState, GeometryState, RegionState } from './types';
import type { Cursor } from './cursor';

export type BufferProps = {
    state: ContentState & CursorState & GeometryState & RegionState;
    cursor: ReturnType<typeof Cursor>;
};

export function Buffer({ state, cursor }: BufferProps) {
    function writeChar(char: string) {
        if (state.cursor.y < state.rows && state.cursor.x < state.cols) {
            const r = state.activeRegion;
            const maxX = r ? r.x + r.width - 1 : state.cols - 1;
            const minX = r ? r.x : 0;
            const maxY = r ? r.y + r.height - 1 : state.rows - 1;

            if (state.cursor.x === maxX) {
                if (state.cursor.y < maxY) {
                    // Move to the first column of the next row via moveCursor so bounds-clamping
                    // and cursorVisible tracking stay in the Cursor module.
                    cursor.moveCursor(minX - state.cursor.x, 1);
                    state.chars[state.cursor.y][state.cursor.x] = char;
                    cursor.moveCursor(1, 0);
                }

                return;
            }

            state.chars[state.cursor.y][state.cursor.x] = char;

            cursor.moveCursor(1, 0);
        }
    }

    function deleteChar() {
        const minX = state.activeRegion ? state.activeRegion.x : 0;

        if (state.cursor.x > minX) {
            cursor.moveCursor(-1, 0);

            state.chars[state.cursor.y][state.cursor.x] = '';
        }
    }

    function handleEnter() {
        const minX = state.activeRegion ? state.activeRegion.x : 0;

        cursor.moveCursor(-(state.cursor.x - minX), 1);
    }

    return {
        writeChar,
        deleteChar,
        handleEnter,
    };
}
