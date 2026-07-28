'use client';

import { useEffect, useRef, useState } from 'react';
import { Frame } from '@/app/components/Frame';
import { Ring } from '@/app/components/Ring';
import { Hotspot } from '@/app/components/Hotspot';
import { TiltCard } from '@/app/components/TiltCard';
import { OrbitField, OrbitNode } from '@/app/components/OrbitField';
import { StarField } from '@/app/components/StarField';
import { Reticle } from '@/app/components/Reticle';
import styles from './page.module.scss';

// Dark only, fixed values. Back to black/white/gray as the base — MONO
// is what every panel's chrome (corners, labels, ticks) uses now. ACCENT
// (cyan) is spent in exactly four places: the live clock ring, the log's
// blinking cursor, the "Exploring" hotspot, and hover states — a few
// targeted doses instead of a different color per widget.
const BG = '#0a0d10';
const FG = '#e9e6e0';
const MONO = '#7d838a';
const ACCENT = '#5fd3e6';

const EXPLORING = ['RUST', 'ZIG', 'SWIFT', 'CREATIVE CODING'];

const LOG_LINES = [
    'status: bored with the usual stack',
    'action: rebuilding this site from scratch',
    'exploring: rust, zig, swift',
    'mode: creative programming, no deadline',
    'note: every panel here scrolls on its own',
    'note: nothing above the fold is fake data',
];

// Pulled from `gh api users/stephenmatheis/repos` — a manually refreshed
// snapshot rather than a live fetch, so the homepage doesn't take a
// dependency on the GitHub API being up.
const PROJECTS = [
    { name: 'line-writer', language: 'TypeScript', pushedAt: '2026-07-18T23:42:42Z' },
    { name: 'matrix-display', language: 'TypeScript', pushedAt: '2026-07-06T23:57:34Z' },
    { name: 'book', language: 'TypeScript', pushedAt: '2026-05-19T17:19:12Z' },
    { name: 'gameloops', language: 'HTML', pushedAt: '2026-05-15T22:45:15Z' },
    { name: 'bricks', language: 'CSS', pushedAt: '2026-02-17T20:47:35Z' },
    { name: 'tui', language: 'JavaScript', pushedAt: '2026-01-12T20:56:28Z' },
    { name: 'quest', language: 'TypeScript', pushedAt: '2026-01-02T02:25:12Z' },
    { name: 'nextjs-starter', language: 'TypeScript', pushedAt: '2025-12-27T18:52:37Z' },
] as const;

