import { getSelectedText, clearSelected } from '@/lib/tui';
import type { EditorState } from './editor';
import type { createCursor } from './cursor';
import type { createBuffer } from './buffer';
import type { createHistory } from './history';
import type { createSelection } from './selection';

export function createKeyboard(
    state: EditorState,
    draw: () => void,
    cursor: ReturnType<typeof createCursor>,
    buffer: ReturnType<typeof createBuffer>,
    history: ReturnType<typeof createHistory>,
    selection: ReturnType<typeof createSelection>,
) {
    function handleKeyDown(event: KeyboardEvent) {
        const { shiftKey, altKey, metaKey, ctrlKey } = event;
        const extending = shiftKey;
        const isMovementKey = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key);

        // non-movement + cmd/ctrl modifier — handle and return, or pass through to the browser
        if (!isMovementKey && (metaKey || ctrlKey) && !altKey) {
            switch (event.key) {
                case 'a':
                    event.preventDefault();

                    selection.selectAll();
                    draw();

                    return;
                case 'c':
                    event.preventDefault();

                    if (state.selected) {
                        navigator.clipboard
                            .writeText(getSelectedText(state.chars, state.selected))
                            .catch(() => {});
                    }

                    return;
                case 'v':
                    event.preventDefault();

                    navigator.clipboard
                        .readText()
                        .then((text) => {
                            // Snapshot before the paste so the entire paste is
                            // one undo step, not one step per character.
                            history.snapshot();
                            selection.clearSelection();

                            for (const char of text) {
                                if (char === '\n') buffer.handleEnter();
                                else if (char !== '\r') buffer.writeChar(char);
                            }

                            draw();
                        })
                        .catch(() => {});

                    return;
                case 'x':
                    event.preventDefault();

                    if (state.selected) {
                        navigator.clipboard
                            .writeText(getSelectedText(state.chars, state.selected))
                            .catch(() => {});

                        history.snapshot();

                        state.cursor = clearSelected(state.chars, state.selected);
                        selection.clearSelection();

                        draw();
                    }

                    return;
                case 'z':
                    event.preventDefault();

                    // Cmd+Shift+Z = redo on macOS (mirrors the Shift convention
                    // used by most Mac apps). Plain Cmd+Z = undo on both macOS
                    // and Windows. Ctrl+Z on Windows is handled by the same
                    // branch since ctrlKey is true in both cases.
                    if (shiftKey) {
                        history.redo();
                    } else {
                        history.undo();
                    }

                    return;
                case 'y':
                    event.preventDefault();

                    // Ctrl+Y is the redo shortcut on Windows and Linux.
                    history.redo();

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
                if (wordJump) selection.withSelection(cursor.wordJumpRight, extending);
                else if (lineOrDocJump) selection.withSelection(cursor.lineEnd, extending);
                else selection.withSelection(() => cursor.moveCursor(1, 0), extending);

                break;
            case 'ArrowLeft':
                if (wordJump) selection.withSelection(cursor.wordJumpLeft, extending);
                else if (lineOrDocJump) selection.withSelection(cursor.lineStart, extending);
                else selection.withSelection(() => cursor.moveCursor(-1, 0), extending);

                break;
            case 'ArrowDown':
                if (lineOrDocJump) selection.withSelection(cursor.docEnd, extending);
                else selection.withSelection(() => cursor.moveCursor(0, 1), extending);

                break;
            case 'ArrowUp':
                if (lineOrDocJump) selection.withSelection(cursor.docStart, extending);
                else selection.withSelection(() => cursor.moveCursor(0, -1), extending);

                break;
            case 'Home':
                selection.withSelection(ctrlKey ? cursor.docStart : cursor.lineStart, extending);

                break;
            case 'End':
                selection.withSelection(ctrlKey ? cursor.docEnd : cursor.lineEnd, extending);

                break;
            case 'Enter':
                selection.clearSelection();
                buffer.handleEnter();

                break;
            case 'Backspace':
                // Snapshot before either branch: both delete content, and
                // the user should be able to undo both the "delete selection"
                // and the "delete one character" cases.
                history.snapshot();

                if (state.selected) {
                    state.cursor = clearSelected(state.chars, state.selected);
                    selection.clearSelection();
                } else {
                    buffer.deleteChar();
                }

                break;
            default:
                if (event.key.length === 1) {
                    history.snapshot();
                    selection.clearSelection();
                    buffer.writeChar(event.key);

                    break;
                }
                return;
        }

        draw();
    }

    return { handleKeyDown };
}
