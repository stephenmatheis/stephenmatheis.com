'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { versions, versionUrl, type Version } from '../versions';
import { Neofetch } from './neofetch';
import { effort } from '../facts';
import styles from './terminal.module.css';

/**
 * A pretend SSH session: the archive as a remote shell.
 *
 * This is the web stand-in for the real idea, where `ssh stephenmatheis.com`
 * works in an actual terminal. That needs a small always-on server speaking
 * the SSH protocol (your ssh-showcase-wish repo is most of one), hosted
 * somewhere that isn't Vercel, since Vercel serves HTTP, not SSH. Until then,
 * this fakes the experience in the browser.
 *
 * The screen is a list of lines. Each command appends the command itself,
 * then its output. The input is a real <input>, styled to sit inline after
 * the prompt, so typing, pasting, and mobile keyboards all just work.
 */

const prompt = 'guest@stephenmatheis:~$';

type Line = {
    id: number;
    content: ReactNode;
};

/** "v07" style names, the way the versions appear in `ls`. */
function versionName(version: Version) {
    return `v${String(version.number).padStart(2, '0')}`;
}

/**
 * Accepts "14", "v14", or "v014", and returns that version if it exists.
 * Commands like `open` and `cat` take any of those forms.
 */
function findVersion(argument: string | undefined) {
    const number = Number(argument?.replace(/^v/i, ''));

    return versions.find((version) => version.number === number);
}

/**
 * The "last login" is when the newest version froze: the last time anyone
 * (you) was really here. It's a plain date string rather than a Date, because
 * formatting a Date depends on the timezone, and the server and a visitor's
 * browser would disagree about what day it was.
 */
const welcome: ReactNode[] = [
    `Last login: ${versions[versions.length - 1].frozen} from 127.0.0.1`,
    '',
    `  ${versions.length} versions archived. All of them still running.`,
    '  Type `help` to see what you can do.',
    '',
];