// Every public non-fork repo, same snapshot, most-recently-pushed first —
// the full set behind the curated PROJECTS strip, browsable in the IDENT
// window instead of summarized.
const ALL_REPOS = [
    { name: 'line-writer', language: 'TypeScript' },
    { name: 'matrix-display', language: 'TypeScript' },
    { name: 'book', language: 'TypeScript' },
    { name: 'gameloops', language: 'HTML' },
    { name: 'bricks', language: 'CSS' },
    { name: 'tui', language: 'JavaScript' },
    { name: 'bookmarks', language: 'JavaScript' },
    { name: 'quest', language: 'TypeScript' },
    { name: 'nextjs-starter', language: 'TypeScript' },
    { name: 'motion-landing', language: 'TypeScript' },
    { name: 'eileen', language: 'TypeScript' },
    { name: 'quest-app', language: 'TypeScript' },
    { name: 'tablet', language: 'TypeScript' },
    { name: 'msr', language: 'TypeScript' },
    { name: 'pitch', language: 'TypeScript' },
    { name: 'old-skool', language: 'TypeScript' },
    { name: 'crepo', language: 'JavaScript' },
    { name: 'game-console', language: 'TypeScript' },
    { name: 'bookmarks-app', language: 'TypeScript' },
    { name: 'mkrepo', language: 'JavaScript' },
    { name: 'querysmith-bedrock-lite', language: 'TypeScript' },
    { name: 'quirk-next', language: 'TypeScript' },
    { name: 'quirk', language: 'TypeScript' },
    { name: 'focus-game', language: 'TypeScript' },
    { name: 'guides', language: 'TypeScript' },
    { name: 'cors-proxy', language: 'JavaScript' },
    { name: 'next-template', language: 'JavaScript' },
    { name: 'download-messages', language: '—' },
    { name: 'pulp', language: '—' },
    { name: 'tabs', language: 'TypeScript' },
    { name: 'next-select-grid', language: 'TypeScript' },
    { name: 'settings', language: 'TypeScript' },
    { name: 'tags', language: 'TypeScript' },
    { name: 'typewriter-about', language: 'JavaScript' },
    { name: 'home-page', language: 'JavaScript' },
    { name: 'octokit', language: 'TypeScript' },
    { name: 'animated-about', language: 'JavaScript' },
    { name: 'next-portfolio', language: 'JavaScript' },
    { name: 'words', language: 'JavaScript' },
    { name: 'animated-header', language: 'JavaScript' },
    { name: 'design', language: 'JavaScript' },
    { name: 'gui', language: 'JavaScript' },
    { name: 'bauhaus', language: 'JavaScript' },
    { name: 'fonts', language: 'TypeScript' },
    { name: 'react-three-fiber', language: 'TypeScript' },
    { name: 'indicator', language: 'TypeScript' },
    { name: 'controller', language: 'TypeScript' },
    { name: 'grid-select-next-cell', language: 'CSS' },
    { name: 'app.stephenmatheis.com', language: '—' },
    { name: 'stephenmatheis', language: '—' },
    { name: 'battleship', language: 'JavaScript' },
    { name: 'hours', language: 'JavaScript' },
    { name: 'test-gh-pages', language: 'CSS' },
    { name: 'spo-pwsh-util', language: 'PowerShell' },
    { name: 'cities-spa', language: 'HTML' },
    { name: 'cities-react', language: 'JavaScript' },
    { name: 'cities-vanillajs', language: 'JavaScript' },
    { name: 'Samepage', language: 'JavaScript' },
    { name: 'samepage_v1', language: 'JavaScript' },
    { name: 'robi-example', language: 'JavaScript' },
    { name: 'paepr', language: 'JavaScript' },
] as const;

// Language breakdown across every public non-fork repo — same source,
// same snapshot. Real counts driving OrbitField instead of arbitrary
// decoration.
const LANGUAGES: OrbitNode[] = [
    { label: 'TYPESCRIPT', count: 29 },
    { label: 'JAVASCRIPT', count: 23 },
    { label: 'CSS', count: 3 },
    { label: 'HTML', count: 2 },
];

// A short ident code per repo, drone-tag style: first + last consonant-ish
// letters of the name plus its position in the list.
function identCode(name: string, index: number) {
    const letters = name.replace(/[^a-z]/gi, '').toUpperCase();
    return `${letters.slice(0, 1)}${letters.slice(-1)}${index + 1}`;
}

function timeAgo(iso: string) {
    const days = Math.round((Date.now() - new Date(iso).getTime()) / 86_400_000);

    if (days < 1) return 'today';
    if (days < 14) return `${days}d ago`;
    if (days < 60) return `${Math.round(days / 7)}w ago`;
    return `${Math.round(days / 30)}mo ago`;
}

function formatDuration(seconds: number) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
}

