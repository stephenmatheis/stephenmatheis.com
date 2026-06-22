import { isInSelection } from './selection';
import type { Selected, EditorState } from './types';

export type Theme = {
    background: string;
    foreground: string;
    inputBg: string;
    placeholderColor: string;
    gridLine: string;
};

export function readTheme(): Theme {
    const styles = window.getComputedStyle(document.documentElement);

    return {
        background: styles.getPropertyValue('--background').trim(),
        foreground: styles.getPropertyValue('--foreground').trim(),
        inputBg: styles.getPropertyValue('--input-background').trim() || 'rgba(128,128,128,0.15)',
        placeholderColor: styles.getPropertyValue('--placeholder-color').trim() || 'rgba(128,128,128,0.5)',
        gridLine: styles.getPropertyValue('--grid-line').trim() || '#00000015',
    };
}

// Per-instance renderer — holds the previous-frame snapshots used for dirty-row diffing.
// Returns render() (draws only dirty rows) and invalidateAll() (forces full redraw next call).
export function createRenderer() {
    let prevChars: string[][] = [];
    let prevStyles: Array<Array<{ bg?: string | null; placeholder?: string } | null>> = [];
    let prevSelected: Selected | null = null;
    let allDirty = true;

    // Compute which rows need repainting by diffing current display state against the last frame.
    function computeDirtyRows(state: EditorState): Set<number> | null {
        if (allDirty) return null; // null = render everything

        const dirty = new Set<number>();

        // Text or cell-style changes.
        for (let r = 0; r < state.rows; r++) {
            const curRow = state.displayChars[r];
            const prevRow = prevChars[r];
            const curStyles = state.displayCellStyles[r];
            const prevStyleRow = prevStyles[r];

            if (!curRow || !prevRow) {
                dirty.add(r);

                continue;
            }

            let rowDirty = false;

            for (let c = 0; c < state.cols; c++) {
                if (curRow[c] !== prevRow[c]) {
                    rowDirty = true;

                    break;
                }

                const cs = curStyles?.[c];
                const ps = prevStyleRow?.[c];

                if (cs !== ps) {
                    // Shallow compare the style fields that affect rendering.
                    if (!cs || !ps || cs.bg !== ps.bg || cs.placeholder !== ps.placeholder) {
                        rowDirty = true;

                        break;
                    }
                }
            }

            if (rowDirty) dirty.add(r);
        }

        // Selection changes — mark all previously and currently selected rows.
        if (state.selected !== prevSelected) {
            const markSelection = (sel: Selected | null) => {
                if (!sel) return;

                for (let r = sel.start.y; r <= sel.end.y; r++) {
                    dirty.add(r);
                }
            };

            markSelection(state.selected);
            markSelection(prevSelected);
        }

        return dirty;
    }

    function snapshotState(state: EditorState): void {
        prevChars = state.displayChars.map((row) => row.slice());
        prevStyles = state.displayCellStyles.map((row) =>
            row.map((s) => (s ? { bg: s.bg, placeholder: s.placeholder } : null)),
        );
        prevSelected = state.selected;
        allDirty = false;
    }

    // Force the next render() call to repaint every row — call after resize.
    function invalidateAll(): void {
        allDirty = true;
    }

    // Renders the canvas. The cursor is NOT drawn here — it lives on a separate overlay
    // so it can blink via CSS animation without triggering a main-canvas repaint.
    function render(ctx: CanvasRenderingContext2D, state: EditorState, theme: Theme): void {
        const { background, foreground, inputBg, placeholderColor, gridLine } = theme;

        const dirty = computeDirtyRows(state);

        if (dirty === null) {
            // Full repaint — clear once and redraw everything.
            ctx.clearRect(0, 0, state.cols * state.cellWidth, state.rows * state.cellHeight);
        }

        for (let row = 0; row < state.rows; row++) {
            if (dirty !== null && !dirty.has(row)) continue;

            const y = row * state.cellHeight;

            if (dirty !== null) {
                ctx.clearRect(0, y, state.cols * state.cellWidth, state.cellHeight);
            }

            for (let col = 0; col < state.cols; col++) {
                const x = col * state.cellWidth;
                const char = state.displayChars[row]?.[col] || '';
                const cellStyle = state.displayCellStyles?.[row]?.[col];
                const isSelected = state.selected ? isInSelection(col, row, state.selected) : false;

                if (cellStyle && 'bg' in cellStyle) {
                    ctx.fillStyle = cellStyle.bg ?? inputBg;
                    
                    ctx.fillRect(x, y, state.cellWidth, state.cellHeight);
                }

                if (isSelected) {
                    ctx.fillStyle = foreground;
                    
                    ctx.fillRect(x, y, state.cellWidth, state.cellHeight);
                }

                // TODO: Be able to toggle on/off
                // Inset by lineWidth/2 so the stroke stays within [x,x+w)×[y,y+h).
                // strokeRect centered on the rect edge bleeds outside and accumulates
                // on partial repaints — inset keeps all pixels inside the clearRect zone.
                ctx.strokeStyle = gridLine;
                ctx.lineWidth = 0.5;
                
                ctx.strokeRect(x + 0.25, y + 0.25, state.cellWidth - 0.5, state.cellHeight - 0.5);

                if (char) {
                    ctx.fillStyle = isSelected ? background : foreground;
                
                    ctx.fillText(char, x, y + state.cellHeight);
                } else if (cellStyle?.placeholder) {
                    ctx.fillStyle = placeholderColor;
                
                    ctx.fillText(cellStyle.placeholder, x, y + state.cellHeight);
                }
            }
        }

        snapshotState(state);
    }

    return { render, invalidateAll };
}
