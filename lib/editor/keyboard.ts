import { getSelectedText, clearSelected } from './selection';
import type { EditorState } from './editor';
import type { Cursor } from './cursor';
import type { Buffer } from './buffer';
import type { History } from './history';
import type { Selection } from './selection';
import type { InputEventName } from '@/lib/editor/tui';

type InputActions = {
    isActiveInput(): boolean;
    emitEvent(event: InputEventName): void;
    emitChangeIfChanged(): void;
};

type KeyboardProps = {
    state: EditorState;
    draw: () => void;
    cursor: ReturnType<typeof Cursor>;
    buffer: ReturnType<typeof Buffer>;
    history: ReturnType<typeof History>;
    selection: ReturnType<typeof Selection>;
    focus: { focusNext(): void; focusPrev(): void };
    inputActions: InputActions;
};

export function Keyboard({ state, draw, cursor, buffer, history, selection, focus, inputActions }: KeyboardProps) {
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
                        navigator.clipboard.writeText(getSelectedText(state.chars, state.selected)).catch(() => {});
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
                        navigator.clipboard.writeText(getSelectedText(state.chars, state.selected)).catch(() => {});

                        history.snapshot();

                        state.cursor = clearSelected(state.chars, state.selected);
                        selection.clearSelection();

                        draw();
                    }

                    return;
                case 'z':
                    event.preventDefault();

                    if (shiftKey) {
                        history.redo();
                    } else {
                        history.undo();
                    }

                    return;
                case 'y':
                    event.preventDefault();

                    history.redo();

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

                if (inputActions.isActiveInput()) {
                    inputActions.emitEvent('enter');
                    inputActions.emitChangeIfChanged();
                } else {
                    buffer.handleEnter();
                }

                break;
            case 'Tab':
                selection.clearSelection();

                if (shiftKey) focus.focusPrev();
                else focus.focusNext();

                break;
            case 'Backspace':
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
                    inputActions.emitEvent('input');

                    break;
                }
                return;
        }

        draw();
    }

    return { handleKeyDown };
}
