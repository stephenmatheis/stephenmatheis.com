import { log } from '@/lib/utils';
import type { EditorState } from './types';

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

type ResponsiveCanvasProps = {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    state: EditorState;
    draw(): void;
    onResize(): void;
    layout: (chars: string[][]) => void;
};

export function ResponsiveCanvas({ canvas, ctx, state, draw, onResize, layout }: ResponsiveCanvasProps) {
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

        state.chars = Array.from({ length: state.rows }, () => Array.from({ length: state.cols }, () => ''));
        state.cellStyles = Array.from({ length: state.rows }, () => Array.from({ length: state.cols }, () => null));

        log('setupCanvas() > layout()');
        layout(state.chars);

        // TODO: Keep on resize.
        state.undoStack = [];
        state.redoStack = [];
    }

    function setSize() {
        log('setSize() > setupCanvas()');
        setupCanvas();

        onResize();

        log('setSize() > draw()');
        draw();
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
