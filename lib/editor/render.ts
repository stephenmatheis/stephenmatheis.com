import { isInSelection } from './selection';
import type { Region } from '@/lib/editor/tui';
import type { Selected, EditorState, Theme } from './types';

export function readTheme(): Theme {
    const styles = window.getComputedStyle(document.documentElement);

    return {
        background: styles.getPropertyValue('--background').trim(),
        foreground: styles.getPropertyValue('--foreground').trim(),
        inputBg: styles.getPropertyValue('--input-background').trim() || 'rgba(128,128,128,0.15)',
        placeholderColor: styles.getPropertyValue('--placeholder-color').trim() || 'rgba(128,128,128,0.5)',
        gridLine: styles.getPropertyValue('--grid-line').trim() || '#00000015',
        activeRegionBorderColor: styles.getPropertyValue('--active-region-color').trim() || '#2266cc',
    };
}

// Value-equal comparison so reference changes from recompose don't spuriously dirty rows.
function regionsEqual(a: Region | null, b: Region | null): boolean {
    if (a === b) return true;
    if (!a || !b) return false;

    return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
}

// Per-instance Renderer — holds the previous-frame snapshots used for dirty-row diffing.
// Returns render() (draws only dirty rows) and invalidateAll() (forces full redraw next call).
export function Renderer() {
    let prevChars: string[][] = [];
    let prevStyles: Array<Array<{ bg?: string | null; placeholder?: string } | null>> = [];
    let prevSelected: Selected | null = null;
    let prevActiveRegion: Region | null = null;
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

        // Active region change — mark all rows touched by the border characters of the old
        // and new active region so colors update immediately on focus change.
        // Border chars sit 1 cell outside the region (r.y-1, r.y+r.height, and the
        // left/right cols span rows r.y..r.y+r.height-1), so mark r.y-1 through r.y+r.height.
        if (!regionsEqual(state.activeRegion, prevActiveRegion)) {
            const markRegion = (r: Region | null) => {
                if (!r) return;

                const top = Math.max(0, r.y - 1);
                const bottom = Math.min(state.rows - 1, r.y + r.height);

                for (let row = top; row <= bottom; row++) {
                    dirty.add(row);
                }
            };

            markRegion(state.activeRegion);
            markRegion(prevActiveRegion);
        }

        return dirty;
    }

    function snapshotState(state: EditorState): void {
        prevChars = state.displayChars.map((row) => row.slice());
        prevStyles = state.displayCellStyles.map((row) =>
            row.map((s) => (s ? { bg: s.bg, placeholder: s.placeholder } : null)),
        );
        prevSelected = state.selected;
        prevActiveRegion = state.activeRegion;
        allDirty = false;
    }

    // Force the next render() call to repaint every row — call after resize.
    function invalidateAll(): void {
        allDirty = true;
    }

    // Renders the canvas. The cursor is NOT drawn here — it lives on a separate overlay
    // so it can blink via CSS animation without triggering a main-canvas repaint.
    function render(ctx: CanvasRenderingContext2D, state: EditorState, theme: Theme): void {
        const { background, foreground, inputBg, placeholderColor, gridLine, activeRegionBorderColor } = theme;

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

                if (state.showGrid) {
                    ctx.strokeStyle = gridLine;
                    ctx.lineWidth = 0.5;
                    ctx.strokeRect(x + 0.25, y + 0.25, state.cellWidth - 0.5, state.cellHeight - 0.5);
                }

                if (char) {
                    // The active region's border characters sit 1 cell outside the region rect.
                    // Top/bottom rows: row === ar.y - 1 or ar.y + ar.height.
                    // Left/right cols: col === ar.x - 1 or ar.x + ar.width, on rows ar.y..ar.y+ar.height-1.
                    const ar = state.activeRegion;
                    const isRegionBorder =
                        ar !== null &&
                        (((row === ar.y - 1 || row === ar.y + ar.height) &&
                            col >= ar.x - 1 &&
                            col <= ar.x + ar.width) ||
                            ((col === ar.x - 1 || col === ar.x + ar.width) && row >= ar.y && row < ar.y + ar.height));

                    ctx.fillStyle = isSelected ? background : isRegionBorder ? activeRegionBorderColor : foreground;

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