function useClock() {
    const [time, setTime] = useState('');

    useEffect(() => {
        const tick = () => setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    return time;
}

// Mouse position drives two things at once: the live HUD readout below
// (needs a render) and page-wide parallax (doesn't — pushed straight to a
// CSS custom property on the root so each panel can read it at its own
// strength without the whole page re-rendering on every pixel of
// movement). rAF-gated so a fast mouse doesn't queue more renders than
// the screen can show.
function usePointer(rootRef: React.RefObject<HTMLDivElement | null>) {
    const [point, setPoint] = useState({ x: 0, y: 0 });
    const frame = useRef<number | null>(null);

    useEffect(() => {
        function handleMove(event: MouseEvent) {
            const nx = event.clientX / window.innerWidth - 0.5;
            const ny = event.clientY / window.innerHeight - 0.5;
            rootRef.current?.style.setProperty('--mx', `${nx}`);
            rootRef.current?.style.setProperty('--my', `${ny}`);

            if (frame.current !== null) return;
            frame.current = requestAnimationFrame(() => {
                setPoint({ x: event.clientX, y: event.clientY });
                frame.current = null;
            });
        }

        window.addEventListener('mousemove', handleMove);
        return () => {
            window.removeEventListener('mousemove', handleMove);
            if (frame.current !== null) cancelAnimationFrame(frame.current);
        };
    }, [rootRef]);

    return point;
}

function useViewport() {
    const [size, setSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        function handleResize() {
            setSize({ width: window.innerWidth, height: window.innerHeight });
        }

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return size;
}

// Clicks, keystrokes, last key, and time-on-page — nothing here is
// simulated, all are just real events since mount.
function useSession() {
    const [clicks, setClicks] = useState(0);
    const [keys, setKeys] = useState(0);
    const [lastKey, setLastKey] = useState('');
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const handleClick = () => setClicks((c) => c + 1);
        const handleKey = (event: KeyboardEvent) => {
            setKeys((k) => k + 1);
            setLastKey(event.key.toUpperCase());
        };
        const id = setInterval(() => setSeconds((s) => s + 1), 1000);

        window.addEventListener('click', handleClick);
        window.addEventListener('keydown', handleKey);
        return () => {
            window.removeEventListener('click', handleClick);
            window.removeEventListener('keydown', handleKey);
            clearInterval(id);
        };
    }, []);

    return { clicks, keys, lastKey, seconds };
}

function useOnline() {
    const [online, setOnline] = useState(true);

    useEffect(() => {
        setOnline(navigator.onLine);
        const on = () => setOnline(true);
        const off = () => setOnline(false);
        window.addEventListener('online', on);
        window.addEventListener('offline', off);
        return () => {
            window.removeEventListener('online', on);
            window.removeEventListener('offline', off);
        };
    }, []);

    return online;
}

function useVisible() {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const handle = () => setVisible(document.visibilityState === 'visible');
        handle();
        document.addEventListener('visibilitychange', handle);
        return () => document.removeEventListener('visibilitychange', handle);
    }, []);

    return visible;
}

function useFocused() {
    const [focused, setFocused] = useState(true);

    useEffect(() => {
        setFocused(document.hasFocus());
        const on = () => setFocused(true);
        const off = () => setFocused(false);
        window.addEventListener('focus', on);
        window.addEventListener('blur', off);
        return () => {
            window.removeEventListener('focus', on);
            window.removeEventListener('blur', off);
        };
    }, []);

    return focused;
}

// A sweeping seconds ring — real, always moving, the one dial that never
// sits still even when nothing else on the page changes.
function SecRing({ seconds, accent }: { seconds: number; accent: string }) {
    const radius = 42;
    const circumference = 2 * Math.PI * radius;
    const fraction = (seconds % 60) / 60;
    const offset = circumference * (1 - fraction);

    return (
        <div className={styles.scrollRing} style={{ '--accent': accent } as React.CSSProperties}>
            <svg viewBox="0 0 100 100">
                <circle className={styles.scrollRingTrack} cx="50" cy="50" r={radius} fill="none" strokeWidth="1.5" />
                <circle
                    className={styles.scrollRingProgress}
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    strokeWidth="1.5"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                />
            </svg>
            <div className={styles.scrollRingValue}>{seconds % 60}</div>
            <div className={styles.scrollRingLabel}>SEC</div>
        </div>
    );
}

// Types the current line, holds, then folds it into a scrolling history —
// the one window built specifically to demonstrate that scrolling now
// happens inside panels, not the page. Frame's own .body supplies the
// scroll container; this only has to keep the newest line in view.
function Terminal() {
    const [lineIndex, setLineIndex] = useState(0);
    const [text, setText] = useState('');
    const [history, setHistory] = useState<{ time: string; text: string }[]>([]);
    const endRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let i = 0;
        const line = LOG_LINES[lineIndex % LOG_LINES.length];
        const type = setInterval(() => {
            i += 1;
            setText(line.slice(0, i));

            if (i >= line.length) {
                clearInterval(type);
                setTimeout(() => {
                    setHistory((prev) => [
                        ...prev.slice(-39),
                        { time: new Date().toLocaleTimeString('en-US', { hour12: false }), text: line },
                    ]);
                    setText('');
                    setLineIndex((prev) => prev + 1);
                }, 1400);
            }
        }, 26);

        return () => clearInterval(type);
    }, [lineIndex]);

    useEffect(() => {
        endRef.current?.scrollIntoView({ block: 'end' });
    }, [history, text]);

    return (
        <div className={styles.terminal}>
            {history.map((entry, i) => (
                <div key={i} className={styles.terminalLine}>
                    <span className={styles.terminalTime}>{entry.time}</span> {entry.text}
                </div>
            ))}
            <div className={styles.terminalLine}>
                <span className={styles.terminalPrompt}>&gt;</span> {text}
                <span className={styles.cursor} />
            </div>
            <div ref={endRef} />
        </div>
    );
}

