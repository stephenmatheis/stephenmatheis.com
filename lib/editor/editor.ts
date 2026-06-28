import { Renderer, CanvasRenderTarget } from './render';
import { Theme } from './theme';
import { Keyboard } from './keyboard';
import { Mouse } from './mouse';
import { History } from './history';
import { Cursor } from './cursor';
import { Buffer } from './buffer';
import { Selection } from './selection';
import { ResponsiveCanvas } from './canvas';
import { Focus } from './focus';
import { Layers } from './layers';
import { compose, disposeInput, disposeTextarea, getInputRef, getTextareaRef } from '@/lib/editor/tui';
import { saveSnapshot, loadSnapshot, listSnapshots } from './db';
import type { InputNode, LayoutNode, Region, TextareaNode } from '@/lib/editor/tui';
import type { SnapshotMeta } from './db';
import type { EditorState, FloatAnchor, Layer } from './types';

export type { CellPos, CellStyle, Selected, Snapshot, EditorState, FloatAnchor } from './types';
export type { SnapshotMeta } from './db';
export type { RenderTarget, RenderedCell } from './render';

type EditorProps = {
    canvas: HTMLCanvasElement;
    textarea: HTMLTextAreaElement;
    container: HTMLElement;
};

type EditorEvents = {
    afterRender: (() => void) | null;
};

