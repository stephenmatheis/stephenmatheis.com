'use client';

import { useEffect, useState } from 'react';
import { FittedFrame } from '../fitted-frame';
import { versions, versionShot, versionUrl } from '../versions';
import styles from './scrubber.module.css';

/**
 * How long the slider has to sit still before the live site loads. Loading a
 * whole website on every step of a drag would be slow and janky, so dragging
 * shows screenshots, and the real thing only loads once you've stopped.
 */
const settleMilliseconds = 400;

/**
 * A timeline scrubber: one site on screen, a slider underneath, and dragging
 * the slider moves through every version in order.
 *
 * The screenshot and the live iframe are sized and positioned identically, so
 * when the live site loads over the screenshot, nothing jumps. It just comes
 * alive.
 */
export function Scrubber() {
    const [position, setPosition] = useState(versions.length);
    const [settled, setSettled] = useState(true);

    const version = versions[position - 1];

    // Wait for the slider to go still before loading the live site.
    useEffect(() => {
        if (settled) {
            return;
        }

        const timeout = window.setTimeout(() => setSettled(true), settleMilliseconds);

        return () => window.clearTimeout(timeout);
    }, [position, settled]);

    // Warm the browser cache with every screenshot up front, so the first
    // drag through the timeline doesn't stutter while images load.
    useEffect(() => {
        for (const eachVersion of versions) {
            const image = new Image();

            image.src = versionShot(eachVersion);
        }
    }, []);

    /**
     * ← and → step through versions from anywhere on the page, not just when
     * the slider has focus. (When it does have focus, the slider handles the
     * arrows itself, so this skips them to avoid moving two steps.)
     */
    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
                return;
            }

            if ((event.target as HTMLElement).matches('input[type="range"]')) {
                return;
            }

            const step = event.key === 'ArrowRight' ? 1 : -1;

            setPosition((current) => Math.min(versions.length, Math.max(1, current + step)));
            setSettled(false);
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    /**
     * Labels for the timeline: one per year, placed above the first version
     * made that year. Positions are by version, not by date, because the
     * slider moves one version per step, and some years had far more
     * versions than others.
     */
    const yearMarks = versions.filter((eachVersion, index) => {
        const previous = versions[index - 1];

        return !previous || previous.frozen.slice(0, 4) !== eachVersion.frozen.slice(0, 4);
    });

    return (
        <main className={styles.scrubber}>
            <div className={styles.stage}>
                {/*
                 * The flipbook: always the screenshot for the current position.
                 *
                 * A plain <img> on purpose. The screenshots are preloaded by
                 * their exact URLs above, so every frame of a drag comes
                 * straight from the cache. next/image would request resized
                 * copies at different URLs, which the preload doesn't cover.
                 */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className={styles.shot} src={versionShot(version)} alt="" />

                {settled && (
                    <div className={styles.live}>
                        <FittedFrame key={version.number} src={versionUrl(version)} title={version.name} />
                    </div>
                )}
            </div>

            <div className={styles.timeline}>
                <p className={styles.label}>
                    <a href={versionUrl(version)}>
                        v{version.number} · {version.name}
                    </a>{' '}
                    <span>{version.frozen}</span>
                </p>

                <div className={styles.track}>
                    {yearMarks.map((mark) => (
                        <span
                            key={mark.number}
                            className={styles.year}
                            style={{ left: `${((mark.number - 1) / (versions.length - 1)) * 100}%` }}
                        >
                            {mark.frozen.slice(0, 4)}
                        </span>
                    ))}

                    <input
                        className={styles.range}
                        type="range"
                        min={1}
                        max={versions.length}
                        step={1}
                        value={position}
                        onChange={(event) => {
                            setPosition(Number(event.target.value));
                            setSettled(false);
                        }}
                        aria-label="Version"
                        aria-valuetext={`Version ${version.number}, ${version.name}, ${version.frozen}`}
                    />
                </div>
            </div>
        </main>
    );
}
