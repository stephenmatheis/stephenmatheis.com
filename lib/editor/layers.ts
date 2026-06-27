import { compose, getInputRef } from '@/lib/editor/tui';
import type { InputNode, LayoutNode, Region } from '@/lib/editor/tui';
import { readInputValue } from './focus';
import type { CellPos, CellStyle, FloatAnchor, Layer } from './types';
import type { GeometryState, LayerContent, RegionState, CursorState } from './types';

export type LayerState = LayerContent & Pick<GeometryState, 'cols' | 'rows'> & RegionState & Pick<CursorState, 'cursor'>;

type Rect = { x: number; y: number; w: number; h: number };

type FocusHandle = {
    collectInputs(node: LayoutNode): void;
    focusRegion(index: number): void;
};

export type LayersProps = {
    state: LayerState;
    inputMap: Map<Region, InputNode>;
    focus: FocusHandle;
    // Called when the main layer's node tree needs to be re-composed.
    // Updates state.regions, state.activeRegion, the dynamic-text redraw closure, and inputMap.
    rebuildMainContent: (node: LayoutNode, mainLayer: Layer) => void;
};

export function Layers({ state, inputMap, focus, rebuildMainContent }: LayersProps) {
    let savedRegions: Region[] = [];
    let savedRegionIndex = 0;
    let modalRect: Rect | null = null;
    let currentModal: LayoutNode | null = null;
    let currentFloat: LayoutNode | null = null;
    let floatRect: Rect | null = null;

    // Pre-computed layer ownership bitmap. Values: 0 = main, 1 = float, 2 = modal.
    // Rebuilt whenever any rect changes — eliminates per-cell inRect() calls in compositeIntoDisplay.
    let layerOwnership = new Uint8Array(0);

    // ===== Grid utilities =====

    function createLayer(): Layer {
        return {
            chars: Array.from({ length: state.rows }, () => Array(state.cols).fill('')),
            cellStyles: Array.from({ length: state.rows }, () => Array(state.cols).fill(null)),
        };
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

    // Merge all active layers into state.displayLayer.
    // Priority (highest first): modal → float → main.
    // Uses the pre-computed layerOwnership bitmap instead of per-cell rect tests.
    // Only called from flushRenderPipeline when modalLayer or floatLayer is non-null.
    function compositeIntoDisplay(): void {
        for (let r = 0; r < state.rows; r++) {
            for (let c = 0; c < state.cols; c++) {
                const owner = layerOwnership[r * state.cols + c];

                if (owner === 2) {
                    state.displayLayer.chars[r][c] = state.modalLayer!.chars[r]?.[c] ?? '';
                    state.displayLayer.cellStyles[r][c] = state.modalLayer!.cellStyles[r]?.[c] ?? null;
                } else if (owner === 1) {
                    state.displayLayer.chars[r][c] = state.floatLayer!.chars[r]?.[c] ?? '';
                    // Floats are visual-only in v1 — no cellStyles layer.
                    state.displayLayer.cellStyles[r][c] = null;
                } else {
                    state.displayLayer.chars[r][c] = state.mainLayer.chars[r]?.[c] ?? '';
                    state.displayLayer.cellStyles[r][c] = state.mainLayer.cellStyles[r]?.[c] ?? null;
                }
            }
        }
    }

    // Rebuild the per-cell style grid for the given layer every draw so
    // placeholder/background stay in sync with live input values without
    // touching the chars grid.
    function applyInputOverlays(layer: Layer): void {
        if (!layer.cellStyles.length) return;

        for (let r = 0; r < state.rows; r++) {
            for (let c = 0; c < state.cols; c++) {
                layer.cellStyles[r][c] = null;
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

                    layer.cellStyles[y][x] = style;
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

    // Opens a modal overlay. Freezes the main layer's input styles for compositing,
    // then allocates a fresh modal layer and redirects all writes to it.
    // Caller must call requestRender() after.
    function showModal(node: LayoutNode): void {
        savedRegionIndex = state.activeRegion ? Math.max(0, state.regions.indexOf(state.activeRegion)) : 0;
        savedRegions = state.regions;

        // Freeze the main layer's input styles before modal takes over as the active layer.
        // activeLayer still equals mainLayer here, so applyInputOverlays writes to mainLayer.cellStyles.
        applyInputOverlays(state.mainLayer);

        // Allocate a fresh modal layer and redirect all writes to it.
        state.modalLayer = createLayer();
        state.activeLayer = state.modalLayer;
        state.displayLayer = createLayer();

        currentModal = node;

        const { positioned, x, y, w, h } = positionModal(node);

        modalRect = { x, y, w, h };

        rebuildOwnership();

        const [modalRegions] = compose(positioned, state.modalLayer.chars);

        state.regions = modalRegions;

        inputMap.clear();

        focus.collectInputs(positioned);
        focus.focusRegion(0);
    }

    // Restores the main layer as the active write target after the modal closes.
    // Caller must call requestRender() after.
    function hideModal(currentNode: LayoutNode | null): void {
        currentModal = null;
        modalRect = null;

        rebuildOwnership();

        state.modalLayer = null;
        state.activeLayer = state.mainLayer;

        if (!state.floatLayer) {
            state.displayLayer = state.mainLayer;
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

    // Composes a float overlay without redirecting activeLayer or trapping focus.
    // Caller must call requestRender() after.
    function showFloat(node: LayoutNode, anchor?: FloatAnchor): void {
        currentFloat = node;

        state.floatLayer = createLayer();

        const { positioned, x, y, w, h } = positionFloat(node, anchor);

        floatRect = { x, y, w, h };

        rebuildOwnership();

        compose(positioned, state.floatLayer.chars);

        // Allocate a composite display buffer only if displayLayer still aliases mainLayer.
        if (state.displayLayer === state.mainLayer) {
            state.displayLayer = createLayer();
        }
    }

    // Tears down float state without triggering a render.
    // Used by hideFloat and dismissFloatIfOutside so the calling mousedown
    // handler's own requestRender() covers the repaint.
    function clearFloat(): void {
        currentFloat = null;
        state.floatLayer = null;
        floatRect = null;

        rebuildOwnership();

        if (!currentModal) {
            state.displayLayer = state.mainLayer;
        }
    }

    // Caller must call requestRender() after.
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

    // Called by the Canvas layout callback after canvas.ts has allocated a fresh mainLayer.
    // Rebuilds all layer state to fit the new grid dimensions.
    function handleLayout(currentNode: LayoutNode | null): void {
        if (currentModal) {
            // On resize during a modal: rebuild main layout into the fresh mainLayer,
            // then reallocate modal and display layers at the new size.
            if (currentNode) {
                rebuildMainContent(currentNode, state.mainLayer);

                // Freeze the main layer's input styles now that main content is rebuilt.
                applyInputOverlays(state.mainLayer);
            }

            state.modalLayer = createLayer();
            state.activeLayer = state.modalLayer;
            state.displayLayer = createLayer();

            const { positioned, x, y, w, h } = positionModal(currentModal);

            modalRect = { x, y, w, h };

            rebuildOwnership();

            const [modalRegions] = compose(positioned, state.modalLayer.chars);

            state.regions = modalRegions;

            inputMap.clear();

            focus.collectInputs(positioned);

            if (state.activeRegion) {
                state.cursor = { x: state.activeRegion.x, y: state.activeRegion.y };
            }
        } else {
            // Normal resize: canvas.ts already set activeLayer and displayLayer to mainLayer.
            if (!currentNode) return;

            rebuildMainContent(currentNode, state.mainLayer);

            if (currentFloat) {
                state.displayLayer = createLayer();
                state.floatLayer = createLayer();

                const { positioned: fp, x: fx, y: fy, w: fw, h: fh } = positionFloat(currentFloat);

                floatRect = { x: fx, y: fy, w: fw, h: fh };

                rebuildOwnership();

                compose(fp, state.floatLayer.chars);
            }
        }

        // If both a modal and float are active, rebuild the float at the new size too.
        if (currentModal && currentFloat) {
            state.floatLayer = createLayer();

            const { positioned: fp, x: fx, y: fy, w: fw, h: fh } = positionFloat(currentFloat);

            floatRect = { x: fx, y: fy, w: fw, h: fh };

            rebuildOwnership();

            compose(fp, state.floatLayer.chars);
        }
    }

    return {
        isModalOpen: (): boolean => currentModal !== null,
        isFloatOpen: (): boolean => currentFloat !== null,
        applyInputOverlays,
        compositeIntoDisplay,
        showModal,
        hideModal,
        showFloat,
        clearFloat,
        hideFloat,
        dismissFloatIfOutside,
        handleLayout,
    };
}
