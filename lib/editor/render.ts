import { isInSelection } from './selection';
import type { EditorState } from './types';

export type Theme = {
    background: string;
    foreground: string;
    inputBg: string;
    placeholderColor: string;
    gridLine: string;
};

export function readTheme(): Theme {
    const s = window.getComputedStyle(document.documentElement);
    return {
        background: s.getPropertyValue('--background').trim(),
        foreground: s.getPropertyValue('--foreground').trim(),
        inputBg: s.getPropertyValue('--input-background').trim() || 'rgba(128,128,128,0.15)',
        placeholderColor: s.getPropertyValue('--placeholder-color').trim() || 'rgba(128,128,128,0.5)',
        gridLine: s.getPropertyValue('--grid-line').trim() || '#00000015',
    };
}

export function render(ctx: CanvasRenderingContext2D, state: EditorState, theme: Theme) {
    const { background, foreground, inputBg, placeholderColor, gridLine } = theme;

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
            ctx.strokeStyle = gridLine;
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

}
