import { isInSelection } from './selection';
import type { EditorState } from './editor';

export type DrawAction = {
    draw(): void;
};

export function render(ctx: CanvasRenderingContext2D, state: EditorState) {
    const rootStyles = window.getComputedStyle(document.documentElement);

    const background = rootStyles.getPropertyValue('--background').trim();
    const foreground = rootStyles.getPropertyValue('--foreground').trim();
    const inputBg = rootStyles.getPropertyValue('--input-background').trim() || 'rgba(128,128,128,0.15)';
    const placeholderColor = rootStyles.getPropertyValue('--placeholder-color').trim() || 'rgba(128,128,128,0.5)';

    ctx.clearRect(0, 0, state.cols * state.cellWidth, state.rows * state.cellHeight);

    for (let row = 0; row < state.rows; row++) {
        for (let col = 0; col < state.cols; col++) {
            const x = col * state.cellWidth;
            const y = row * state.cellHeight;
            const char = state.displayChars[row]?.[col] || '';
            const cellStyle = state.displayCellStyles?.[row]?.[col];
            const isCursor = state.cursorVisible && col === state.cursor.x && row === state.cursor.y;
            const isSelected = state.selected ? isInSelection(col, row, state.selected) : false;

            if (cellStyle && 'bg' in cellStyle) {
                ctx.fillStyle = cellStyle.bg ?? inputBg;
                ctx.fillRect(x, y, state.cellWidth, state.cellHeight);
            }

            if (isSelected) {
                ctx.fillStyle = foreground;
                ctx.fillRect(x, y, state.cellWidth, state.cellHeight);
            }

            if (isCursor) {
                ctx.fillStyle = foreground;
                ctx.fillRect(x, y, state.cellWidth, state.cellHeight);
            }

            // TODO: Be able to toggle on/off
            ctx.strokeStyle = '#00000015';
            ctx.lineWidth = 0.5;
            ctx.strokeRect(x, y, state.cellWidth, state.cellHeight);

            if (char) {
                ctx.fillStyle = isCursor || isSelected ? background : foreground;
                ctx.fillText(char, x, y + state.cellHeight);
            } else if (cellStyle?.placeholder && !isCursor) {
                ctx.fillStyle = placeholderColor;
                ctx.fillText(cellStyle.placeholder, x, y + state.cellHeight);
            }
        }
    }

    // console.log(state);
}
