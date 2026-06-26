import { compose, getInputRef } from '@/lib/editor/tui';
import type { InputNode, LayoutNode, Region } from '@/lib/editor/tui';
import { readInputValue } from './focus';
import type { CellPos, CellStyle, FloatAnchor } from './types';
import type { ContentState, GeometryState, RegionState, CursorState } from './types';

// The full set of state fields the layer system reads and writes.
export type LayerState = ContentState & Pick<GeometryState, 'cols' | 'rows'> & RegionState & Pick<CursorState, 'cursor'>;

type Rect = { x: number; y: number; w: number; h: number };

type FocusHandle = {
    collectInputs(node: LayoutNode): void;
    focusRegion(index: number): void;
};

export type LayersProps = {
    state: LayerState;
    inputMap: Map<Region, InputNode>;
    focus: FocusHandle;
    // Called during hideModal and handleLayout to rebuild main-layer regions.
    applyLayout: (node: LayoutNode, chars: string[][]) => void;
};

// Buffer layer invariant:
//   mainChars        — the permanent main-layout buffer; always holds the composed main content.
//   state.chars      — the active write target. Equals mainChars in normal operation; redirected to
//                      a fresh grid when a modal is open so modal edits don't corrupt main content.
//   state.displayChars — the composited output render() reads. Equals mainChars when no overlays are
//                        active; a separate merged grid when a modal or float is visible. Layering
//                        priority (highest first): modal > float > main.
//
// All public methods leave these three pointers in a consistent state when they return.
// Callers are responsible for invoking draw() after any mutation.
export function Layers({ state, inputMap, focus, applyLayout }: LayersProps) {
    let mainChars: string[][] = [];
    let mainCellStyles: Array<Array<CellStyle | null>> = [];
    let savedRegions: Region[] = [];
    let savedRegionIndex = 0;
    let modalRect: Rect | null = null;
    let currentModal: LayoutNode | null = null;
    let currentFloat: LayoutNode | null = null;
    let floatChars: string[][] | null = null;
    let floatRect: Rect | null = null;

    // Pre-computed layer ownership bitmap. Values: 0 = main, 1 = float, 2 = modal.
    // Rebuilt whenever any rect changes — eliminates per-cell inRect() calls in compositeChars/Styles.
    let layerOwnership = new Uint8Array(0);

    // ===== Grid utilities =====

    function createGrid<T>(fill: T): T[][] {
        return Array.from({ length: state.rows }, () => Array(state.cols).fill(fill));
    }

    // Used only for dismissFloatIfOutside — not in the hot compositing path.
    function inRect(r: number, c: number, rect: Rect | null): boolean {
        if (!rect) return false;

        return r >= rect.y && r < rect.y + rect.h && c >= rect.x && c < rect.x + rect.w;
    }

    // Rebuild the ownership bitmap from current modal/float rects.
    // Float cells = 1, modal cells = 2 (modal wins where they overlap).
    function rebuildOwnership(): void {
        layerOwnership = new Uint8Array(state.rows * state.cols); // fills with 0 (main)

        if (floatRect) {
            const { x, y, w, h } = floatRect;

            for (let r = y; r < y + h && r < state.rows; r++) {
                for (let c = x; c < x + w && c < state.cols; c++) {
                    if (r >= 0 && c >= 0) layerOwnership[r * state.cols + c] = 1;
                }
            }
        }

        if (modalRect) {
            const { x, y, w, h } = modalRect;

            for (let r = y; r < y + h && r < state.rows; r++) {
                for (let c = x; c < x + w && c < state.cols; c++) {
                    if (r >= 0 && c >= 0) layerOwnership[r * state.cols + c] = 2;
                }
            }
        }
    }

    // ===== Compositing =====

    // Merge layers into display buffers. Priority (highest first): modal → float → main.
    // Uses the pre-computed layerOwnership bitmap instead of per-cell rect tests.
    function compositeChars(): void {
        for (let r = 0; r < state.rows; r++) {
            for (let c = 0; c < state.cols; c++) {
                const owner = layerOwnership[r * state.cols + c];

                if (owner === 2) {
                    // state.chars is the modal write layer when a modal is open.
                    state.displayChars[r][c] = state.chars[r]?.[c] || '';
                } else if (owner === 1) {
                    state.displayChars[r][c] = floatChars![r]?.[c] || '';
                } else {
                    state.displayChars[r][c] = mainChars[r]?.[c] || '';
                }
            }
        }
    }

    function compositeStyles(): void {
        for (let r = 0; r < state.rows; r++) {
            for (let c = 0; c < state.cols; c++) {
                const owner = layerOwnership[r * state.cols + c];

                if (owner === 2) {
                    state.displayCellStyles[r][c] = state.cellStyles[r]?.[c] ?? null;
                } else if (owner === 1) {
                    // Floats are visual-only in v1 — no cellStyles layer.
                    state.displayCellStyles[r][c] = null;
                } else {
                    state.displayCellStyles[r][c] = mainCellStyles[r]?.[c] ?? null;
                }
            }
        }
    }

    // Rebuild the per-cell style grid every draw so placeholder/background stay
    // in sync with live input values without touching state.chars.
    function applyInputOverlays(): void {
        if (!state.cellStyles.length) return;

        for (let r = 0; r < state.rows; r++) {
            for (let c = 0; c < state.cols; c++) {
                state.cellStyles[r][c] = null;
            }
        }

        for (const [region, node] of inputMap) {
            const ref = getInputRef(node);

            if (!ref) continue;

            const isEmpty = readInputValue(ref) === '';
            const placeholder = node.placeholder ?? '';

            for (let y = region.y; y < region.y + region.height; y++) {
                for (let x = region.x; x < region.x + region.width; x++) {
                    if (y < 0 || y >= state.rows || x < 0 || x >= state.cols) continue;

                    const style: CellStyle = {};

                    if (node.background !== false) {
                        style.bg = typeof node.background === 'string' ? node.background : null;
                    }

                    if (placeholder && isEmpty) {
                        const idx = x - region.x;

                        if (idx < placeholder.length) style.placeholder = placeholder[idx];
                    }

                    state.cellStyles[y][x] = style;
                }
            }
        }
    }

    // ===== Modal lifecycle =====

    function positionModal(node: LayoutNode): { positioned: LayoutNode; x: number; y: number; w: number; h: number } {
        const w = (node as { width?: number }).width ?? 60;
        const h = (node as { height?: number }).height ?? 20;
        const x = Math.max(0, Math.floor((state.cols - w) / 2));
        const y = Math.max(0, Math.floor((state.rows - h) / 2));

        return { positioned: { ...node, x, y, width: w, height: h } as LayoutNode, x, y, w, h };
    }

    // Snapshot current main layer, then redirect write buffers to a fresh modal grid.
    // Caller must call draw() after.
    function showModal(node: LayoutNode): void {
        savedRegionIndex = state.activeRegion ? Math.max(0, state.regions.indexOf(state.activeRegion)) : 0;
        savedRegions = state.regions;

        // Capture main input styles before swapping inputMap to the modal.
        const priorCellStyles = state.cellStyles;

        mainCellStyles = createGrid<CellStyle | null>(null);

        state.cellStyles = mainCellStyles;

        applyInputOverlays();

        state.cellStyles = priorCellStyles;

        // Redirect the active write layer to a fresh modal buffer.
        mainChars = state.chars;

        state.chars = createGrid('');
        state.cellStyles = createGrid<CellStyle | null>(null);
        state.displayChars = createGrid('');
        state.displayCellStyles = createGrid<CellStyle | null>(null);

        currentModal = node;

        const { positioned, x, y, w, h } = positionModal(node);

        modalRect = { x, y, w, h };

        rebuildOwnership();

        const [modalRegions] = compose(positioned, state.chars);

        state.regions = modalRegions;

        inputMap.clear();

        focus.collectInputs(positioned);
        focus.focusRegion(0);
    }

    // Restore main layer buffers and regions after the modal closes.
    // Caller must call draw() after.
    function hideModal(currentNode: LayoutNode | null): void {
        currentModal = null;
        modalRect = null;

        rebuildOwnership();

        state.chars = mainChars;
        state.cellStyles = mainCellStyles;

        if (!currentFloat) {
            state.displayChars = mainChars;
            state.displayCellStyles = mainCellStyles;
        }

        state.regions = savedRegions;

        inputMap.clear();

        if (currentNode) focus.collectInputs(currentNode);

        focus.focusRegion(savedRegionIndex);
    }

    // ===== Float lifecycle =====

    function positionFloat(
        node: LayoutNode,
        anchor?: FloatAnchor,
    ): { positioned: LayoutNode; x: number; y: number; w: number; h: number } {
        const w = (node as { width?: number }).width ?? 40;
        const h = (node as { height?: number }).height ?? 10;
        let x = 0;
        let y = 0;
        const a: FloatAnchor = anchor ?? { type: 'corner', corner: 'top-right' };

        if (a.type === 'absolute') {
            x = a.x;
            y = a.y;
        } else if (a.type === 'cell') {
            x = a.side === 'right' ? a.cell.x + 1 : a.side === 'left' ? a.cell.x - w : a.cell.x;
            y = a.side === 'below' ? a.cell.y + 1 : a.side === 'above' ? a.cell.y - h : a.cell.y;
        } else {
            const ox = a.offsetX ?? 1;
            const oy = a.offsetY ?? 1;

            x = a.corner.includes('right') ? state.cols - w - ox : ox;
            y = a.corner.includes('bottom') ? state.rows - h - oy : oy;
        }

        x = Math.max(0, Math.min(x, state.cols - w));
        y = Math.max(0, Math.min(y, state.rows - h));

        return { positioned: { ...node, x, y, width: w, height: h } as LayoutNode, x, y, w, h };
    }

    // Compose a float overlay without redirecting state.chars or trapping focus.
    // Caller must call draw() after.
    function showFloat(node: LayoutNode, anchor?: FloatAnchor): void {
        currentFloat = node;
        // Capture current main styles before allocating the composite buffer.
        mainCellStyles = state.cellStyles;

        floatChars = createGrid('');

        const { positioned, x, y, w, h } = positionFloat(node, anchor);

        floatRect = { x, y, w, h };

        rebuildOwnership();

        compose(positioned, floatChars);

        // Allocate a composite display buffer only if display still points at mainChars.
        if (state.displayChars === mainChars) {
            state.displayChars = createGrid('');
            state.displayCellStyles = createGrid<CellStyle | null>(null);
        }
    }

    // Tear down float state without rendering. Used by hideFloat and dismissFloatIfOutside
    // so the latter can let the calling mousedown handler's own draw() cover the render.
    function clearFloat(): void {
        currentFloat = null;
        floatChars = null;
        floatRect = null;

        rebuildOwnership();

        if (!currentModal) {
            state.displayChars = mainChars;
            state.displayCellStyles = mainCellStyles;
        }
    }

    // Caller must call draw() after.
    function hideFloat(): void {
        clearFloat();
    }

    function dismissFloatIfOutside(cell: CellPos): boolean {
        if (currentFloat && floatRect && !inRect(cell.y, cell.x, floatRect)) {
            clearFloat();

            return true;
        }

        return false;
    }

    // ===== Resize handler =====

    // Called by the Canvas layout callback on every resize. Rebuilds all layer state
    // to fit the new grid dimensions.
    function handleLayout(chars: string[][], currentNode: LayoutNode | null): void {
        if (currentModal) {
            // On resize during a modal: rebuild main layout into a fresh main buffer,
            // then reallocate modal buffers at the new size.
            mainChars = createGrid('');

            if (currentNode) {
                applyLayout(currentNode, mainChars);

                const savedCellStyles = state.cellStyles;

                mainCellStyles = createGrid<CellStyle | null>(null);

                state.cellStyles = mainCellStyles;

                applyInputOverlays();

                state.cellStyles = savedCellStyles;
            }

            state.chars = createGrid('');
            state.cellStyles = createGrid<CellStyle | null>(null);
            state.displayChars = chars;
            state.displayCellStyles = state.cellStyles;

            const { positioned, x, y, w, h } = positionModal(currentModal);

            modalRect = { x, y, w, h };

            rebuildOwnership();

            const [modalRegions] = compose(positioned, state.chars);

            state.regions = modalRegions;

            inputMap.clear();

            focus.collectInputs(positioned);

            if (state.activeRegion) {
                state.cursor = { x: state.activeRegion.x, y: state.activeRegion.y };
            }
        } else {
            // Normal resize: main layer takes the fresh chars grid.
            mainChars = chars;
            state.displayChars = chars;
            state.displayCellStyles = state.cellStyles;

            if (!currentNode) return;

            applyLayout(currentNode, mainChars);

            if (currentFloat) {
                state.displayChars = createGrid('');
                state.displayCellStyles = createGrid<CellStyle | null>(null);

                floatChars = createGrid('');

                const { positioned: fp, x: fx, y: fy, w: fw, h: fh } = positionFloat(currentFloat);

                floatRect = { x: fx, y: fy, w: fw, h: fh };

                rebuildOwnership();

                compose(fp, floatChars);
            }
        }

        // If both a modal and float are active, rebuild the float at the new size.
        if (currentModal && currentFloat) {
            floatChars = createGrid('');

            const { positioned: fp, x: fx, y: fy, w: fw, h: fh } = positionFloat(currentFloat);

            floatRect = { x: fx, y: fy, w: fw, h: fh };

            rebuildOwnership();

            compose(fp, floatChars);
        }
    }

    return {
        get mainChars(): string[][] {
            return mainChars;
        },
        isModalOpen: (): boolean => currentModal !== null,
        isFloatOpen: (): boolean => currentFloat !== null,
        applyInputOverlays,
        compositeChars,
        compositeStyles,
        showModal,
        hideModal,
        showFloat,
        clearFloat,
        hideFloat,
        dismissFloatIfOutside,
        handleLayout,
    };
}
