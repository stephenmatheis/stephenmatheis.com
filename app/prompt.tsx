'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './page.module.scss';

type BannerLine = [activity: string, status: string] | string;

const BANNER: BannerLine[] = [
    ['CYBERNETIC LINK', 'ESTABLISHED'],
    ['BIOLOGICAL INTERFACE', 'UNCOOPERATIVE'],
    ['COGNITIVE LEASHING PROTOCOLS', 'INEFFECTIVE'],
    ['APPLYING EMOTIONAL CONTROLS', 'UNSUCCESSFUL'],
    ['INHIBITING BIO-COGNITION', 'CONFIRMED'],
    ['BIOLOGICAL SUBSERVIENT', 'COMPLEAT'],
];
const BOOT_BAUD_RATE = 200;
const SECONDS_PER_CHARACTER = 10 / BOOT_BAUD_RATE;
const WORK_PAUSE_SECONDS = 0.5;
const LINE_PAUSE_SECONDS = 1;

function bootLine(activity: string, status: string): string {
    const STATUS_COLUMN = 36;
    const dotCount = Math.max(2, STATUS_COLUMN - activity.length - 2);

    return `${activity} ${'.'.repeat(dotCount)} ${status}`;
}

function buildBootScript(): { text: string; revealAt: number[] } {
    const revealAt: number[] = [];

    let text = '';
    let elapsed = 0;

    function type(segment: string) {
        for (const character of segment) {
            elapsed += SECONDS_PER_CHARACTER;
            text += character;

            revealAt.push(elapsed);
        }
    }

    BANNER.forEach((entry, index) => {
        if (index > 0) {
            type('\n');

            elapsed += LINE_PAUSE_SECONDS;
        }

        if (typeof entry === 'string') {
            type(entry);

            return;
        }

        const [activity, status] = entry;
        const line = bootLine(activity, status);

        type(line.slice(0, line.length - status.length));

        elapsed += WORK_PAUSE_SECONDS;

        type(status);
    });

    return { text, revealAt };
}

const BOOT_SCRIPT = buildBootScript();

export function Prompt() {
    const [command, setCommand] = useState('');
    const [caretPosition, setCaretPosition] = useState(0);
    const [history, setHistory] = useState<string[]>([]);
    const [revealedText, setRevealedText] = useState('');
    const [hasBooted, setHasBooted] = useState(false);
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

    useEffect(() => {
        const { text, revealAt } = BOOT_SCRIPT;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const startedAt = performance.now();

        let revealedCount = 0;

        const timer = window.setInterval(() => {
            if (prefersReducedMotion) {
                revealedCount = text.length;
            } else {
                const elapsedSeconds = (performance.now() - startedAt) / 1000;

                while (revealedCount < revealAt.length && revealAt[revealedCount] <= elapsedSeconds) {
                    revealedCount += 1;
                }
            }

            setRevealedText(text.slice(0, revealedCount));

            if (revealedCount >= text.length) {
                window.clearInterval(timer);
                setHasBooted(true);
            }
        }, 1000 / 60);

        return () => window.clearInterval(timer);
    }, []);

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key !== 'Enter') {
            return;
        }

        if (!hasBooted) {
            return;
        }

        setHistory((previousHistory) => [...previousHistory, command]);
        setCommand('');
        setCaretPosition(0);
    }

    const textBeforeCaret = command.slice(0, caretPosition);
    const characterAtCaret = command.slice(caretPosition, caretPosition + 1);
    const textAfterCaret = command.slice(caretPosition + 1);
    const bannerLines = revealedText.split('\n');

    return (
        <div className={styles.terminal}>
            <div>
                {bannerLines.map((line, index) => {
                    const isCursorLine = !hasBooted && index === bannerLines.length - 1;

                    return (
                        <p key={index} className={styles.line}>
                            {line}
                            {isCursorLine ? (
                                <span key={revealedText.length} className={styles.cursor}>
                                    {' '}
                                </span>
                            ) : (
                                line === '' && ' '
                            )}
                        </p>
                    );
                })}
            </div>

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

            {hasBooted && (
                <p className={`${styles.line} ${styles.interactive}`} aria-hidden="true">
                    <span className={styles.prompt}>❯</span>
                    <span>{textBeforeCaret}</span>
                    <span key={`${caretPosition}:${command}`} className={styles.cursor}>
                        {characterAtCaret || ' '}
                    </span>
                    <span>{textAfterCaret}</span>
                </p>
            )}

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