export function Terminal() {
    const router = useRouter();

    const [lines, setLines] = useState<Line[]>(() => welcome.map((content, index) => ({ id: index, content })));
    const [input, setInput] = useState('');

    // Past commands, for ↑ and ↓. `historyIndex` is how far back you've gone;
    // null means you're typing a fresh command.
    const [history, setHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState<number | null>(null);

    const nextId = useRef(welcome.length);
    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    // Keep the newest line in view, like a real terminal scrolling.
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ block: 'end' });
    }, [lines]);

    function print(...contents: ReactNode[]) {
        setLines((existing) => [...existing, ...contents.map((content) => ({ id: nextId.current++, content }))]);
    }

    /**
     * The shell itself: split the command into a name and arguments, then
     * look up what to do. Anything unknown gets bash's error message.
     */
    function run(command: string) {
        const [name, ...args] = command.trim().split(/\s+/);

        print(
            <>
                <span className={styles.prompt}>{prompt}</span> {command}
            </>,
        );

        if (!name) {
            return;
        }

        switch (name) {
            case 'help': {
                print(
                    'ls               list every version',
                    'ls -l            list them with details',
                    'cat <version>    everything about one version, e.g. cat 14',
                    'open <version>   go to it, e.g. open v14',
                    'random           go to a random version',
                    'neofetch         show off',
                    'whoami, date, history, clear, exit',
                    '',
                );
                break;
            }

            case 'ls': {
                if (args.includes('-l')) {
                    // Styled after `ls -l`, with the columns repurposed.
                    print(
                        ...versions.map((version) => (
                            <a key={version.number} href={versionUrl(version)} className={styles.link}>
                                {`lrwxr-xr-x  ${String(version.commits).padStart(4)} commits  ${version.frozen}  ${versionName(version)} -> ${version.branch}`}
                            </a>
                        )),
                    );
                } else {
                    print(
                        <span className={styles.columns}>
                            {versions.map((version) => (
                                <a key={version.number} href={versionUrl(version)} className={styles.link}>
                                    {versionName(version)} {version.name}
                                </a>
                            ))}
                        </span>,
                    );
                }

                break;
            }

            case 'cat': {
                const version = findVersion(args[0]);

                if (!version) {
                    print(`cat: ${args[0] ?? ''}: No such version`);
                    break;
                }

                print(
                    `name        ${version.name}`,
                    `url         ${versionUrl(version)}`,
                    `branch      ${version.branch} @ ${version.commit}`,
                    `built with  ${version.framework}`,
                    `worked on   ${version.started} → ${version.frozen}`,
                    `effort      ${effort(version)}`,
                    `last words  "${version.lastCommitMessage}"`,
                    '',
                );
                break;
            }

            case 'open':
            case 'cd': {
                const version = findVersion(args[0]);

                if (!version) {
                    print(`${name}: ${args[0] ?? ''}: No such version`);
                    break;
                }

                print(`Connecting to ${versionUrl(version)}…`);
                window.location.assign(versionUrl(version));
                break;
            }

            case 'random': {
                const version = versions[Math.floor(Math.random() * versions.length)];

                print(`Rolling… ${versionName(version)}. Connecting…`);
                window.location.assign(versionUrl(version));
                break;
            }

            case 'neofetch': {
                print(<Neofetch />, '');
                break;
            }

            case 'whoami': {
                print('guest');
                break;
            }

            case 'date': {
                print(new Date().toString());
                break;
            }

            case 'history': {
                print(...[...history, command].map((entry, index) => `${String(index + 1).padStart(4)}  ${entry}`));
                break;
            }

            case 'clear': {
                setLines([]);
                break;
            }

            case 'exit':
            case 'logout': {
                print('Connection to stephenmatheis.com closed.');
                window.setTimeout(() => router.push('/'), 900);
                break;
            }

            default: {
                print(`-bash: ${name}: command not found`);
            }
        }
    }

    function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            run(input);

            if (input.trim()) {
                setHistory((past) => [...past, input]);
            }

            setInput('');
            setHistoryIndex(null);
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();

            if (history.length === 0) {
                return;
            }

            const index = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);

            setHistoryIndex(index);
            setInput(history[index]);
        } else if (event.key === 'ArrowDown') {
            event.preventDefault();

            if (historyIndex === null) {
                return;
            }

            const index = historyIndex + 1;

            if (index >= history.length) {
                setHistoryIndex(null);
                setInput('');
            } else {
                setHistoryIndex(index);
                setInput(history[index]);
            }
        } else if (event.key === 'l' && event.ctrlKey) {
            // Ctrl+L clears the screen in most shells.
            event.preventDefault();
            setLines([]);
        } else if (event.key === 'c' && event.ctrlKey) {
            // Ctrl+C abandons the current line.
            event.preventDefault();
            print(
                <>
                    <span className={styles.prompt}>{prompt}</span> {input}^C
                </>,
            );
            setInput('');
        }
    }

    return (
        // Clicking anywhere in the terminal puts the cursor back in the input,
        // the way clicking a terminal window focuses it. The lint rule wants
        // click handlers only on interactive elements, but this one is only a
        // mouse shortcut: keyboard users are already in the input, so nothing
        // is lost for them.
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
        <main className={styles.terminal} onClick={() => inputRef.current?.focus()}>
            <div className={styles.screen}>
                <div className={styles.command}>
                    <span className={styles.dim}>$</span> ssh guest@stephenmatheis.com
                </div>

                {lines.map((line) => (
                    <div key={line.id} className={styles.line}>
                        {line.content}
                    </div>
                ))}

                <label className={styles.inputLine}>
                    <span className={styles.prompt}>{prompt}</span>
                    <input
                        ref={inputRef}
                        className={styles.input}
                        value={input}
                        onChange={(event) => setInput(event.target.value)}
                        onKeyDown={handleKeyDown}
                        aria-label="Command"
                        autoComplete="off"
                        autoCapitalize="off"
                        spellCheck={false}
                        // Autofocus is usually a bad surprise, but this page is
                        // a terminal: the prompt is the whole page, and typing
                        // is the only thing to do here.
                        // eslint-disable-next-line jsx-a11y/no-autofocus
                        autoFocus
                    />
                </label>

                <div ref={bottomRef} />
            </div>
        </main>
    );
}
