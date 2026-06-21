import { log } from '@/lib/utils';
import type { EditorState } from './editor';
import type { DrawAction } from './render';

const ROW_OFFSET = 2;
const COL_OFFSET = 4;

function getEmSquare(element: HTMLElement) {
    const style = getComputedStyle(element);
    const scratch = document.createElement('canvas');
    const ctx = scratch.getContext('2d');

    if (!ctx) return { width: 0, height: 0 };

    ctx.font = `${parseFloat(style.fontSize)}px ${style.fontFamily}`;

    const metrics = ctx.measureText('M');

    return {
        width: metrics.width,
        height: metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent,
    };
}

export function createSetup(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    state: EditorState,
    actions: DrawAction,
    layout: (chars: string[][]) => void,
) {
    const rootStyles = window.getComputedStyle(document.documentElement);
    const fontSize = rootStyles.getPropertyValue('--canvas-font-size').trim();
    const fontFamily = rootStyles.getPropertyValue('--canvas-font-family').trim();
    const emSquare = getEmSquare(document.body);

    state.fontStr = `${fontSize} ${fontFamily}`;
    state.cellWidth = emSquare.width;
    state.cellHeight = emSquare.height;

    log('createSetup() > setSize()');
    setSize();

    function setupCanvas() {
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

        state.chars = Array.from({ length: state.rows }, () => Array.from({ length: state.cols }, () => ''));

        log('setupCanvas() > layout()');
        layout(state.chars);

        // TODO: Keep on resize.
        state.undoStack = [];
        state.redoStack = [];
    }

    function setSize() {
        log('setSize() > setupCanvas()');
        setupCanvas();

        log('setSize() > draw()');
        actions.draw();
    }

    return { setSize };
}
