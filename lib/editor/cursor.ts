import type { EditorState } from './editor';

function isWordChar(char: string): boolean {
    if (!char || char.trim() === '') return false;

    const code = char.codePointAt(0) ?? 0;

    // Exclude box-drawing characters (U+2500–U+257F)
    return !(code >= 0x2500 && code <= 0x257f);
}

export function createCursor(state: EditorState) {
    function moveCursor(dx: number, dy: number) {
        state.cursor = {
            x: Math.max(0, Math.min(state.cursor.x + dx, state.cols - 1)),
            y: Math.max(0, Math.min(state.cursor.y + dy, state.rows - 1)),
        };

        state.cursorVisible = true;
    }

    function wordJumpRight() {
        const row = state.chars[state.cursor.y] || [];
        let col = state.cursor.x;

        while (col < state.cols - 1 && isWordChar(row[col])) col++;
        while (col < state.cols - 1 && !isWordChar(row[col])) col++;

        state.cursor = { x: col, y: state.cursor.y };
        state.cursorVisible = true;
    }

    function wordJumpLeft() {
        const row = state.chars[state.cursor.y] || [];
        let col = state.cursor.x;

        if (col === 0) return;

        col--;

        while (col > 0 && !isWordChar(row[col])) {
            col--;
        }

        while (col > 0 && isWordChar(row[col - 1])) {
            col--;
        }

        state.cursor = { x: col, y: state.cursor.y };
        state.cursorVisible = true;
    }

    function lineStart() {
        state.cursor = { x: 0, y: state.cursor.y };
        state.cursorVisible = true;
    }

    function lineEnd() {
        state.cursor = { x: state.cols - 1, y: state.cursor.y };
        state.cursorVisible = true;
    }

    function docStart() {
        state.cursor = { x: 0, y: 0 };
        state.cursorVisible = true;
    }

    function docEnd() {
        state.cursor = { x: 0, y: state.rows - 1 };
        state.cursorVisible = true;
    }

    return { moveCursor, wordJumpRight, wordJumpLeft, lineStart, lineEnd, docStart, docEnd };
}
