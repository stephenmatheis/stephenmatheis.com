import { readTheme, createRenderer } from './render';
import type { Theme } from './render';
import { Keyboard } from './keyboard';
import { MouseHandlers } from './mouse';
import { History } from './history';
import { Cursor } from './cursor';
import { Buffer } from './buffer';
import { Selection } from './selection';
import { Canvas } from './setup';
import { Focus } from './focus';
import { Layers } from './layers';
import { composeStatusBar } from './statusbar';
import { log } from '@/lib/utils';
import { compose, disposeInput } from '@/lib/editor/tui';
import type { InputNode, LayoutNode, Region } from '@/lib/editor/tui';
import type { EditorState, StatusBar, FloatAnchor } from './types';

export type { CellPos, CellStyle, Selected, Snapshot, EditorState, StatusBar, FloatAnchor } from './types';

type Editor = {
    canvas: HTMLCanvasElement;
    textarea: HTMLTextAreaElement;
    container: HTMLElement;
};

// CSS animation injected once per page for the cursor blink overlay.
function ensureCursorStyles(): void {
    if (document.querySelector('#editor-cursor-style')) return;

    const style = document.createElement('style');

    style.id = 'editor-cursor-style';
    style.textContent = [
        '.editor-cursor{position:absolute;pointer-events:none;z-index:1;}',
        '.editor-cursor.visible{animation:editor-cursor-blink 1.2s step-end infinite;}',
        '@keyframes editor-cursor-blink{0%,100%{opacity:1}50%{opacity:0}}',
    ].join('');
    document.head.appendChild(style);
}

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
    };

    const inputMap = new Map<Region, InputNode>();

    let theme: Theme = readTheme();
    let currentNode: LayoutNode | null = null;
    let statusBarConfig: StatusBar | null = null;

    // ===== G2: RAF-batched draw scheduler =====

    // scheduleDraw() coalesces multiple draw requests in a single tick into one RAF frame.
    // actualDraw() runs the real render work — defined after layers to avoid forward refs.
    let rafId: number | null = null;

    function scheduleDraw(): void {
        if (rafId !== null) return;

        rafId = requestAnimationFrame(() => {
            rafId = null;

            actualDraw();
        });
    }

    // ===== Module construction =====

    // focus is created first because it needs draw (scheduleDraw) for InputRef.draw.
    const focus = Focus({ state, inputMap, draw: scheduleDraw });

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

    // layers is created after focus so applyLayout (which uses focus) is defined first.
    const layers = Layers({ state, inputMap, focus, applyLayout });

    // renderer is stateful — tracks previous-frame snapshots for dirty-row diffing (G1).
    const renderer = createRenderer();

    // ===== G3: Cursor canvas overlay =====

    // A second canvas positioned absolutely over the main canvas. Only draws the cursor
    // cell, so cursor blink (CSS animation) never triggers a main-canvas repaint.
    ensureCursorStyles();
    container.style.position = 'relative';

    const cursorCanvas = document.createElement('canvas');
    const cursorCtx = cursorCanvas.getContext('2d')!;

    cursorCanvas.className = 'editor-cursor';
    container.appendChild(cursorCanvas);

    function renderCursor(): void {
        if (!state.cursorVisible || !state.cellWidth || !state.cellHeight) {
            cursorCanvas.classList.remove('visible');
            return;
        }

        const dpr = window.devicePixelRatio || 1;
        const cw = state.cellWidth;
        const ch = state.cellHeight;

        // Position the cursor canvas over the cursor cell.
        cursorCanvas.style.left = `${state.cursor.x * cw}px`;
        cursorCanvas.style.top = `${state.cursor.y * ch}px`;
        cursorCanvas.style.width = `${cw}px`;
        cursorCanvas.style.height = `${ch}px`;
        cursorCanvas.width = Math.round(cw * dpr);
        cursorCanvas.height = Math.round(ch * dpr);

        cursorCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
        cursorCtx.font = state.fontStr;
        cursorCtx.textBaseline = 'ideographic';

        // Cursor block.
        cursorCtx.fillStyle = theme.foreground;
        cursorCtx.fillRect(0, 0, cw, ch);

        // Character in background color so it remains readable through the cursor.
        const char = state.displayChars[state.cursor.y]?.[state.cursor.x] || '';

        if (char) {
            cursorCtx.fillStyle = theme.background;
            cursorCtx.fillText(char, 0, ch);
        }

        // Reset the blink animation so the cursor appears immediately after moving.
        cursorCanvas.classList.remove('visible');
        void cursorCanvas.offsetWidth; // force reflow to restart animation
        cursorCanvas.classList.add('visible');
    }

    // ===== Actual draw — defined after layers and renderer =====

    function actualDraw(): void {
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
        
        renderCursor();
    }

    function getComposeChars(): string[][] {
        return statusBarConfig ? layers.mainChars.slice(0, -1) : layers.mainChars;
    }

    // ===== Remaining modules =====

    const cursor = Cursor(state);
    const buffer = Buffer({ state, cursor });
    const selection = Selection(state);
    const history = History({ state, selection });

    const { handleKeyDown } = Keyboard({
        state,
        draw: scheduleDraw,
        cursor,
        buffer,
        history,
        selection,
        focus: { focusNext: focus.focusNext, focusPrev: focus.focusPrev },
        inputActions: {
            isActiveInput: () => inputMap.has(state.activeRegion!),
            emitEvent: focus.emitInputEvent,
            emitChangeIfChanged: focus.checkAndEmitChange,
        },
        modalActions: {
            isOpen: layers.isModalOpen,
            dismiss() {
                layers.hideModal(currentNode);
                scheduleDraw();
            },
        },
        floatActions: {
            isOpen: layers.isFloatOpen,
            dismiss() {
                layers.hideFloat();
                scheduleDraw();
            },
        },
    });
    const { handleMouseDown, handleMouseMove, handleMouseUp } = MouseHandlers({
        canvas,
        textarea,
        state,
        actions: {
            draw: scheduleDraw,
            startMouseSelection: selection.startMouseSelection,
            extendMouseSelection: selection.extendMouseSelection,
            endMouseSelection: selection.endMouseSelection,
            focusAtCell: focus.focusAtCell,
            endOfContent: () => (state.activeRegion ? focus.endOfContent(state.activeRegion) : { x: 0, y: 0 }),
            setCursor: cursor.jumpTo,
            dismissFloatIfOutside: layers.dismissFloatIfOutside,
        },
    });
    const { setSize } = Canvas({
        canvas,
        ctx,
        state,
        actions: {
            draw: scheduleDraw,
            onResize() {
                theme = readTheme();
                renderer.invalidateAll();
            },
        },
        layout(chars) {
            log('? createSetup() > layout()');
            layers.handleLayout(chars, currentNode, statusBarConfig !== null);
        },
    });

    log('Attach event listeners.');
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseup', handleMouseUp);
    textarea.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', setSize);
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
                scheduleDraw();
            },
        },
        modal: {
            show(node: LayoutNode) {
                layers.showModal(node);
                scheduleDraw();
            },
            hide() {
                layers.hideModal(currentNode);
                scheduleDraw();
            },
        },
        float: {
            show(node: LayoutNode, anchor?: FloatAnchor) {
                layers.showFloat(node, anchor);
                scheduleDraw();
            },
            hide() {
                layers.hideFloat();
                scheduleDraw();
            },
        },
        statusBar(config: StatusBar) {
            statusBarConfig = config;

            if (currentNode) {
                log('editor.statusBar() > compose()');
                applyLayout(currentNode, getComposeChars());
            }

            log('editor.statusBar() > draw()');
            scheduleDraw();
        },
        destroy() {
            container.removeEventListener('mousedown', handleMouseDown);
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseup', handleMouseUp);
            textarea.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('resize', setSize);

            if (rafId !== null) cancelAnimationFrame(rafId);

            cursorCanvas.remove();

            for (const node of inputMap.values()) {
                disposeInput(node);
            }

            inputMap.clear();
        },
    };
}
