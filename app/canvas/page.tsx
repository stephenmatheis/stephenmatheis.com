'use client';

import { useEffect, useRef } from 'react';
import styles from './page.module.scss';

const CELL_WIDTH = 14;
const CELL_HEIGHT = 28;
const ROW_OFFSET = 2;
const COL_OFFSET = 4;

type BorderStyle = 'rounded' | 'single' | 'double';

type BoxProps = {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    border?: boolean;
    borderStyle?: BorderStyle;
    title?: string;
    titleAlignment?: 'left' | 'center' | 'right';
    padding?: number;
    paddingX?: number;
    paddingY?: number;
};

type BoxNode = BoxProps & { children: BoxNode[] };

type CellPos = {
    x: number;
    y: number;
};

type Selection = {
    start: CellPos;
    end: CellPos;
};

function Box(props: BoxProps, ...children: BoxNode[]): BoxNode {
    return {
        border: true,
        borderStyle: 'rounded',
        x: 0,
        y: 0,
        ...props,
        children,
    };
}

function renderBox(
    {
        x = 0,
        y = 0,
        width,
        height,
        border,
        borderStyle = 'rounded',
        title,
        titleAlignment = 'left',
        padding = 1,
        paddingX,
        paddingY,
        children,
    }: BoxNode,
    chars: string[][],
) {
    if (border) {
        const corners = {
            double: ['╔', '╗', '╚', '╝'],
            single: ['┌', '┐', '└', '┘'],
            rounded: ['╭', '╮', '╰', '╯'],
        }[borderStyle];
        const horizontalEdge = borderStyle === 'double' ? '═' : '─';
        const verticalEdge = borderStyle === 'double' ? '║' : '│';

        height = height || chars.length;
        width = width || chars[0].length;

        chars[y][x] = corners[0];
        chars[y][x + width - 1] = corners[1];
        chars[y + height - 1][x] = corners[2];
        chars[y + height - 1][x + width - 1] = corners[3];

        for (let cx = x + 1; cx < x + width - 1; cx++) {
            chars[y][cx] = horizontalEdge;
            chars[y + height - 1][cx] = horizontalEdge;
        }

        for (let cy = y + 1; cy < y + height - 1; cy++) {
            chars[cy][x] = verticalEdge;
            chars[cy][x + width - 1] = verticalEdge;
        }

        if (title) {
            const paddedTitle = ` ${title} `;
            const startX = {
                left: x + 2,
                center: x + Math.floor((width - paddedTitle.length) / 2),
                right: x + width - 2 - paddedTitle.length,
            }[titleAlignment];

            for (let i = 0; i < paddedTitle.length; i++) {
                chars[y][startX + i] = paddedTitle[i];
            }
        }
    }

    for (const child of children) {
        const px = paddingX ?? padding;
        const py = paddingY ?? padding;

        renderBox(
            {
                ...child,
                x: x + px + (child.x ?? 0),
                y: y + py + (child.y ?? 0),
                width: child.width ?? (width || 0) - px * 2,
                height: child.height ?? (height || 0) - py * 2,
            },
            chars,
        );
    }
}

function normalizeSelection(selection: Selection): Selection {
    const { start, end } = selection;
    const reversed = end.y < start.y || (end.y === start.y && end.x < start.x);

    return reversed ? { start: end, end: start } : selection;
}

function isInSelection(col: number, row: number, selection: Selection): boolean {
    const { start, end } = normalizeSelection(selection);

    if (row < start.y || row > end.y) {
        return false;
    }

    if (row === start.y && col < start.x) {
        return false;
    }

    if (row === end.y && col > end.x) {
        return false;
    }

    return true;
}

function getSelectedText(chars: string[][], selection: Selection): string {
    const { start, end } = normalizeSelection(selection);
    const lines: string[] = [];

    for (let row = start.y; row <= end.y; row++) {
        const startCol = row === start.y ? start.x : 0;
        const endCol = row === end.y ? end.x : (chars[row]?.length ?? 1) - 1;

        lines.push(
            (chars[row] || [])
                .slice(startCol, endCol + 1)
                .join('')
                .trimEnd(),
        );
    }

    return lines.join('\n');
}