// The full repo list, drone-tag style — PROJECTS above is the curated
// eight, this is everything, browsable in its own scrolling window.
function IdentGrid() {
    return (
        <div className={styles.identGrid}>
            {ALL_REPOS.map((project, i) => (
                <a
                    key={project.name}
                    className={styles.identCell}
                    href={`https://github.com/stephenmatheis/${project.name}`}
                    target="_blank"
                    rel="noreferrer"
                >
                    <span className={styles.identCode}>{identCode(project.name, i)}</span>
                    <span className={styles.identLang}>{project.language}</span>
                </a>
            ))}
        </div>
    );
}

const WAVEFORM_BARS = Array.from({ length: 28 }, (_, i) => ({
    delay: `${((i * 47) % 100) / 100}s`,
    duration: `${0.6 + ((i * 31) % 50) / 100}s`,
}));

function Waveform() {
    return (
        <div className={styles.waveform}>
            {WAVEFORM_BARS.map((bar, i) => (
                <span
                    key={i}
                    className={styles.waveformBar}
                    style={{ animationDelay: bar.delay, animationDuration: bar.duration } as React.CSSProperties}
                />
            ))}
        </div>
    );
}

type NavigatorConnection = { effectiveType?: string };
type NavigatorExtra = Navigator & { deviceMemory?: number; connection?: NavigatorConnection };

