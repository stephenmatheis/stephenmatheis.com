import { Renderer, readTheme } from './render';
import { Keyboard } from './keyboard';
import { Mouse } from './mouse';
import { History } from './history';
import { Cursor } from './cursor';
import { Buffer } from './buffer';
import { Selection } from './selection';
import { ResponsiveCanvas } from './canvas';
import { Focus } from './focus';
import { Layers } from './layers';
import { composeStatusBar } from './statusbar';
import { log } from '@/lib/utils';
import { compose, disposeInput } from '@/lib/editor/tui';
import { saveSnapshot, loadSnapshot, listSnapshots } from './db';
import type { InputNode, LayoutNode, Region } from '@/lib/editor/tui';
import type { SnapshotMeta } from './db';
import type { EditorState, StatusBar, FloatAnchor, Theme } from './types';

export type { CellPos, CellStyle, Selected, Snapshot, EditorState, StatusBar, FloatAnchor } from './types';
export type { SnapshotMeta } from './db';

type Editor = {
    canvas: HTMLCanvasElement;
    textarea: HTMLTextAreaElement;
    container: HTMLElement;
};

export function Editor({ canvas, textarea, container }: Editor) {
    const ctx = canvas.getContext('2d')!;

    log('EditorState created.');

    const state: EditorState = {
        cellWidth: 0,
        cellHeight: 0,
        fontStr: '',
        chars: [],
        displayChars: [],
        cols: 0,
        rows: 0,
        cursor: { x: 0, y: 0 },
        regions: [],
        activeRegion: null,
        cellStyles: [],
        displayCellStyles: [],
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

    let theme: Theme = readTheme();
    let currentNode: LayoutNode | null = null;
    let statusBarConfig: StatusBar | null = null;

    // ===== G2: RAF-batched draw scheduler =====

    // scheduleDraw() coalesces multiple draw requests in a single tick into one RAF frame.
    let rafId: number | null = null;

    function draw(): void {
        if (rafId !== null) return;

        rafId = requestAnimationFrame(() => {
            rafId = null;

            if (!currentNode) return;

            layers.applyInputOverlays();

            if (statusBarConfig) {
                log('draw() > writeStatusBar()');
                composeStatusBar(statusBarConfig, state, layers.mainChars);
            }

            if (layers.isModalOpen() || layers.isFloatOpen()) {
                layers.compositeChars();
                layers.compositeStyles();
            }

            log('draw() > render()');

            renderer.render(ctx, state, theme);

            cursor.render();
        });
    }

    function applyLayout(node: LayoutNode, chars: string[][]): void {
        const regions = compose(node, chars);

        state.regions = regions;
        state.activeRegion = regions[0] ?? null;

        if (state.activeRegion) {
            state.cursor = { x: state.activeRegion.x, y: state.activeRegion.y };
        }

        inputMap.clear();

        focus.collectInputs(node);
    }

    function getComposeChars(): string[][] {
        return statusBarConfig ? layers.mainChars.slice(0, -1) : layers.mainChars;
    }

    // ===== Module construction =====

    // focus is created first because it needs draw (scheduleDraw) for InputRef.draw.
    const focus = Focus({
        state,
        inputMap,
        draw,
    });

    // layers is created after focus so applyLayout (which uses focus) is defined first.
    const layers = Layers({ state, inputMap, focus, applyLayout });

    // renderer is stateful — tracks previous-frame snapshots for dirty-row diffing (G1).
    const renderer = Renderer();

    // ===== G3: Cursor canvas overlay =====

    const cursor = Cursor({
        container,
        state,
        theme,
    });

    // ===== Remaining modules =====

    const buffer = Buffer({ state, cursor });
    const selection = Selection(state);
    const history = History({ state, selection });
    const keyboard = Keyboard({
        textarea,
        state,
        draw,
        cursor,
        buffer,
        history,
        selection,
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
                draw();
            },
        },
        floatActions: {
            isOpen: layers.isFloatOpen,
            dismiss() {
                layers.hideFloat();
                draw();
            },
        },
    });
    const mouse = Mouse({
        container,
        canvas,
        textarea,
        state,
        draw,
        startMouseSelection: selection.startMouseSelection,
        extendMouseSelection: selection.extendMouseSelection,
        endMouseSelection: selection.endMouseSelection,
        focusAtCell: focus.focusAtCell,
        endOfContent: () => (state.activeRegion ? focus.endOfContent(state.activeRegion) : { x: 0, y: 0 }),
        setCursor: cursor.jumpTo,
        dismissFloatIfOutside: layers.dismissFloatIfOutside,
    });
    const responsiveCanvas = ResponsiveCanvas({
        canvas,
        ctx,
        state,
        draw,
        onResize() {
            theme = readTheme();
            renderer.invalidateAll();
        },
        layout(chars) {
            log('? createSetup() > layout()');
            layers.handleLayout(chars, currentNode, statusBarConfig !== null);
        },
    });

    cursor.render();
    mouse.add();
    keyboard.add();
    responsiveCanvas.add();

    textarea.focus();

    return {
        get cols() {
            return state.cols;
        },
        get rows() {
            return state.rows;
        },
        get cursor() {
            return state.cursor;
        },
        get activeRegion() {
            return state.activeRegion;
        },
        root: {
            add(node: LayoutNode) {
                currentNode = node;

                log('editor.root.add() > compose()');
                applyLayout(node, getComposeChars());

                log('editor.root.add() > draw()');
                draw();
            },
        },
        modal: {
            show(node: LayoutNode) {
                layers.showModal(node);
                draw();
            },
            hide() {
                layers.hideModal(currentNode);
                draw();
            },
        },
        float: {
            show(node: LayoutNode, anchor?: FloatAnchor) {
                layers.showFloat(node, anchor);
                draw();
            },
            hide() {
                layers.hideFloat();
                draw();
            },
        },
        statusBar(config: StatusBar) {
            statusBarConfig = config;

            if (currentNode) {
                log('editor.statusBar() > compose()');
                applyLayout(currentNode, getComposeChars());
            }

            log('editor.statusBar() > draw()');
            draw();
        },
        theme(name: 'light' | 'dark') {
            document.documentElement.dataset.theme = name;

            theme = readTheme();

            renderer.invalidateAll();

            draw();
        },
        toggleGrid() {
            state.showGrid = !state.showGrid;

            renderer.invalidateAll();

            draw();
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

            await saveSnapshot(id, label, state.cols, state.rows, state.displayChars, state.displayCellStyles);

            return id;
        },
        async load(id: string): Promise<boolean> {
            const snap = await loadSnapshot(id);

            if (!snap) return false;

            state.displayChars = snap.chars;
            state.displayCellStyles = snap.cellStyles;

            renderer.invalidateAll();

            draw();

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

            inputMap.clear();
        },
    };
}