export default function Home() {
    const pageRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const fontStrRef = useRef('');
    const charsRef = useRef<string[][]>([]);
    const colsRef = useRef(0);
    const rowsRef = useRef(0);
    const cursorRef = useRef<CellPos>({ x: 0, y: 0 });
    const selectionRef = useRef<Selection | null>(null);
    const cursorVisibleRef = useRef(true);
    const isDraggingRef = useRef(false);
    const selectionAnchorRef = useRef<CellPos | null>(null);

    function draw() {
        const ctx = ctxRef.current;

        if (!ctx) return;

        const cols = colsRef.current;
        const rows = rowsRef.current;
        const chars = charsRef.current;
        const cursor = cursorRef.current;
        const selection = selectionRef.current;
        const cursorVisible = cursorVisibleRef.current;

        ctx.clearRect(0, 0, cols * CELL_WIDTH, rows * CELL_HEIGHT);

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = col * CELL_WIDTH;
                const y = row * CELL_HEIGHT;
                const char = chars[row]?.[col] || '';
                const isCursor = cursorVisible && col === cursor.x && row === cursor.y;
                const selected = selection ? isInSelection(col, row, selection) : false;

                if (selected) {
                    ctx.fillStyle = '#0066ff33';
                    ctx.fillRect(x, y, CELL_WIDTH, CELL_HEIGHT);
                }

                if (isCursor) {
                    ctx.fillStyle = '#000000';
                    ctx.fillRect(x, y, CELL_WIDTH, CELL_HEIGHT);
                }

                ctx.strokeStyle = '#00000030';
                ctx.lineWidth = 0.5;
                ctx.strokeRect(x, y, CELL_WIDTH, CELL_HEIGHT);

                if (char) {
                    ctx.fillStyle = isCursor ? '#ffffff' : '#000000';
                    ctx.fillText(char, x, y + CELL_HEIGHT);
                }
            }
        }
    }

    function moveCursor(dx: number, dy: number) {
        const { x, y } = cursorRef.current;

        cursorRef.current = {
            x: Math.max(0, Math.min(x + dx, colsRef.current - 1)),
            y: Math.max(0, Math.min(y + dy, rowsRef.current - 1)),
        };

        cursorVisibleRef.current = true;
    }

    function writeChar(char: string) {
        const { x, y } = cursorRef.current;

        if (y < rowsRef.current && x < colsRef.current) {
            charsRef.current[y][x] = char;

            moveCursor(1, 0);
        }
    }

    function deleteChar() {
        if (cursorRef.current.x > 0) {
            moveCursor(-1, 0);

            const { x, y } = cursorRef.current;

            charsRef.current[y][x] = '';
        }
    }

    function handleEnter() {
        moveCursor(-cursorRef.current.x, 1);
    }

    function pixelToCell(clientX: number, clientY: number): CellPos {
        const canvas = canvasRef.current;

        if (!canvas) {
            return { x: 0, y: 0 };
        }

        const rect = canvas.getBoundingClientRect();

        return {
            x: Math.max(0, Math.min(Math.floor((clientX - rect.left) / CELL_WIDTH), colsRef.current - 1)),
            y: Math.max(0, Math.min(Math.floor((clientY - rect.top) / CELL_HEIGHT), rowsRef.current - 1)),
        };
    }

    function handleMouseDown(event: React.MouseEvent) {
        const cell = pixelToCell(event.clientX, event.clientY);

        cursorRef.current = cell;
        selectionRef.current = null;
        selectionAnchorRef.current = cell;
        isDraggingRef.current = true;
        cursorVisibleRef.current = true;
        textareaRef.current?.focus();

        draw();
    }

    function handleMouseMove(event: React.MouseEvent) {
        if (!isDraggingRef.current || !selectionAnchorRef.current) return;

        const cell = pixelToCell(event.clientX, event.clientY);
        const anchor = selectionAnchorRef.current;

        if (cell.x !== anchor.x || cell.y !== anchor.y) {
            selectionRef.current = { start: anchor, end: cell };
            cursorRef.current = cell;

            draw();
        }
    }

    function handleMouseUp() {
        isDraggingRef.current = false;
        selectionAnchorRef.current = null;
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
        const metaOrCtrl = event.metaKey || event.ctrlKey;

        if (metaOrCtrl) {
            switch (event.key) {
                case 'a':
                    event.preventDefault();

                    selectionRef.current = {
                        start: { x: 0, y: 0 },
                        end: { x: colsRef.current - 1, y: rowsRef.current - 1 },
                    };

                    draw();

                    break;
                case 'c':
                    event.preventDefault();

                    if (selectionRef.current) {
                        const text = getSelectedText(charsRef.current, selectionRef.current);

                        navigator.clipboard.writeText(text).catch(() => {});
                    }

                    break;
                case 'v':
                    event.preventDefault();

                    navigator.clipboard
                        .readText()
                        .then((text) => {
                            selectionRef.current = null;
                            for (const char of text) {
                                if (char === '\n') handleEnter();
                                else if (char !== '\r') writeChar(char);
                            }
                            draw();
                        })
                        .catch(() => {});
                case 'x':
                    // TODO: Implement 'cut' operation.
                    break;
            }
            return;
        }

        event.preventDefault();

        selectionRef.current = null;

        // TODO: Vim mode.
        switch (event.key) {
            case 'ArrowRight':
                moveCursor(1, 0);
                break;
            case 'ArrowLeft':
                moveCursor(-1, 0);
                break;
            case 'ArrowDown':
                moveCursor(0, 1);
                break;
            case 'ArrowUp':
                moveCursor(0, -1);
                break;
            case 'Enter':
                handleEnter();
                break;
            case 'Backspace':
                deleteChar();
                break;
            default:
                if (event.key.length === 1) writeChar(event.key);
                break;
        }

        draw();
    }

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        if (!ctx) return;

        ctxRef.current = ctx;

        const rootStyles = window.getComputedStyle(document.documentElement);
        const fontSize = rootStyles.getPropertyValue('--canvas-font-size').trim();
        const fontFamily = rootStyles.getPropertyValue('--canvas-font-family').trim();

        fontStrRef.current = `${fontSize} ${fontFamily}`;

        function setupCanvas() {
            if (!canvas || !ctx) return;

            const { innerWidth, innerHeight } = window;
            const cols = Math.floor(innerWidth / CELL_WIDTH) - COL_OFFSET;
            const rows = Math.floor(innerHeight / CELL_HEIGHT) - ROW_OFFSET;
            const dpr = window.devicePixelRatio || 1;

            colsRef.current = cols;
            rowsRef.current = rows;

            canvas.width = cols * CELL_WIDTH * dpr;
            canvas.height = rows * CELL_HEIGHT * dpr;
            canvas.style.width = `${cols * CELL_WIDTH}px`;
            canvas.style.height = `${rows * CELL_HEIGHT}px`;

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.font = fontStrRef.current;
            ctx.textBaseline = 'ideographic';

            const chars = Array.from({ length: rows }, () => Array.from({ length: cols }, () => ''));

            renderBox(
                Box(
                    { title: 'Outer', paddingX: 2 },
                    Box(
                        { title: 'Inner', titleAlignment: 'right', paddingX: 2 },
                        Box({ title: 'Center', titleAlignment: 'center' }),
                    ),
                ),
                chars,
            );

            charsRef.current = chars;
        }

        function setSize() {
            setupCanvas();
            draw();
        }

        setSize();

        window.addEventListener('resize', setSize);

        if (pageRef.current) {
            pageRef.current.style.opacity = '1';
        }

        textareaRef.current?.focus();

        return () => {
            window.removeEventListener('resize', setSize);
        };
    }, []);

    return (
        <div ref={pageRef} className={styles.page} style={{ opacity: 0 }}>
            <div
                className={styles.renderer}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            >
                <canvas ref={canvasRef} />
                <textarea
                    ref={textareaRef}
                    className={styles.input}
                    tabIndex={0}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    suppressHydrationWarning
                />
            </div>
        </div>
    );
}
