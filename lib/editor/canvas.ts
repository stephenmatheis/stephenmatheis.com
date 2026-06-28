import { log } from '@/lib/utils';
import type { EditorState, Layer, Snapshot } from './types';

const ROW_OFFSET = 2;
const COL_OFFSET = 4;

function getEmSquare(fontStr: string) {
    const scratch = document.createElement('canvas');
    const ctx = scratch.getContext('2d');

    if (!ctx) return { width: 0, height: 0 };

    ctx.font = fontStr;

    const metrics = ctx.measureText('M');

    return {
        width: metrics.width,
        height: metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent,
    };
}

function resizeSnapshot(snap: Snapshot, rows: number, cols: number): Snapshot {
    const chars = Array.from({ length: rows }, (_, r) => {
        const oldRow = snap.chars[r];

        if (!oldRow) return Array<string>(cols).fill('');
        if (oldRow.length === cols) return oldRow;
        if (oldRow.length > cols) return oldRow.slice(0, cols);

        return [...oldRow, ...Array<string>(cols - oldRow.length).fill('')];
    });

    return {
        chars,
        cursor: {
            x: Math.min(snap.cursor.x, cols - 1),
            y: Math.min(snap.cursor.y, rows - 1),
        },
    };
}

type ResponsiveCanvasProps = {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    state: EditorState;
    requestRender(): void;
    onResize(): void;
    // Called after state.mainLayer/activeLayer/displayLayer are reset with fresh grids.
    // Responsible for rebuilding layout and restoring cursor position.
    layout: () => void;
};

export function ResponsiveCanvas({ canvas, ctx, state, requestRender, onResize, layout }: ResponsiveCanvasProps) {
    log('createSetup() > setSize()');
    setSize();

    function setupCanvas() {
        // Re-read CSS vars on every call so font/size changes via setProperty() take effect.
        const rootStyles = window.getComputedStyle(document.documentElement);
        const fontSize = rootStyles.getPropertyValue('--canvas-font-size').trim();
        const fontFamily = rootStyles.getPropertyValue('--canvas-font-family').trim();
        const fontStr = `${fontSize} ${fontFamily}`;
        const emSquare = getEmSquare(fontStr);

        state.fontStr = fontStr;
        state.cellWidth = emSquare.width;
        state.cellHeight = emSquare.height;

        const { innerWidth, innerHeight } = window;
        const dpr = window.devicePixelRatio || 1;

        state.cols = Math.floor(innerWidth / state.cellWidth) - COL_OFFSET;
        state.rows = Math.floor(innerHeight / state.cellHeight) - ROW_OFFSET;

        canvas.width = state.cols * state.cellWidth * dpr;
        canvas.height = state.rows * state.cellHeight * dpr;
        canvas.style.width = `${state.cols * state.cellWidth}px`;
        canvas.style.height = `${state.rows * state.cellHeight}px`;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.font = state.fontStr;
        ctx.textBaseline = 'ideographic';

        // Allocate a fresh main layer for the new dimensions and point the
        // active/display pointers at it. Layers.handleLayout will adjust these
        // if a modal or float is currently open.
        const freshLayer: Layer = {
            chars: Array.from({ length: state.rows }, () => Array.from({ length: state.cols }, () => '')),
            cellStyles: Array.from({ length: state.rows }, () => Array.from({ length: state.cols }, () => null)),
        };

        state.mainLayer = freshLayer;
        state.activeLayer = freshLayer;
        state.displayLayer = freshLayer;

        state.undoStack = state.undoStack.map((snap) => resizeSnapshot(snap, state.rows, state.cols));
        state.redoStack = state.redoStack.map((snap) => resizeSnapshot(snap, state.rows, state.cols));

        // layout() rebuilds the node tree into the fresh grid and restores cursor position.
        // Buffer content (InputRef.buffer, TextareaRef.buffer) survives the grid reallocation
        // because it lives in the module-level registries, not in the chars grid.
        log('setupCanvas() > layout()');
        layout();
    }

    function setSize() {
        log('setSize() > setupCanvas()');
        setupCanvas();

        onResize();

        log('setSize() > requestRender()');
        requestRender();
    }

    return {
        add() {
            window.addEventListener('resize', setSize);
        },
        remove() {
            window.removeEventListener('resize', setSize);
        },
        setSize,
    };
}
