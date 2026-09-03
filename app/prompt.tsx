'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './page.module.scss';

export function Prompt() {
    const [command, setCommand] = useState('');
    const [caretPosition, setCaretPosition] = useState(0);
    const [history, setHistory] = useState<string[]>([]);
    const inputElement = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputElement.current?.focus();

        function refocus(event: MouseEvent) {
            const selection = window.getSelection();

            if (selection !== null && !selection.isCollapsed) {
                return;
            }

            if (event.target instanceof Element && event.target.closest('a')) {
                return;
            }

            inputElement.current?.focus();
        }

        function syncCaretPosition() {
            if (document.activeElement === inputElement.current) {
                setCaretPosition(inputElement.current?.selectionStart ?? 0);
            }
        }

        window.addEventListener('click', refocus);
        document.addEventListener('selectionchange', syncCaretPosition);

        return () => {
            window.removeEventListener('click', refocus);
            document.removeEventListener('selectionchange', syncCaretPosition);
        };
    }, []);

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            setHistory((previousHistory) => [...previousHistory, command]);
            setCommand('');
            setCaretPosition(0);
        }
    }

    const textBeforeCaret = command.slice(0, caretPosition);
    const characterAtCaret = command.slice(caretPosition, caretPosition + 1);
    const textAfterCaret = command.slice(caretPosition + 1);

    return (
        <div className={styles.terminal}>
            <div aria-live="polite">
                {history.map((line, index) => (
                    <p key={index} className={styles.line}>
                        <span className={styles.prompt} aria-hidden="true">
                            ❯
                        </span>
                        <span>{line}</span>
                    </p>
                ))}
            </div>
            <p className={styles.line} aria-hidden="true">
                <span className={styles.prompt}>❯</span>
                <span>{textBeforeCaret}</span>
                <span key={`${caretPosition}:${command}`} className={styles.cursor}>
                    {characterAtCaret || ' '}
                </span>
                <span>{textAfterCaret}</span>
            </p>
            <input
                ref={inputElement}
                className={styles.input}
                value={command}
                onChange={(event) => setCommand(event.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                aria-label="Terminal input"
            />
        </div>
    );
}
