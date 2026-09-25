'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { desktopHeight, desktopWidth } from '../fitted-frame';
import { versions, versionShot } from '../versions';
import styles from './image-diff.module.css';

/**
 * GitHub's image diff, for comparing any two versions.
 *
 * When a pull request changes an image, GitHub offers three ways to compare
 * the old and new file, and this copies all three:
 *
 * - 2-up: side by side, old framed in red and new in green.
 * - Swipe: stacked, with a handle you drag to wipe from one to the other.
 * - Onion skin: stacked, with a slider that fades the new one in.
 *
 * ← and → move both sides one version at a time, so you can walk the whole
 * history as a series of before-and-afters.
 */

type Mode = '2-up' | 'swipe' | 'onion';

const modes: { id: Mode; label: string }[] = [
    {
        id: '2-up',
        label: '2-up',
    },
    {
        id: 'swipe',
        label: 'Swipe',
    },
    {
        id: 'onion',
        label: 'Onion Skin',
    },
];

export function ImageDiff() {
    const [before, setBefore] = useState(versions.length - 1);
    const [after, setAfter] = useState(versions.length);
    const [mode, setMode] = useState<Mode>('swipe');

    // Shared by swipe (how far across the wipe is) and onion (how opaque the
    // new image is). Both run from 0 to 1.
    const [amount, setAmount] = useState(0.5);

    const beforeVersion = versions[before - 1];
    const afterVersion = versions[after - 1];

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            // Leave arrow keys alone while a select or slider has focus.
            if ((event.target as HTMLElement).closest('select, input')) {
                return;
            }

            const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;

            if (step === 0) {
                return;
            }

            // Move the pair together, keeping the gap between them, and stop at
            // the ends of the history.
            const gap = after - before;
            const nextBefore = Math.min(Math.max(1, before + step), versions.length - gap);

            setBefore(nextBefore);
            setAfter(nextBefore + gap);
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [before, after]);

    return (
        <main className={styles.page}>
            <header className={styles.toolbar}>
                <VersionSelect label="Before" value={before} onChange={setBefore} />
                <span aria-hidden="true">→</span>
                <VersionSelect label="After" value={after} onChange={setAfter} />
            </header>

            <div className={styles.modes} role="tablist" aria-label="Comparison mode">
                {modes.map((eachMode) => (
                    <button
                        key={eachMode.id}
                        type="button"
                        role="tab"
                        aria-selected={mode === eachMode.id}
                        onClick={() => setMode(eachMode.id)}
                    >
                        {eachMode.label}
                    </button>
                ))}
            </div>

            {mode === '2-up' && (
                <div className={styles.twoUp}>
                    <figure className={styles.deleted}>
                        <Image
                            src={versionShot(beforeVersion)}
                            alt={`Version ${before}`}
                            width={desktopWidth}
                            height={desktopHeight}
                            sizes="46vw"
                        />
                        <figcaption>
                            v{before} · W: {desktopWidth}px | H: {desktopHeight}px
                        </figcaption>
                    </figure>
                    <figure className={styles.added}>
                        <Image
                            src={versionShot(afterVersion)}
                            alt={`Version ${after}`}
                            width={desktopWidth}
                            height={desktopHeight}
                            sizes="46vw"
                        />
                        <figcaption>
                            v{after} · W: {desktopWidth}px | H: {desktopHeight}px
                        </figcaption>
                    </figure>
                </div>
            )}

            {mode !== '2-up' && (
                <div className={styles.stacked}>
                    <div className={styles.frame}>
                        <Image
                            src={versionShot(beforeVersion)}
                            alt={`Version ${before}`}
                            fill
                            sizes="(max-width: 1000px) 100vw, 1000px"
                        />

                        {/*
                         * Swipe: the new image is cropped from the right with
                         * clip-path, so dragging reveals more of it. Onion
                         * skin: the new image covers the old one completely,
                         * and only its opacity changes.
                         */}
                        <Image
                            className={styles.overlay}
                            src={versionShot(afterVersion)}
                            alt={`Version ${after}`}
                            fill
                            sizes="(max-width: 1000px) 100vw, 1000px"
                            style={
                                mode === 'swipe'
                                    ? { clipPath: `inset(0 ${(1 - amount) * 100}% 0 0)` }
                                    : { opacity: amount }
                            }
                        />

                        {mode === 'swipe' && <div className={styles.handle} style={{ left: `${amount * 100}%` }} />}
                    </div>

                    <label className={styles.slider}>
                        <span>v{before}</span>
                        <input
                            type="range"
                            min={0}
                            max={1}
                            step={0.001}
                            value={amount}
                            onChange={(event) => setAmount(Number(event.target.value))}
                            aria-label={mode === 'swipe' ? 'Swipe position' : 'Opacity of the newer version'}
                        />
                        <span>v{after}</span>
                    </label>
                </div>
            )}

            <p className={styles.hint}>← → step through the history in pairs</p>
        </main>
    );
}

function VersionSelect({
    label,
    value,
    onChange,
}: {
    label: string;
    value: number;
    onChange: (value: number) => void;
}) {
    return (
        <label className={styles.select}>
            <span>{label}</span>
            <select value={value} onChange={(event) => onChange(Number(event.target.value))}>
                {versions.map((version) => (
                    <option key={version.number} value={version.number}>
                        v{version.number} · {version.name}
                    </option>
                ))}
            </select>
        </label>
    );
}
