import { isInSelection } from './selection';
import type { Region } from '@/lib/editor/tui';
import type { Selected, EditorState, ThemeColors, GeometryState } from './types';

// ===== Render target interface =====
//
// Separates "what to render" (Renderer — dirty-row diffing, cell logic) from
// "how to paint pixels" (RenderTarget — canvas2D, terminal, etc.).
// Swap the target at construction time to change the output backend.

export type RenderedCell = {
    char: string;           // empty string if the cell is blank
    isPlaceholder: boolean; // true when char is placeholder text, not real content
    foreground: string;     // pre-resolved fill color for the char
    background: string | null; // pre-resolved cell background; null = transparent
    gridColor: string | null;  // non-null if the cell grid line should be drawn
};

export type RenderTarget = {
    // Called once per frame before any row rendering.
    // Receives geometry and whether a full repaint (vs. dirty-row) is happening.
    // Caches geometry internally so clearRow/paintCell don't repeat it.
    beginFrame(state: GeometryState, fullRepaint: boolean): void;

    // Clear a single row's rect. Called in dirty-row mode before painting that row.
    clearRow(row: number): void;

    // Paint one cell. Renderer calls this for every cell in every dirty row.
    paintCell(col: number, row: number, cell: RenderedCell): void;

    // Called after all rows are painted. No-op for Canvas2D; useful for buffered targets.
    endFrame(): void;
};

// ===== Canvas 2D render target =====

export function CanvasRenderTarget(ctx: CanvasRenderingContext2D): RenderTarget {
    let geo: GeometryState | null = null;

    return {
        beginFrame(state: GeometryState, fullRepaint: boolean): void {
            geo = state;

            if (fullRepaint) {
                ctx.clearRect(0, 0, state.cols * state.cellWidth, state.rows * state.cellHeight);
            }
        },

        clearRow(row: number): void {
            if (!geo) return;

            ctx.clearRect(0, row * geo.cellHeight, geo.cols * geo.cellWidth, geo.cellHeight);
        },

        paintCell(col: number, row: number, cell: RenderedCell): void {
            if (!geo) return;

            const x = col * geo.cellWidth;
            const y = row * geo.cellHeight;

            if (cell.background !== null) {
                ctx.fillStyle = cell.background;
                ctx.fillRect(x, y, geo.cellWidth, geo.cellHeight);
            }

            if (cell.gridColor !== null) {
                ctx.strokeStyle = cell.gridColor;
                ctx.lineWidth = 0.5;
                ctx.strokeRect(x + 0.25, y + 0.25, geo.cellWidth - 0.5, geo.cellHeight - 0.5);
            }

            if (cell.char) {
                ctx.fillStyle = cell.foreground;
                ctx.fillText(cell.char, x, y + geo.cellHeight);
            }
        },

        endFrame(): void {
            // no-op for canvas — the browser flushes automatically
        },
    };
}

// ===== Renderer =====
//
// Holds the previous-frame snapshot used for dirty-row diffing.
// Constructs RenderedCell values from display state + theme + selection + active-region logic,
// then delegates the actual drawing to the RenderTarget.

// Value-equal comparison so reference changes from recompose don't spuriously dirty rows.
function regionsEqual(a: Region | null, b: Region | null): boolean {
    if (a === b) return true;
    if (!a || !b) return false;

    return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
}

export function Renderer(target: RenderTarget) {
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
            const curRow = state.displayLayer.chars[r];
            const prevRow = prevChars[r];
            const curStyles = state.displayLayer.cellStyles[r];
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
        prevChars = state.displayLayer.chars.map((row) => row.slice());
        prevStyles = state.displayLayer.cellStyles.map((row) =>
            row.map((s) => (s ? { bg: s.bg, placeholder: s.placeholder } : null)),
        );
        prevSelected = state.selected;
        prevActiveRegion = state.activeRegion;
        allDirty = false;
    }

    // Force the next render() call to repaint every row — call after resize or theme change.
    function invalidateAll(): void {
        allDirty = true;
    }

    // Renders the display layer to the target. The cursor is NOT drawn here — it lives on a
    // separate overlay so it can blink via CSS animation without triggering a main-canvas repaint.
    function render(state: EditorState, theme: ThemeColors): void {
        const { background, foreground, inputBg, placeholderColor, gridLine, activeRegionBorderColor } = theme;

        const dirty = computeDirtyRows(state);
        const fullRepaint = dirty === null;

        target.beginFrame(state, fullRepaint);

        for (let row = 0; row < state.rows; row++) {
            if (!fullRepaint && !dirty!.has(row)) continue;

            if (!fullRepaint) {
                target.clearRow(row);
            }

            for (let col = 0; col < state.cols; col++) {
                const char = state.displayLayer.chars[row]?.[col] || '';
                const cellStyle = state.displayLayer.cellStyles?.[row]?.[col];
                const isSelected = state.selected ? isInSelection(col, row, state.selected) : false;

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

                let cellBackground: string | null = null;

                if (cellStyle && 'bg' in cellStyle) {
                    cellBackground = cellStyle.bg ?? inputBg;
                }

                if (isSelected) {
                    cellBackground = foreground;
                }

                const isPlaceholder = !char && !!cellStyle?.placeholder;
                const displayChar = char || (isPlaceholder ? cellStyle!.placeholder! : '');
                const charForeground = isSelected
                    ? background
                    : isRegionBorder
                      ? activeRegionBorderColor
                      : isPlaceholder
                        ? placeholderColor
                        : foreground;

                target.paintCell(col, row, {
                    char: displayChar,
                    isPlaceholder,
                    foreground: charForeground,
                    background: cellBackground,
                    gridColor: state.showGrid ? gridLine : null,
                });
            }
        }

        target.endFrame();

        snapshotState(state);
    }

    return { render, invalidateAll };
}
