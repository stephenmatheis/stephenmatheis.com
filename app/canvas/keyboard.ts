import { getSelectedText, clearSelected } from '@/lib/tui';
import type { EditorState } from './editor';

// Functions the keyboard handler delegates to. These live in other modules
// for now and will be imported directly once those modules are extracted.
export type KeyboardActions = {
    draw(): void;
    snapshot(): void;
    undo(): void;
    redo(): void;
    writeChar(char: string): void;
    deleteChar(): void;
    handleEnter(): void;
    withSelection(moveFn: () => void, extending: boolean): void;
    moveCursor(dx: number, dy: number): void;
    wordJumpRight(): void;
    wordJumpLeft(): void;
    lineStart(): void;
    lineEnd(): void;
    docStart(): void;
    docEnd(): void;
};

export function handleKeyDown(event: KeyboardEvent, state: EditorState, actions: KeyboardActions) {
    const { shiftKey, altKey, metaKey, ctrlKey } = event;
    const extending = shiftKey;
    const isMovementKey = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key);

    // non-movement + cmd/ctrl modifier — handle and return, or pass through to the browser
    if (!isMovementKey && (metaKey || ctrlKey) && !altKey) {
        switch (event.key) {
            case 'a':
                event.preventDefault();

                state.keyboardAnchor = null;
                state.selected = {
                    start: { x: 0, y: 0 },
                    end: { x: state.cols - 1, y: state.rows - 1 },
                };

                actions.draw();

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
                        actions.snapshot();

                        state.keyboardAnchor = null;
                        state.selected = null;

                        for (const char of text) {
                            if (char === '\n') actions.handleEnter();
                            else if (char !== '\r') actions.writeChar(char);
                        }

                        actions.draw();
                    })
                    .catch(() => {});

                return;
            case 'x':
                event.preventDefault();

                if (state.selected) {
                    navigator.clipboard
                        .writeText(getSelectedText(state.chars, state.selected))
                        .catch(() => {});

                    actions.snapshot();

                    state.cursor = clearSelected(state.chars, state.selected);
                    state.selected = null;
                    state.keyboardAnchor = null;

                    actions.draw();
                }

                return;
            case 'z':
                event.preventDefault();

                // Cmd+Shift+Z = redo on macOS (mirrors the Shift convention
                // used by most Mac apps). Plain Cmd+Z = undo on both macOS
                // and Windows. Ctrl+Z on Windows is handled by the same
                // branch since ctrlKey is true in both cases.
                if (shiftKey) {
                    actions.redo();
                } else {
                    actions.undo();
                }

                return;
            case 'y':
                event.preventDefault();

                // Ctrl+Y is the redo shortcut on Windows and Linux.
                actions.redo();

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
            if (wordJump) actions.withSelection(actions.wordJumpRight, extending);
            else if (lineOrDocJump) actions.withSelection(actions.lineEnd, extending);
            else actions.withSelection(() => actions.moveCursor(1, 0), extending);

            break;
        case 'ArrowLeft':
            if (wordJump) actions.withSelection(actions.wordJumpLeft, extending);
            else if (lineOrDocJump) actions.withSelection(actions.lineStart, extending);
            else actions.withSelection(() => actions.moveCursor(-1, 0), extending);

            break;
        case 'ArrowDown':
            if (lineOrDocJump) actions.withSelection(actions.docEnd, extending);
            else actions.withSelection(() => actions.moveCursor(0, 1), extending);

            break;
        case 'ArrowUp':
            if (lineOrDocJump) actions.withSelection(actions.docStart, extending);
            else actions.withSelection(() => actions.moveCursor(0, -1), extending);

            break;
        case 'Home':
            actions.withSelection(ctrlKey ? actions.docStart : actions.lineStart, extending);

            break;
        case 'End':
            actions.withSelection(ctrlKey ? actions.docEnd : actions.lineEnd, extending);

            break;
        case 'Enter':
            state.keyboardAnchor = null;
            state.selected = null;

            actions.handleEnter();

            break;
        case 'Backspace':
            // Snapshot before either branch: both delete content, and
            // the user should be able to undo both the "delete selection"
            // and the "delete one character" cases.
            actions.snapshot();

            if (state.selected) {
                state.cursor = clearSelected(state.chars, state.selected);
                state.selected = null;
                state.keyboardAnchor = null;
            } else {
                actions.deleteChar();
            }

            break;
        default:
            if (event.key.length === 1) {
                actions.snapshot();

                state.keyboardAnchor = null;
                state.selected = null;

                actions.writeChar(event.key);

                break;
            }
            return;
    }

    actions.draw();
}
