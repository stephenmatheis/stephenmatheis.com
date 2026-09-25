'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { playClick } from '../audio';
import { versions, versionShot, versionUrl } from '../versions';
import styles from './projector.module.css';

/**
 * A carousel slide projector, the kind that turned family vacations into an
 * evening in a dark living room.
 *
 * Each version is a slide in a round tray. Advancing is a two-part clunk:
 * the old slide drops out and the screen goes dark for a moment, then the
 * tray turns and the next slide drops in. The picture is warm, a little
 * dim at the edges, and has dust on the lens.
 *
 * → / Space / clicking the screen advances. ← goes back.
 */

/** How long the screen stays dark while the slides swap. */
const swapMilliseconds = 260;

export function Projector() {
    const [slide, setSlide] = useState(1);

    // The slide that's about to show, while the screen is dark mid-swap.
    const [changingTo, setChangingTo] = useState<number | null>(null);

    const version = versions[slide - 1];

    function advance(step: number) {
        if (changingTo !== null) {
            return;
        }

        // The tray is round: past the last slide comes the first again.
        const next = ((slide - 1 + step + versions.length) % versions.length) + 1;

        playClick({ pitch: 500, volume: 0.5, length: 0.09 });
        setChangingTo(next);
    }

    // Finish the swap: after a moment of darkness, the new slide drops in.
    useEffect(() => {
        if (changingTo === null) {
            return;
        }

        const timeout = window.setTimeout(() => {
            playClick({ pitch: 900, volume: 0.3, length: 0.05 });
            setSlide(changingTo);
            setChangingTo(null);
        }, swapMilliseconds);

        return () => window.clearTimeout(timeout);
    }, [changingTo]);

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'ArrowRight' || event.key === ' ') {
                event.preventDefault();
                advance(1);
            } else if (event.key === 'ArrowLeft') {
                advance(-1);
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    });

    const month = new Date(`${version.frozen}T00:00:00Z`).toLocaleString('en-US', {
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
    });

    return (
        <main className={styles.room}>
            <button
                type="button"
                className={styles.screen}
                data-dark={changingTo !== null || undefined}
                onClick={() => advance(1)}
                aria-label={`Slide ${slide}: ${version.name}. Click for the next slide.`}
            >
                <span className={styles.slide}>
                    <Image src={versionShot(version)} alt="" fill sizes="100vw" priority />
                </span>
                <span className={styles.dust} aria-hidden="true" />
            </button>

            <div className={styles.caption}>
                <span className={styles.label}>
                    #{slide} · {version.name} · {month}
                </span>
                <a href={versionUrl(version)}>visit ↗</a>
            </div>

            <Tray current={slide} />

            <p className={styles.hint}>click the screen or press → · ← goes back</p>
        </main>
    );
}

/**
 * The round slide tray, seen from above: one notch per slide around the
 * rim. The whole tray turns so the current slide's notch sits at the top,
 * where the projector's gate would be.
 */
function Tray({ current }: { current: number }) {
    const degreesPerSlot = 360 / versions.length;

    return (
        <svg className={styles.tray} viewBox="-50 -50 100 100" aria-hidden="true">
            <circle r="46" className={styles.trayRim} />
            <circle r="16" className={styles.trayHub} />
            <g style={{ transform: `rotate(${-(current - 1) * degreesPerSlot}deg)` }} className={styles.trayTurn}>
                {versions.map((version) => (
                    <rect
                        key={version.number}
                        x="-2.2"
                        y="-44"
                        width="4.4"
                        height="12"
                        rx="0.6"
                        className={version.number === current ? styles.slotCurrent : styles.slot}
                        transform={`rotate(${(version.number - 1) * degreesPerSlot})`}
                    />
                ))}
            </g>
        </svg>
    );
}
