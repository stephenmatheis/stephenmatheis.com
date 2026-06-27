import type { EditorState, LayerContent, ThemeColors } from './types';

type CursorProps = {
    container: HTMLElement;
    state: EditorState & Pick<LayerContent, 'activeLayer' | 'displayLayer'>;
    getTheme: () => ThemeColors;
};

function isWordChar(char: string): boolean {
    if (!char || char.trim() === '') return false;

    const code = char.codePointAt(0) ?? 0;

    // Exclude box-drawing characters (U+2500–U+257F)
    return !(code >= 0x2500 && code <= 0x257f);
}

export function Cursor({ container, state, getTheme }: CursorProps) {
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
        const row = state.activeLayer.chars[state.cursor.y] || [];
        const r = state.activeRegion;
        const maxX = r ? r.x + r.width - 1 : state.cols - 1;
        let col = state.cursor.x;

        while (col < maxX && isWordChar(row[col])) col++;
        while (col < maxX && !isWordChar(row[col])) col++;

        state.cursor = { x: col, y: state.cursor.y };
        state.cursorVisible = true;
    }

    function wordJumpLeft() {
        const row = state.activeLayer.chars[state.cursor.y] || [];
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

    function regionStart() {
        const r = state.activeRegion;
        state.cursor = { x: r ? r.x : 0, y: r ? r.y : 0 };
        state.cursorVisible = true;
    }

    // Goes to the geometric bottom-left of the region, not the end of typed content.
    // For content-aware end-of-text, see endOfContent() in focus.ts.
    function regionEnd() {
        const r = state.activeRegion;
        state.cursor = { x: r ? r.x : 0, y: r ? r.y + r.height - 1 : state.rows - 1 };
        state.cursorVisible = true;
    }

    // Moves cursor to an absolute position, applying region bounds and setting cursorVisible.
    function jumpTo(pos: { x: number; y: number }) {
        const r = state.activeRegion;
        const minX = r ? r.x : 0;
        const maxX = r ? r.x + r.width - 1 : state.cols - 1;
        const minY = r ? r.y : 0;
        const maxY = r ? r.y + r.height - 1 : state.rows - 1;

        state.cursor = {
            x: Math.max(minX, Math.min(pos.x, maxX)),
            y: Math.max(minY, Math.min(pos.y, maxY)),
        };
        state.cursorVisible = true;
    }

    function ensureCursorStyles(): void {
        if (document.querySelector('#editor-cursor-style')) return;

        const style = document.createElement('style');

        style.id = 'editor-cursor-style';
        style.textContent = [
            '.editor-cursor{position:absolute;pointer-events:none;z-index:1;}',
            // TODO: when to blink? should be user toggle?
            // '.editor-cursor.visible{animation:editor-cursor-blink 1.2s step-end infinite;}',
            // '@keyframes editor-cursor-blink{0%,100%{opacity:1}50%{opacity:0}}',
        ].join('');
        document.head.appendChild(style);
    }

    const cursorCanvas = document.createElement('canvas');
    const cursorCtx = cursorCanvas.getContext('2d')!;

    cursorCanvas.className = 'editor-cursor';

    container.style.position = 'relative';
    container.appendChild(cursorCanvas);

    function render(): void {
        if (!state.cursorVisible || !state.cellWidth || !state.cellHeight) {
            cursorCanvas.classList.remove('visible');

            return;
        }

        const dpr = window.devicePixelRatio || 1;
        const cw = state.cellWidth;
        const ch = state.cellHeight;

        // Position the cursor canvas over the cursor cell.
        cursorCanvas.style.left = `${state.cursor.x * cw}px`;
        cursorCanvas.style.top = `${state.cursor.y * ch}px`;
        cursorCanvas.style.width = `${cw}px`;
        cursorCanvas.style.height = `${ch}px`;
        cursorCanvas.width = Math.round(cw * dpr);
        cursorCanvas.height = Math.round(ch * dpr);

        const { foreground, background } = getTheme();

        cursorCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
        cursorCtx.font = state.fontStr;
        cursorCtx.textBaseline = 'ideographic';

        // Cursor block.
        cursorCtx.fillStyle = foreground;
        cursorCtx.fillRect(0, 0, cw, ch);

        // Character in background color so it remains readable through the cursor.
        const char = state.displayLayer.chars[state.cursor.y]?.[state.cursor.x] || '';

        if (char) {
            cursorCtx.fillStyle = background;
            cursorCtx.fillText(char, 0, ch);
        }

        // Reset the blink animation so the cursor appears immediately after moving.
        cursorCanvas.classList.remove('visible');
        void cursorCanvas.offsetWidth; // force reflow to restart animation
        cursorCanvas.classList.add('visible');
    }

    function remove() {
        cursorCanvas.remove();
    }

    ensureCursorStyles();

    return {
        render,
        remove,
        moveCursor,
        wordJumpRight,
        wordJumpLeft,
        lineStart,
        lineEnd,
        regionStart,
        regionEnd,
        jumpTo,
    };
}