export function Editor({ canvas, textarea, container }: EditorProps) {
    const ctx = canvas.getContext('2d')!;
    const state: EditorState = {
        cellWidth: 0,
        cellHeight: 0,
        fontStr: '',
        cols: 0,
        rows: 0,
        cursor: { x: 0, y: 0 },
        regions: [],
        activeRegion: null,
        mainLayer: { chars: [], cellStyles: [] },
        modalLayer: null,
        floatLayer: null,
        activeLayer: { chars: [], cellStyles: [] },
        displayLayer: { chars: [], cellStyles: [] },
        selected: null,
        cursorVisible: true,
        isDragging: false,
        selectionAnchor: null,
        keyboardAnchor: null,
        undoStack: [],
        redoStack: [],
        showGrid: true,
    };
    const inputMap = new Map<Region, InputNode>();
    const textareaMap = new Map<Region, TextareaNode>();
    const editorEvents: EditorEvents = {
        afterRender: null,
    };

    let currentNode: LayoutNode | null = null;
    let dynamicTextRedraw: (() => void) | null = null;
    let rafId: number | null = null;

    // ===== Render pipeline =====
    //
    // requestRender() enqueues a repaint via requestAnimationFrame.
    // flushRenderPipeline() is the RAF callback — it runs the five named phases below.
    // No module other than editor.ts knows about the phase ordering; all they do is call requestRender().

    function flushRenderPipeline(): void {
        rafId = null;

        if (!currentNode) return;

        // Phase 1 — Refresh input overlays and dynamic text.
        // Writes input backgrounds and placeholder text into the active layer's cellStyles.
        // Calls any dynamic Text node closures to refresh their chars.
        layers.applyInputOverlays(state.activeLayer);
        dynamicTextRedraw?.();

        // Phase 2 — Composite layers into displayLayer.
        // Only needed when a modal or float is visible; otherwise displayLayer aliases mainLayer.
        if (state.modalLayer || state.floatLayer) {
            layers.compositeIntoDisplay();
        }

        // Phase 3 — Paint the display layer to the render target.
        renderer.render(state, theme.get());

        // Phase 4 — Paint the cursor overlay.
        // The cursor lives on a separate canvas so it can blink via CSS animation
        // without triggering a main-canvas repaint.
        cursor.render();

        // Phase 5 — Post-render hook for external consumers.
        editorEvents.afterRender?.();
    }

    function requestRender(): void {
        if (rafId !== null) return;

        rafId = requestAnimationFrame(flushRenderPipeline);
    }

    // After undo/redo restores a chars snapshot, rebuild input/textarea buffers from
    // the visible chars grid. This keeps buffer state in sync with what's displayed.
    function syncBuffersFromChars(): void {
        for (const [region, node] of inputMap) {
            const ref = getInputRef(node);

            if (!ref) continue;

            const rowSlice = (state.activeLayer.chars[region.y] ?? []).slice(region.x, region.x + region.width);
            const value = rowSlice.join('').trimEnd();

            ref.buffer = value ? value.split('') : [];
            ref.scrollOffset = 0;
        }

        for (const [region, node] of textareaMap) {
            const ref = getTextareaRef(node);

            if (!ref) continue;

            const chars: string[] = [];

            for (let dy = 0; dy < region.height; dy++) {
                const row = region.y + dy;
                const rowSlice = (state.activeLayer.chars[row] ?? []).slice(region.x, region.x + region.width);

                chars.push(...rowSlice);
            }

            while (chars.length > 0 && chars[chars.length - 1] === '') {
                chars.pop();
            }

            ref.buffer = chars;
            ref.scrollOffset = 0;
        }
    }

    // Rebuilds the main layer's content from a node tree. Called by root.add,
    // layers.hideModal, and layers.handleLayout (via the rebuildMainContent callback).
    function rebuildMainContent(node: LayoutNode, mainLayer: Layer): void {
        const [regions, dynamicTextWillRedraw] = compose(node, mainLayer.chars);

        state.regions = regions;
        state.activeRegion = regions[0] ?? null;

        dynamicTextRedraw = dynamicTextWillRedraw;

        if (state.activeRegion) {
            state.cursor = { x: state.activeRegion.x, y: state.activeRegion.y };
        }

        inputMap.clear();
        textareaMap.clear();

        focus.collectInputs(node);
        focus.collectTextareas(node);
    }

    const theme = Theme();
    const focus = Focus({
        state,
        inputMap,
        textareaMap,
        requestRender,
    });
    const layers = Layers({ state, inputMap, textareaMap, focus, rebuildMainContent });
    const canvasTarget = CanvasRenderTarget(ctx);
    const renderer = Renderer(canvasTarget);
    const cursor = Cursor({
        container,
        state,
        getTheme: theme.get,
        inputMap,
        textareaMap,
    });
    const buffer = Buffer({
        state,
        cursor,
        inputMap,
        textareaMap,
    });
    const selection = Selection({ state });
    const history = History({
        state,
        selection,
        afterChange: syncBuffersFromChars,
    });
    const keyboard = Keyboard({
        textarea,
        state,
        cursor,
        buffer,
        history,
        selection,
        requestRender,
        focus: {
            focusNext: focus.focusNext,
            focusPrev: focus.focusPrev,
        },
        inputActions: {
            isActiveInput() {
                return inputMap.has(state.activeRegion!);
            },
            emitEvent: focus.emitInputEvent,
            emitChangeIfChanged: focus.checkAndEmitChange,
        },
        modalActions: {
            isOpen: layers.isModalOpen,
            dismiss() {
                layers.hideModal(currentNode);
                requestRender();
            },
        },
        floatActions: {
            isOpen: layers.isFloatOpen,
            dismiss() {
                layers.hideFloat();
                requestRender();
            },
        },
    });
    const mouse = Mouse({
        container,
        canvas,
        textarea,
        state,
        requestRender,
        startMouseSelection: selection.startMouseSelection,
        extendMouseSelection: selection.extendMouseSelection,
        endMouseSelection: selection.endMouseSelection,
        focusAtCell: focus.focusAtCell,
        endOfContent: focus.endOfContent,
        setCursor: cursor.jumpTo,
        dismissFloatIfOutside: layers.dismissFloatIfOutside,
    });
    const responsiveCanvas = ResponsiveCanvas({
        canvas,
        ctx,
        state,
        requestRender,
        onResize() {
            theme.refresh();
            renderer.invalidateAll();
        },
        layout() {
            // Save logical cursor offset before recompose wipes and rebuilds regions.
            // Buffer content survives in the registries; only cursor position needs saving.
            const savedRegionIndex = state.regions.indexOf(state.activeRegion!);
            const savedLogical = focus.saveCursorLogical();

            layers.handleLayout(currentNode);

            focus.restoreCursorLogical(savedRegionIndex, savedLogical);
        },
    });

    mouse.add();
    keyboard.add();
    responsiveCanvas.add();
    cursor.render();

    textarea.focus();

    return {
        get ln() {
            return state.cursor.y - (state.activeRegion?.y || 0) + 1;
        },
        get col() {
            return state.cursor.x - (state.activeRegion?.x || 0) + 1;
        },
        get cols() {
            return state.cols;
        },
        get rows() {
            return state.rows;
        },
        get regionCols() {
            return state.activeRegion?.width || '';
        },
        get regionRows() {
            return state.activeRegion?.height || '';
        },
        get cursor() {
            return state.cursor;
        },
        get activeRegion() {
            return state.activeRegion;
        },
        on(event: 'afterRender', action: () => void) {
            if (event === 'afterRender') {
                editorEvents.afterRender = action;
            }
        },
        root: {
            set(node: LayoutNode) {
                currentNode = node;

                rebuildMainContent(node, state.mainLayer);
                requestRender();
            },
        },
        modal: {
            show(node: LayoutNode) {
                layers.showModal(node);
                requestRender();
            },
            hide() {
                layers.hideModal(currentNode);
                requestRender();
            },
        },
        float: {
            show(node: LayoutNode, anchor?: FloatAnchor) {
                layers.showFloat(node, anchor);
                requestRender();
            },
            hide() {
                layers.hideFloat();
                requestRender();
            },
        },
        theme(name: 'light' | 'dark') {
            theme.set(name);

            renderer.invalidateAll();

            requestRender();
        },
        toggleGrid() {
            state.showGrid = !state.showGrid;

            renderer.invalidateAll();

            requestRender();
        },
        setFont(family: string) {
            document.documentElement.style.setProperty('--canvas-font-family', family);

            responsiveCanvas.setSize();
        },
        setFontSize(px: number) {
            document.documentElement.style.setProperty('--canvas-font-size', `${px}px`);

            responsiveCanvas.setSize();
        },
        async save(name?: string): Promise<string> {
            const id = typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : `snap-${Date.now()}`;
            const label = name ?? new Date().toLocaleString();

            await saveSnapshot(
                id,
                label,
                state.cols,
                state.rows,
                state.displayLayer.chars,
                state.displayLayer.cellStyles,
            );

            return id;
        },
        async load(id: string): Promise<boolean> {
            const snap = await loadSnapshot(id);

            if (!snap) return false;

            state.displayLayer = { chars: snap.chars, cellStyles: snap.cellStyles };

            renderer.invalidateAll();

            requestRender();

            return true;
        },
        listSaves(): Promise<SnapshotMeta[]> {
            return listSnapshots();
        },
        destroy() {
            mouse.remove();
            keyboard.remove();
            cursor.remove();
            responsiveCanvas.remove();

            if (rafId !== null) {
                cancelAnimationFrame(rafId);
            }

            for (const node of inputMap.values()) {
                disposeInput(node);
            }

            for (const node of textareaMap.values()) {
                disposeTextarea(node);
            }

            inputMap.clear();
            textareaMap.clear();
        },
    };
}
