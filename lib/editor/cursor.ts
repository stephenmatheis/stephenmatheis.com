import type { EditorState } from './editor';

function isWordChar(char: string): boolean {
    if (!char || char.trim() === '') return false;

    const code = char.codePointAt(0) ?? 0;

    // Exclude box-drawing characters (U+2500–U+257F)
    return !(code >= 0x2500 && code <= 0x257f);
}

export function createCursor(state: EditorState) {
    function moveCursor(dx: number, dy: number) {
        const r = state.activeRegion;
        const minX = r ? r.x : 0;
        const maxX = r ? r.x + r.width - 1 : state.cols - 1;
        const minY = r ? r.y : 0;
        const maxY = r ? r.y + r.height - 1 : state.rows - 1;

        state.cursor = {
            x: Math.max(minX, Math.min(state.cursor.x + dx, maxX)),
            y: Math.max(minY, Math.min(state.cursor.y + dy, maxY)),
        };

        state.cursorVisible = true;
    }

    function wordJumpRight() {
        const row = state.chars[state.cursor.y] || [];
        const r = state.activeRegion;
        const maxX = r ? r.x + r.width - 1 : state.cols - 1;
        let col = state.cursor.x;

        while (col < maxX && isWordChar(row[col])) col++;
        while (col < maxX && !isWordChar(row[col])) col++;

        state.cursor = { x: col, y: state.cursor.y };
        state.cursorVisible = true;
    }

    function wordJumpLeft() {
        const row = state.chars[state.cursor.y] || [];
        const r = state.activeRegion;
        const minX = r ? r.x : 0;
        let col = state.cursor.x;

        if (col === minX) return;

        col--;

        while (col > minX && !isWordChar(row[col])) col--;
        while (col > minX && isWordChar(row[col - 1])) col--;

        state.cursor = { x: col, y: state.cursor.y };
        state.cursorVisible = true;
    }

    function lineStart() {
        const minX = state.activeRegion ? state.activeRegion.x : 0;
        state.cursor = { x: minX, y: state.cursor.y };
        state.cursorVisible = true;
    }

    function lineEnd() {
        const r = state.activeRegion;
        const maxX = r ? r.x + r.width - 1 : state.cols - 1;
        state.cursor = { x: maxX, y: state.cursor.y };
        state.cursorVisible = true;
    }

    function docStart() {
        const r = state.activeRegion;
        state.cursor = { x: r ? r.x : 0, y: r ? r.y : 0 };
        state.cursorVisible = true;
    }

    function docEnd() {
        const r = state.activeRegion;
        state.cursor = { x: r ? r.x : 0, y: r ? r.y + r.height - 1 : state.rows - 1 };
        state.cursorVisible = true;
    }

    return { moveCursor, wordJumpRight, wordJumpLeft, lineStart, lineEnd, docStart, docEnd };
}
