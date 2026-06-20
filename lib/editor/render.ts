import { isInSelection } from './selection';
import type { EditorState } from './editor';

export type DrawAction = { draw(): void };

export function render(ctx: CanvasRenderingContext2D, state: EditorState) {
    const rootStyles = window.getComputedStyle(document.documentElement);
    const background = rootStyles.getPropertyValue('--background').trim();
    const foreground = rootStyles.getPropertyValue('--foreground').trim();

    ctx.clearRect(0, 0, state.cols * state.cellWidth, state.rows * state.cellHeight);

    for (let row = 0; row < state.rows; row++) {
        for (let col = 0; col < state.cols; col++) {
            const x = col * state.cellWidth;
            const y = row * state.cellHeight;
            const char = state.chars[row]?.[col] || '';
            const isCursor = state.cursorVisible && col === state.cursor.x && row === state.cursor.y;
            const isSelected = state.selected ? isInSelection(col, row, state.selected) : false;

            if (isSelected) {
                ctx.fillStyle = foreground;
                ctx.fillRect(x, y, state.cellWidth, state.cellHeight);
            }

            if (isCursor) {
                ctx.fillStyle = foreground;
                ctx.fillRect(x, y, state.cellWidth, state.cellHeight);
            }

            // TODO: Be able to toggle on/off
            ctx.strokeStyle = '#00000030';
            ctx.lineWidth = 0.5;
            ctx.strokeRect(x, y, state.cellWidth, state.cellHeight);

            if (char) {
                ctx.fillStyle = isCursor || isSelected ? background : foreground;
                ctx.fillText(char, x, y + state.cellHeight);
            }
        }
    }

    if (state.activeRegion) {
        const r = state.activeRegion;
        const ln = state.cursor.y - r.y + 1;
        const col = state.cursor.x - r.x + 1;
        const text = `Ln ${ln}, Col ${col}`;
        const startCol = state.cols - text.length - 2;
        const statusY = (state.rows - 1) * state.cellHeight;

        ctx.fillStyle = background;
        ctx.fillRect(startCol * state.cellWidth, statusY, (text.length + 2) * state.cellWidth, state.cellHeight);
        ctx.fillStyle = foreground;
        ctx.fillText(text, (startCol + 1) * state.cellWidth, statusY + state.cellHeight);
    }
}
