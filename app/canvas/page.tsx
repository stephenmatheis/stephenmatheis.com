'use client';

import { useEffect, useRef } from 'react';
import { Box, compose, isInSelection, getSelectedText, isWordChar, clearSelected, cloneChars } from '@/lib/tui';
import type { CellPos, Selected } from '@/lib/tui';
import styles from './page.module.scss';

const ROW_OFFSET = 2;
const COL_OFFSET = 4;
const MAX_HISTORY = 100;

type Snapshot = {
    chars: string[][];
    cursor: CellPos;
};

export default function Home() {
    const cellWidthRef = useRef<number>(0);
    const cellHeightRef = useRef<number>(0);
    const pageRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const fontStrRef = useRef('');
    const charsRef = useRef<string[][]>([]);
    const colsRef = useRef(0);
    const rowsRef = useRef(0);
    const cursorRef = useRef<CellPos>({ x: 0, y: 0 });
    const selectedRef = useRef<Selected | null>(null);
    const cursorVisibleRef = useRef(true);
    const isDraggingRef = useRef(false);
    const selectionAnchorRef = useRef<CellPos | null>(null);
    const keyboardAnchorRef = useRef<CellPos | null>(null);
    const undoStackRef = useRef<Snapshot[]>([]);
    const redoStackRef = useRef<Snapshot[]>([]);

    function draw() {
        const ctx = ctxRef.current;

        if (!ctx) return;

        const rootStyles = window.getComputedStyle(document.documentElement);
        const background = rootStyles.getPropertyValue('--background').trim();
        const foreground = rootStyles.getPropertyValue('--foreground').trim();

        const cols = colsRef.current;
        const rows = rowsRef.current;
        const chars = charsRef.current;
        const cursor = cursorRef.current;
        const selection = selectedRef.current;
        const cursorVisible = cursorVisibleRef.current;
        const cellWidth = cellWidthRef.current;
        const cellHeight = cellHeightRef.current;

        ctx.clearRect(0, 0, cols * cellWidth, rows * cellHeight);

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = col * cellWidth;
                const y = row * cellHeight;
                const char = chars[row]?.[col] || '';
                const isCursor = cursorVisible && col === cursor.x && row === cursor.y;
                const selected = selection ? isInSelection(col, row, selection) : false;

                if (selected) {
                    // TODO: Invert background and foreground colors
                    ctx.fillStyle = foreground;
                    ctx.fillRect(x, y, cellWidth, cellHeight);
                }

                if (isCursor) {
                    ctx.fillStyle = foreground;
                    ctx.fillRect(x, y, cellWidth, cellHeight);
                }

                // TODO: Be able to toggle on/off
                ctx.strokeStyle = '#00000030';
                ctx.lineWidth = 0.5;
                ctx.strokeRect(x, y, cellWidth, cellHeight);

                if (char) {
                    ctx.fillStyle = isCursor || selected ? background : foreground;
                    ctx.fillText(char, x, y + cellHeight);
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

    function withSelection(moveFn: () => void, extending: boolean) {
        if (extending) {
            if (!keyboardAnchorRef.current) {
                keyboardAnchorRef.current = { ...cursorRef.current };
            }

            moveFn();

            selectedRef.current = {
                start: keyboardAnchorRef.current,
                end: { ...cursorRef.current },
            };
        } else {
            keyboardAnchorRef.current = null;
            selectedRef.current = null;
            moveFn();
        }
    }

    function wordJumpRight() {
        const { x, y } = cursorRef.current;
        const row = charsRef.current[y] || [];
        let col = x;

        while (col < colsRef.current - 1 && isWordChar(row[col])) col++;
        while (col < colsRef.current - 1 && !isWordChar(row[col])) col++;

        cursorRef.current = { x: col, y };
        cursorVisibleRef.current = true;
    }

    function wordJumpLeft() {
        const { x, y } = cursorRef.current;
        const row = charsRef.current[y] || [];

        let col = x;

        if (col === 0) return;

        col--;

        while (col > 0 && !isWordChar(row[col])) {
            col--;
        }

        while (col > 0 && isWordChar(row[col - 1])) {
            col--;
        }

        cursorRef.current = { x: col, y };
        cursorVisibleRef.current = true;
    }

    function lineStart() {
        cursorRef.current = { x: 0, y: cursorRef.current.y };
        cursorVisibleRef.current = true;
    }

    function lineEnd() {
        cursorRef.current = { x: colsRef.current - 1, y: cursorRef.current.y };
        cursorVisibleRef.current = true;
    }

    function docStart() {
        cursorRef.current = { x: 0, y: 0 };
        cursorVisibleRef.current = true;
    }

    function docEnd() {
        cursorRef.current = { x: 0, y: rowsRef.current - 1 };
        cursorVisibleRef.current = true;
    }

    function snapshot() {
        undoStackRef.current.push({
            chars: cloneChars(charsRef.current),
            cursor: { ...cursorRef.current },
        });

        if (undoStackRef.current.length > MAX_HISTORY) {
            undoStackRef.current.shift();
        }

        redoStackRef.current = [];
    }

    function undo() {
        const prev = undoStackRef.current.pop();

        if (!prev) return;

        redoStackRef.current.push({
            chars: cloneChars(charsRef.current),
            cursor: { ...cursorRef.current },
        });

        charsRef.current = prev.chars;
        cursorRef.current = prev.cursor;
        selectedRef.current = null;
        keyboardAnchorRef.current = null;

        draw();
    }

    function redo() {
        const next = redoStackRef.current.pop();

        if (!next) return;

        undoStackRef.current.push({
            chars: cloneChars(charsRef.current),
            cursor: { ...cursorRef.current },
        });

        charsRef.current = next.chars;
        cursorRef.current = next.cursor;
        selectedRef.current = null;
        keyboardAnchorRef.current = null;

        draw();
    }

    function pixelToCell(clientX: number, clientY: number): CellPos {
        const canvas = canvasRef.current;

        if (!canvas) {
            return { x: 0, y: 0 };
        }

        const { left, top } = canvas.getBoundingClientRect();

        return {
            x: Math.max(0, Math.min(Math.floor((clientX - left) / cellWidthRef.current), colsRef.current - 1)),
            y: Math.max(0, Math.min(Math.floor((clientY - top) / cellHeightRef.current), rowsRef.current - 1)),
        };
    }

    function handleMouseDown(event: React.MouseEvent) {
        const cell = pixelToCell(event.clientX, event.clientY);

        cursorRef.current = cell;
        selectedRef.current = null;
        selectionAnchorRef.current = cell;
        keyboardAnchorRef.current = null;
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
            selectedRef.current = { start: anchor, end: cell };
            cursorRef.current = cell;

            draw();
        }
    }

    function handleMouseUp() {
        isDraggingRef.current = false;
        selectionAnchorRef.current = null;
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
        const { shiftKey, altKey, metaKey, ctrlKey } = event;
        const extending = shiftKey;
        const isMovementKey = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key);

        if (!isMovementKey && (metaKey || ctrlKey) && !altKey) {
            switch (event.key) {
                case 'a':
                    event.preventDefault();

                    keyboardAnchorRef.current = null;
                    selectedRef.current = {
                        start: { x: 0, y: 0 },
                        end: { x: colsRef.current - 1, y: rowsRef.current - 1 },
                    };

                    draw();

                    return;
                case 'c':
                    event.preventDefault();

                    if (selectedRef.current) {
                        navigator.clipboard
                            .writeText(getSelectedText(charsRef.current, selectedRef.current))
                            .catch(() => {});
                    }

                    return;
                case 'v':
                    event.preventDefault();

                    navigator.clipboard
                        .readText()
                        .then((text) => {
                            snapshot();

                            keyboardAnchorRef.current = null;
                            selectedRef.current = null;

                            for (const char of text) {
                                if (char === '\n') handleEnter();
                                else if (char !== '\r') writeChar(char);
                            }

                            draw();
                        })
                        .catch(() => {});

                    return;
                case 'x':
                    event.preventDefault();

                    if (selectedRef.current) {
                        navigator.clipboard
                            .writeText(getSelectedText(charsRef.current, selectedRef.current))
                            .catch(() => {});

                        snapshot();

                        cursorRef.current = clearSelected(charsRef.current, selectedRef.current);
                        selectedRef.current = null;
                        keyboardAnchorRef.current = null;

                        draw();
                    }

                    return;
                case 'z':
                    event.preventDefault();

                    if (shiftKey) {
                        redo();
                    } else {
                        undo();
                    }

                    return;
                case 'y':
                    event.preventDefault();

                    redo();

                    return;
                default:
                    return;
            }
        }

        event.preventDefault();

        const wordJump = (altKey || ctrlKey) && !metaKey;
        const lineOrDocJump = metaKey && !altKey;

        // TODO: Vim mode.
        switch (event.key) {
            case 'ArrowRight':
                if (wordJump) withSelection(wordJumpRight, extending);
                else if (lineOrDocJump) withSelection(lineEnd, extending);
                else withSelection(() => moveCursor(1, 0), extending);

                break;
            case 'ArrowLeft':
                if (wordJump) withSelection(wordJumpLeft, extending);
                else if (lineOrDocJump) withSelection(lineStart, extending);
                else withSelection(() => moveCursor(-1, 0), extending);

                break;
            case 'ArrowDown':
                if (lineOrDocJump) withSelection(docEnd, extending);
                else withSelection(() => moveCursor(0, 1), extending);

                break;
            case 'ArrowUp':
                if (lineOrDocJump) withSelection(docStart, extending);
                else withSelection(() => moveCursor(0, -1), extending);

                break;
            case 'Home':
                withSelection(ctrlKey ? docStart : lineStart, extending);
                break;
            case 'End':
                withSelection(ctrlKey ? docEnd : lineEnd, extending);
                break;
            case 'Enter':
                keyboardAnchorRef.current = null;
                selectedRef.current = null;

                handleEnter();

                break;
            case 'Backspace':
                snapshot();

                if (selectedRef.current) {
                    cursorRef.current = clearSelected(charsRef.current, selectedRef.current);
                    selectedRef.current = null;
                    keyboardAnchorRef.current = null;
                } else {
                    deleteChar();
                }

                break;
            default:
                if (event.key.length === 1) {
                    // TODO: Explore how other editors handle word undo/restore.
                    snapshot();

                    keyboardAnchorRef.current = null;
                    selectedRef.current = null;

                    writeChar(event.key);

                    break;
                }
                return;
        }

        draw();
    }

    function getEmSquare(element: HTMLElement) {
        const style = getComputedStyle(element);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) return { width: 0, height: 0 };

        ctx.font = `${parseFloat(style.fontSize)}px ${style.fontFamily}`;

        const metrics = ctx.measureText('M');

        return {
            width: metrics.width,
            height: metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent,
        };
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
        const emSquare = getEmSquare(document.body);

        fontStrRef.current = `${fontSize} ${fontFamily}`;

        function setupCanvas() {
            if (!canvas || !ctx) return;

            const { innerWidth, innerHeight } = window;
            const cols = Math.floor(innerWidth / emSquare.width) - COL_OFFSET;
            const rows = Math.floor(innerHeight / emSquare.height) - ROW_OFFSET;
            const dpr = window.devicePixelRatio || 1;

            colsRef.current = cols;
            rowsRef.current = rows;

            canvas.width = cols * emSquare.width * dpr;
            canvas.height = rows * emSquare.height * dpr;
            canvas.style.width = `${cols * emSquare.width}px`;
            canvas.style.height = `${rows * emSquare.height}px`;

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.font = fontStrRef.current;
            ctx.textBaseline = 'ideographic';

            const chars = Array.from({ length: rows }, () => Array.from({ length: cols }, () => ''));

            compose(
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

            // TODO: Don't reset on resize.
            undoStackRef.current = [];
            redoStackRef.current = [];
        }

        function setSize() {
            setupCanvas();
            draw();
        }

        cellWidthRef.current = emSquare.width;
        cellHeightRef.current = emSquare.height;
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