export default function Home() {
    const rootRef = useRef<HTMLDivElement>(null);
    const time = useClock();
    const mouse = usePointer(rootRef);
    const viewport = useViewport();
    const session = useSession();
    const online = useOnline();
    const visible = useVisible();
    const focused = useFocused();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const timezone = mounted ? Intl.DateTimeFormat().resolvedOptions().timeZone : '';
    const nav = mounted && typeof navigator !== 'undefined' ? (navigator as NavigatorExtra) : null;
    const platform = nav?.platform ?? '';
    const language = nav?.language ?? '';
    const cores = nav?.hardwareConcurrency;
    const memory = nav?.deviceMemory;
    const connection = nav?.connection?.effectiveType;
    const pixelRatio = mounted ? window.devicePixelRatio : undefined;
    const touch = mounted ? navigator.maxTouchPoints > 0 : false;
    const reducedMotion = mounted ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

    return (
        <div ref={rootRef} className={styles.page} style={{ '--accent': ACCENT } as React.CSSProperties}>
            <StarField />
            <Reticle accent={ACCENT} />
            <div className={styles.grid} />

            <div className={styles.layout}>
                <div className={styles.col1}>
                    <div className={styles.hero}>
                        <Frame
                            label="STEPHEN MATHEIS"
                            value={time && `T · ${time}`}
                            labelBL="SYS"
                            labelBR="OK"
                            accent={MONO}
                            background={BG}
                            foreground={FG}
                            padding={18}
                            fontSize={12}
                        >
                            <p className={styles.bio}>
                                I don&rsquo;t blog. This is just where the work lives — personal projects,
                                experiments, whatever I&rsquo;m currently trying to learn.
                            </p>
                            <a className={styles.link} href="https://github.com/stephenmatheis">
                                See the work →
                            </a>
                        </Frame>

                        <Hotspot
                            leftPct={100}
                            topPct={0}
                            legDx={40}
                            legDy={-40}
                            label="Exploring"
                            accent={ACCENT}
                            background={BG}
                            foreground={FG}
                        >
                            <div className={styles.tagList}>
                                {EXPLORING.map((tag) => (
                                    <span key={tag} className={styles.tag}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </Hotspot>
                    </div>

                    <div className={styles.log}>
                        <Frame label="LOG" accent={ACCENT} background={BG} foreground={FG} fontSize={9}>
                            <Terminal />
                        </Frame>
                    </div>
                </div>

                <div className={styles.col2}>
                    <div className={styles.rings}>
                        <Ring label="LOCAL TIME" value={time} accent={ACCENT} background={BG} foreground={FG} size={106} />
                        <SecRing seconds={session.seconds} accent={MONO} />
                    </div>

                    <div className={styles.system}>
                        <Frame label="SYSTEM" accent={MONO} background={BG} foreground={FG} fontSize={9}>
                            <dl className={styles.readout}>
                                <dt>ONLINE</dt>
                                <dd>{mounted ? (online ? 'YES' : 'NO') : '—'}</dd>
                                <dt>VISIBLE</dt>
                                <dd>{mounted ? (visible ? 'YES' : 'NO') : '—'}</dd>
                                <dt>FOCUSED</dt>
                                <dd>{mounted ? (focused ? 'YES' : 'NO') : '—'}</dd>
                                <dt>MOTION</dt>
                                <dd>{mounted ? (reducedMotion ? 'REDUCED' : 'FULL') : '—'}</dd>
                                <dt>VIEWPORT</dt>
                                <dd>{viewport.width ? `${viewport.width} × ${viewport.height}` : '—'}</dd>
                                <dt>MOUSE</dt>
                                <dd>{mounted ? `${mouse.x}, ${mouse.y}` : '—'}</dd>
                                <dt>PIXEL RATIO</dt>
                                <dd>{pixelRatio ?? '—'}</dd>
                                <dt>TOUCH</dt>
                                <dd>{mounted ? (touch ? 'YES' : 'NO') : '—'}</dd>
                                <dt>TIMEZONE</dt>
                                <dd>{timezone || '—'}</dd>
                                <dt>PLATFORM</dt>
                                <dd>{platform || '—'}</dd>
                                <dt>LANGUAGE</dt>
                                <dd>{language || '—'}</dd>
                                <dt>CORES</dt>
                                <dd>{cores ?? '—'}</dd>
                                <dt>MEMORY</dt>
                                <dd>{memory ? `${memory}GB` : '—'}</dd>
                                <dt>CONNECTION</dt>
                                <dd>{connection ?? '—'}</dd>
                            </dl>
                        </Frame>
                    </div>

                    <div className={styles.input}>
                        <Frame label="INPUT" accent={MONO} background={BG} foreground={FG} fontSize={9}>
                            <dl className={styles.readout}>
                                <dt>CLICKS</dt>
                                <dd>{session.clicks}</dd>
                                <dt>KEYS</dt>
                                <dd>{session.keys}</dd>
                                <dt>LAST KEY</dt>
                                <dd>{session.lastKey || '—'}</dd>
                                <dt>SESSION</dt>
                                <dd>{formatDuration(session.seconds)}</dd>
                            </dl>
                        </Frame>
                    </div>
                </div>

                <div className={styles.col3}>
                    <div className={styles.orbitPanel}>
                        <OrbitField hub="REPOS" nodes={LANGUAGES} accent={MONO} background={BG} foreground={FG} size={150} />
                    </div>

                    <div className={styles.waveformPanel}>
                        <Frame label="LEVELS" accent={MONO} background={BG} foreground={FG} fontSize={9}>
                            <Waveform />
                        </Frame>
                    </div>

                    <div className={styles.identSection}>
                        <Frame
                            label="IDENT"
                            value={`${ALL_REPOS.length}`}
                            accent={MONO}
                            background={BG}
                            foreground={FG}
                            fontSize={9}
                        >
                            <IdentGrid />
                        </Frame>
                    </div>
                </div>
            </div>

            <div className={styles.projectsStrip}>
                {PROJECTS.map((project) => (
                    <TiltCard
                        key={project.name}
                        title={project.name}
                        meta={`${project.language} · ${mounted ? timeAgo(project.pushedAt) : '—'}`}
                        href={`https://github.com/stephenmatheis/${project.name}`}
                        accent={ACCENT}
                        background={BG}
                        foreground={FG}
                        className={styles.projectsCard}
                    />
                ))}
            </div>

            <div className={styles.floaters}>
                {EXPLORING.slice(0, 3).map((tag, i) => (
                    <span key={tag} className={styles.floater} data-index={i}>
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
}
