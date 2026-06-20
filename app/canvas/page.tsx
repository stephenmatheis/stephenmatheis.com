'use client';

import { useEffect, useRef } from 'react';
import { Box, compose, isInSelection, getSelectedText, isWordChar, clearSelected } from '@/lib/tui';
import type { CellPos, Selected } from '@/lib/tui';
import styles from './page.module.scss';

const CELL_WIDTH = 14;
const CELL_HEIGHT = 28;
const ROW_OFFSET = 2;
const COL_OFFSET = 4;

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
    const selectedRef = useRef<Selected | null>(null);
    const cursorVisibleRef = useRef(true);
    const isDraggingRef = useRef(false);
    const selectionAnchorRef = useRef<CellPos | null>(null);
    const keyboardAnchorRef = useRef<CellPos | null>(null);

    function draw() {
        const ctx = ctxRef.current;

        if (!ctx) return;

        const cols = colsRef.current;
        const rows = rowsRef.current;
        const chars = charsRef.current;
        const cursor = cursorRef.current;
        const selection = selectedRef.current;
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

    function pixelToCell(clientX: number, clientY: number): CellPos {
        const canvas = canvasRef.current;

        if (!canvas) {
            return { x: 0, y: 0 };
        }

        const { left, top } = canvas.getBoundingClientRect();

        return {
            x: Math.max(0, Math.min(Math.floor((clientX - left) / CELL_WIDTH), colsRef.current - 1)),
            y: Math.max(0, Math.min(Math.floor((clientY - top) / CELL_HEIGHT), rowsRef.current - 1)),
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

        // non-movement + cmd/ctrl modifier — handle and return, or pass through to the browser
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

                        cursorRef.current = clearSelected(charsRef.current, selectedRef.current);
                        selectedRef.current = null;
                        keyboardAnchorRef.current = null;

                        draw();
                    }

                    return;
                default:
                    return;
            }
        }

        event.preventDefault();

        const wordJump = (altKey || ctrlKey) && !metaKey; // opt/alt = word jump on macOS; ctrl = word jump on Windows/Linux.
        const lineOrDocJump = metaKey && !altKey; // cmd = line/doc jump on Mac.

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
                    keyboardAnchorRef.current = null;
                    selectedRef.current = null;
                    writeChar(event.key);

                    break;
                }
                return;
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
