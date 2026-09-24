'use client';

import { useEffect, useRef, useState } from 'react';
import { versions, versionUrl } from '../versions';
import styles from './roulette.module.css';

/**
 * How the reel slows down: the delay between number changes starts short and
 * grows each tick, like a wheel losing speed. The spin ends once the delay
 * passes the last value.
 */
const firstDelayMilliseconds = 30;
const slowdownFactor = 1.12;
const lastDelayMilliseconds = 280;

function randomVersionNumber() {
    return Math.floor(Math.random() * versions.length) + 1;
}

/**
 * Spin for a random version.
 *
 * The winner is picked the moment the spin starts. Everything after that is
 * theater: the reel shows random numbers faster than you can read, slows
 * down, and the last number it shows is the winner. Then the version opens
 * full screen.
 *
 * Randomness only happens in the browser, after the page loads. If the server
 * picked a number, the browser would pick a different one while hydrating, and
 * React would warn that the page didn't match.
 */
export function Roulette() {
    const [reelNumber, setReelNumber] = useState<number | null>(null);
    const [winner, setWinner] = useState<number | null>(null);
    const [spinning, setSpinning] = useState(false);

    // The pending tick, so a new spin (or leaving the page) can cancel it.
    const timeoutRef = useRef<number | undefined>(undefined);

    function spin() {
        window.clearTimeout(timeoutRef.current);

        // Don't land on the version you're already looking at.
        let target = randomVersionNumber();

        while (target === winner && versions.length > 1) {
            target = randomVersionNumber();
        }

        setWinner(null);
        setSpinning(true);

        // Skip the theater for people who've asked for reduced motion.
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setReelNumber(target);
            setWinner(target);
            setSpinning(false);

            return;
        }

        function tick(delay: number) {
            if (delay > lastDelayMilliseconds) {
                setReelNumber(target);
                setWinner(target);
                setSpinning(false);

                return;
            }

            setReelNumber(randomVersionNumber());
            timeoutRef.current = window.setTimeout(() => tick(delay * slowdownFactor), delay);
        }

        tick(firstDelayMilliseconds);
    }

    // Spin once on arrival, and cancel any pending tick when leaving.
    useEffect(() => {
        spin();

        return () => window.clearTimeout(timeoutRef.current);
        // Only on mount. `spin` changes every render, and re-running this
        // effect would restart the spin in the middle of itself.
        // eslint-disable-next-line react/exhaustive-deps
    }, []);

    const winningVersion = winner === null ? null : versions[winner - 1];

    return (
        <main className={styles.casino}>
            {winningVersion ? (
                <>
                    <iframe
                        key={winningVersion.number}
                        className={styles.page}
                        src={versionUrl(winningVersion)}
                        title={winningVersion.name}
                    />

                    <div className={styles.result}>
                        <span>
                            v{winningVersion.number} · {winningVersion.name}
                        </span>
                        <button type="button" onClick={spin}>
                            ↻ spin again
                        </button>
                    </div>
                </>
            ) : (
                <div className={styles.machine} aria-live="polite" aria-busy={spinning}>
                    <div className={styles.reel}>
                        {reelNumber === null ? '??' : String(reelNumber).padStart(2, '0')}
                    </div>
                    <p>{spinning ? 'spinning…' : ''}</p>
                </div>
            )}
        </main>
    );
}
