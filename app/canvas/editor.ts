import { Box, compose, isInSelection, getSelectedText, isWordChar, clearSelected, cloneChars } from '@/lib/tui';
import type { CellPos, Selected } from '@/lib/tui';

const ROW_OFFSET = 2;
const COL_OFFSET = 4;
const MAX_HISTORY = 100;

type Snapshot = {
    chars: string[][];
    cursor: CellPos;
};

type Editor = {
    canvas: HTMLCanvasElement;
    textarea: HTMLTextAreaElement;
    container: HTMLElement;
};

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

export function createEditor({ canvas, textarea, container }: Editor) {
    const ctx = canvas.getContext('2d')!;

    let cellWidth = 0;
    let cellHeight = 0;
    let fontStr = '';
    let chars: string[][] = [];
    let cols = 0;
    let rows = 0;
    let cursor: CellPos = { x: 0, y: 0 };
    let selected: Selected | null = null;
    let cursorVisible = true;
    let isDragging = false;
    let selectionAnchor: CellPos | null = null;
    let keyboardAnchor: CellPos | null = null;
    let undoStack: Snapshot[] = [];
    let redoStack: Snapshot[] = [];

    function draw() {
        const rootStyles = window.getComputedStyle(document.documentElement);
        const background = rootStyles.getPropertyValue('--background').trim();
        const foreground = rootStyles.getPropertyValue('--foreground').trim();

        ctx.clearRect(0, 0, cols * cellWidth, rows * cellHeight);

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = col * cellWidth;
                const y = row * cellHeight;
                const char = chars[row]?.[col] || '';
                const isCursor = cursorVisible && col === cursor.x && row === cursor.y;
                const isSelected = selected ? isInSelection(col, row, selected) : false;

                if (isSelected) {
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
                    ctx.fillStyle = isCursor || isSelected ? background : foreground;
                    ctx.fillText(char, x, y + cellHeight);
                }
            }
        }
    }

    function moveCursor(dx: number, dy: number) {
        cursor = {
            x: Math.max(0, Math.min(cursor.x + dx, cols - 1)),
            y: Math.max(0, Math.min(cursor.y + dy, rows - 1)),
        };

        cursorVisible = true;
    }

    function writeChar(char: string) {
        if (cursor.y < rows && cursor.x < cols) {
            chars[cursor.y][cursor.x] = char;

            moveCursor(1, 0);
        }
    }

    function deleteChar() {
        if (cursor.x > 0) {
            moveCursor(-1, 0);

            chars[cursor.y][cursor.x] = '';
        }
    }

    function handleEnter() {
        moveCursor(-cursor.x, 1);
    }

    function withSelection(moveFn: () => void, extending: boolean) {
        if (extending) {
            if (!keyboardAnchor) {
                keyboardAnchor = { ...cursor };
            }

            moveFn();

            selected = {
                start: keyboardAnchor,
                end: { ...cursor },
            };
        } else {
            keyboardAnchor = null;
            selected = null;
            moveFn();
        }
    }

    function wordJumpRight() {
        const row = chars[cursor.y] || [];
        let col = cursor.x;

        while (col < cols - 1 && isWordChar(row[col])) col++;
        while (col < cols - 1 && !isWordChar(row[col])) col++;

        cursor = { x: col, y: cursor.y };
        cursorVisible = true;
    }

    function wordJumpLeft() {
        const row = chars[cursor.y] || [];
        let col = cursor.x;

        if (col === 0) return;

        col--;

        while (col > 0 && !isWordChar(row[col])) {
            col--;
        }

        while (col > 0 && isWordChar(row[col - 1])) {
            col--;
        }

        cursor = { x: col, y: cursor.y };
        cursorVisible = true;
    }

    function lineStart() {
        cursor = { x: 0, y: cursor.y };
        cursorVisible = true;
    }

    function lineEnd() {
        cursor = { x: cols - 1, y: cursor.y };
        cursorVisible = true;
    }

    function docStart() {
        cursor = { x: 0, y: 0 };
        cursorVisible = true;
    }

    function docEnd() {
        cursor = { x: 0, y: rows - 1 };
        cursorVisible = true;
    }

    function snapshot() {
        undoStack.push({
            chars: cloneChars(chars),
            cursor: { ...cursor },
        });

        if (undoStack.length > MAX_HISTORY) {
            undoStack.shift();
        }

        redoStack = [];
    }

    function undo() {
        const prev = undoStack.pop();

        if (!prev) return;

        redoStack.push({
            chars: cloneChars(chars),
            cursor: { ...cursor },
        });

        chars = prev.chars;
        cursor = prev.cursor;
        selected = null;
        keyboardAnchor = null;

        draw();
    }

    function redo() {
        const next = redoStack.pop();

        if (!next) return;

        undoStack.push({
            chars: cloneChars(chars),
            cursor: { ...cursor },
        });

        chars = next.chars;
        cursor = next.cursor;
        selected = null;
        keyboardAnchor = null;

        draw();
    }

    function pixelToCell(clientX: number, clientY: number): CellPos {
        const { left, top } = canvas.getBoundingClientRect();

        return {
            x: Math.max(0, Math.min(Math.floor((clientX - left) / cellWidth), cols - 1)),
            y: Math.max(0, Math.min(Math.floor((clientY - top) / cellHeight), rows - 1)),
        };
    }

    function handleMouseDown(event: MouseEvent) {
        const cell = pixelToCell(event.clientX, event.clientY);

        cursor = cell;
        selected = null;
        selectionAnchor = cell;
        keyboardAnchor = null;
        isDragging = true;
        cursorVisible = true;
        textarea.focus();

        draw();
    }

    function handleMouseMove(event: MouseEvent) {
        if (!isDragging || !selectionAnchor) return;

        const cell = pixelToCell(event.clientX, event.clientY);
        const anchor = selectionAnchor;

        if (cell.x !== anchor.x || cell.y !== anchor.y) {
            selected = { start: anchor, end: cell };
            cursor = cell;

            draw();
        }
    }

    function handleMouseUp() {
        isDragging = false;
        selectionAnchor = null;
    }

    function handleKeyDown(event: KeyboardEvent) {
        const { shiftKey, altKey, metaKey, ctrlKey } = event;
        const extending = shiftKey;
        const isMovementKey = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key);

        // non-movement + cmd/ctrl modifier — handle and return, or pass through to the browser
        if (!isMovementKey && (metaKey || ctrlKey) && !altKey) {
            switch (event.key) {
                case 'a':
                    event.preventDefault();

                    keyboardAnchor = null;
                    selected = {
                        start: { x: 0, y: 0 },
                        end: { x: cols - 1, y: rows - 1 },
                    };

                    draw();

                    return;
                case 'c':
                    event.preventDefault();

                    if (selected) {
                        navigator.clipboard.writeText(getSelectedText(chars, selected)).catch(() => {});
                    }

                    return;
                case 'v':
                    event.preventDefault();

                    navigator.clipboard
                        .readText()
                        .then((text) => {
                            // Snapshot before the paste so the entire paste is
                            // one undo step, not one step per character.
                            snapshot();

                            keyboardAnchor = null;
                            selected = null;

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

                    if (selected) {
                        navigator.clipboard.writeText(getSelectedText(chars, selected)).catch(() => {});

                        snapshot();

                        cursor = clearSelected(chars, selected);
                        selected = null;
                        keyboardAnchor = null;

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
                keyboardAnchor = null;
                selected = null;

                handleEnter();

                break;
            case 'Backspace':
                snapshot();

                if (selected) {
                    cursor = clearSelected(chars, selected);
                    selected = null;
                    keyboardAnchor = null;
                } else {
                    deleteChar();
                }

                break;
            default:
                if (event.key.length === 1) {
                    snapshot();

                    keyboardAnchor = null;
                    selected = null;

                    writeChar(event.key);

                    break;
                }
                return;
        }

        draw();
    }

    function setupCanvas() {
        const { innerWidth, innerHeight } = window;
        const dpr = window.devicePixelRatio || 1;

        cols = Math.floor(innerWidth / cellWidth) - COL_OFFSET;
        rows = Math.floor(innerHeight / cellHeight) - ROW_OFFSET;

        canvas.width = cols * cellWidth * dpr;
        canvas.height = rows * cellHeight * dpr;
        canvas.style.width = `${cols * cellWidth}px`;
        canvas.style.height = `${rows * cellHeight}px`;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.font = fontStr;
        ctx.textBaseline = 'ideographic';

        chars = Array.from({ length: rows }, () => Array.from({ length: cols }, () => ''));

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

        // TODO: Save state on resize.
        undoStack = [];
        redoStack = [];
    }

    function setSize() {
        setupCanvas();
        draw();
    }

    const rootStyles = window.getComputedStyle(document.documentElement);
    const fontSize = rootStyles.getPropertyValue('--canvas-font-size').trim();
    const fontFamily = rootStyles.getPropertyValue('--canvas-font-family').trim();
    const emSquare = getEmSquare(document.body);

    fontStr = `${fontSize} ${fontFamily}`;
    cellWidth = emSquare.width;
    cellHeight = emSquare.height;

    setSize();

    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseup', handleMouseUp);
    textarea.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', setSize);
    textarea.focus();

    return {
        destroy() {
            container.removeEventListener('mousedown', handleMouseDown);
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseup', handleMouseUp);
            textarea.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('resize', setSize);
        },
    };
}
