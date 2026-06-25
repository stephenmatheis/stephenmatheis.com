import type { InputEventName } from '@/lib/editor/tui';
import { getSelectedText, clearSelected } from './selection';
import type { SelectionState, ContentState } from './types';
import type { Cursor } from './cursor';
import type { Buffer } from './buffer';
import type { History } from './history';
import type { Selection } from './selection';

type InputActions = {
    isActiveInput(): boolean;
    emitEvent(event: InputEventName): void;
    emitChangeIfChanged(): void;
};

type ModalActions = {
    isOpen(): boolean;
    dismiss(): void;
};

type FloatActions = {
    isOpen(): boolean;
    dismiss(): void;
};

type KeyboardProps = {
    textarea: HTMLTextAreaElement;
    state: Pick<SelectionState, 'selected'> & Pick<ContentState, 'chars'>;
    cursor: ReturnType<typeof Cursor>;
    buffer: ReturnType<typeof Buffer>;
    history: ReturnType<typeof History>;
    selection: ReturnType<typeof Selection>;
    focus: { focusNext(): void; focusPrev(): void };
    inputActions: InputActions;
    modalActions: ModalActions;
    floatActions?: FloatActions;
    draw: () => void;
};

export function Keyboard({
    textarea,
    state,
    cursor,
    buffer,
    history,
    selection,
    focus,
    inputActions,
    modalActions,
    floatActions,
    draw,
}: KeyboardProps) {
    function handleKeyDown(event: KeyboardEvent) {
        const { shiftKey, altKey, metaKey, ctrlKey } = event;
        const extending = shiftKey;
        const isMovementKey = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key);

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

                        cursor.jumpTo(clearSelected(state.chars, state.selected));
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

                    draw();

                    return;
                case 'y':
                    event.preventDefault();

                    history.redo();
                    draw();

                    return;
                default:
                    return;
            }
        }

        event.preventDefault();

        const wordJump = (altKey || ctrlKey) && !metaKey;
        const lineOrDocJump = metaKey && !altKey;

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
                if (lineOrDocJump) selection.withSelection(cursor.regionEnd, extending);
                else selection.withSelection(() => cursor.moveCursor(0, 1), extending);

                break;
            case 'ArrowUp':
                if (lineOrDocJump) selection.withSelection(cursor.regionStart, extending);
                else selection.withSelection(() => cursor.moveCursor(0, -1), extending);

                break;
            case 'Home':
                selection.withSelection(ctrlKey ? cursor.regionStart : cursor.lineStart, extending);

                break;
            case 'End':
                selection.withSelection(ctrlKey ? cursor.regionEnd : cursor.lineEnd, extending);

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

                if (shiftKey) {
                    focus.focusPrev();
                } else {
                    focus.focusNext();
                }

                break;
            case 'Backspace':
                history.snapshot();

                if (state.selected) {
                    cursor.jumpTo(clearSelected(state.chars, state.selected));
                    selection.clearSelection();
                } else {
                    buffer.deleteChar();
                }

                break;
            case 'Escape':
                if (modalActions.isOpen()) {
                    modalActions.dismiss();
                } else if (floatActions?.isOpen()) {
                    floatActions.dismiss();
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

    return {
        add() {
            textarea.addEventListener('keydown', handleKeyDown);
        },
        remove() {
            textarea.removeEventListener('keydown', handleKeyDown);
        },
    };
}
