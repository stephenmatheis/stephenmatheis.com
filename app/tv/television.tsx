'use client';

import { useEffect, useRef, useState } from 'react';
import { FittedFrame } from '../fitted-frame';
import { versions, versionUrl } from '../versions';
import styles from './television.module.css';

/**
 * How long the static shows at minimum when changing channels. Real TVs took
 * a moment to lock onto a signal, and without a minimum, fast-loading sites
 * would skip the static entirely and lose the effect.
 */
const minimumStaticMilliseconds = 350;

/** If a site never finishes loading, stop the static anyway after this long. */
const maximumStaticMilliseconds = 4000;

/**
 * How long to wait for a second digit when typing a channel number, like a
 * remote: press 1, then 4 within this window, and you get channel 14.
 */
const digitWindowMilliseconds = 1200;

const lastChannel = versions.length;

/**
 * A CRT television where each channel is a version.
 *
 * Controls, like a real remote:
 * - ↑ / ↓ (or Page Up / Page Down, or the buttons) change the channel by one.
 * - Digits jump straight to a channel.
 */
export function Television() {
    const [channel, setChannel] = useState(lastChannel);
    const [tuning, setTuning] = useState(true);
    const [typedDigits, setTypedDigits] = useState('');

    // When the current channel started tuning, to enforce the minimum static.
    const tuningStartedAt = useRef(0);

    const version = versions[channel - 1];

    /**
     * Every channel change goes through here. Channels wrap around like on
     * an old TV: up from 42 goes to 1.
     */
    function tuneTo(nextChannel: number) {
        const wrapped = ((nextChannel - 1 + lastChannel) % lastChannel) + 1;

        tuningStartedAt.current = performance.now();
        setTuning(true);
        setChannel(wrapped);
    }

    // Called by the iframe once the new channel's site has loaded.
    function handleLoad() {
        const elapsed = performance.now() - tuningStartedAt.current;
        const remaining = Math.max(0, minimumStaticMilliseconds - elapsed);

        window.setTimeout(() => setTuning(false), remaining);
    }

    // The safety net for sites that never fire a load event.
    useEffect(() => {
        if (!tuning) {
            return;
        }

        const timeout = window.setTimeout(() => setTuning(false), maximumStaticMilliseconds);

        return () => window.clearTimeout(timeout);
    }, [tuning, channel]);

    // Typed digits commit after a pause, or right away once there are two.
    useEffect(() => {
        if (typedDigits === '') {
            return;
        }

        function commit() {
            const typedChannel = Number(typedDigits);

            if (typedChannel >= 1 && typedChannel <= lastChannel) {
                tuneTo(typedChannel);
            }

            setTypedDigits('');
        }

        if (typedDigits.length === 2) {
            commit();

            return;
        }

        const timeout = window.setTimeout(commit, digitWindowMilliseconds);

        return () => window.clearTimeout(timeout);
    }, [typedDigits]);

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'ArrowUp' || event.key === 'PageUp') {
                event.preventDefault();
                tuneTo(channel + 1);
            } else if (event.key === 'ArrowDown' || event.key === 'PageDown') {
                event.preventDefault();
                tuneTo(channel - 1);
            } else if (/^[0-9]$/.test(event.key)) {
                setTypedDigits((digits) => digits + event.key);
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [channel]);

    // While typing, the on-screen display shows the digits so far, like "1-".
    const display = typedDigits ? typedDigits.padEnd(2, '-') : String(channel).padStart(2, '0');

    return (
        <main className={styles.room}>
            <div className={styles.television}>
                <div className={styles.screen}>
                    {/*
                     * Keyed by channel, so every channel change creates a fresh
                     * iframe instead of navigating the old one. That makes the
                     * load event fire reliably for each new channel.
                     */}
                    <FittedFrame key={channel} src={versionUrl(version)} title={version.name} onLoad={handleLoad} />

                    <Static visible={tuning} />

                    <div className={styles.scanlines} />

                    <div className={styles.onScreenDisplay} aria-live="polite">
                        CH {display}
                    </div>

                    <div className={styles.caption}>
                        {version.name} · {version.frozen.slice(0, 4)}
                    </div>
                </div>

                <div className={styles.controls}>
                    <div className={styles.readout}>{display}</div>

                    <button type="button" onClick={() => tuneTo(channel + 1)} aria-label="Channel up">
                        CH ▲
                    </button>

                    <button type="button" onClick={() => tuneTo(channel - 1)} aria-label="Channel down">
                        CH ▼
                    </button>

                    <a href={versionUrl(version)}>open ↗</a>

                    <div className={styles.speaker} />
                </div>
            </div>

            <p className={styles.hint}>↑ ↓ to change channels · type a number to jump</p>
        </main>
    );
}

/**
 * TV static: a small canvas filled with random gray pixels, redrawn every
 * frame, and stretched over the screen with hard edges.
 *
 * It's drawn tiny (160 × 120) because static should look chunky, and filling
 * a small canvas every frame is cheap. People who've asked their system for
 * reduced motion get a single still frame of static instead of the animation.
 */
function Static({ visible }: { visible: boolean }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');

        if (!canvas || !context || !visible) {
            return;
        }

        const noise = context.createImageData(canvas.width, canvas.height);
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let frame = 0;

        function draw() {
            // Four bytes per pixel (red, green, blue, alpha). Setting red,
            // green, and blue to the same random value makes a gray.
            for (let index = 0; index < noise.data.length; index += 4) {
                const gray = Math.random() * 255;

                noise.data[index] = gray;
                noise.data[index + 1] = gray;
                noise.data[index + 2] = gray;
                noise.data[index + 3] = 255;
            }

            context!.putImageData(noise, 0, 0);

            if (!reduceMotion) {
                frame = requestAnimationFrame(draw);
            }
        }

        draw();

        return () => cancelAnimationFrame(frame);
    }, [visible]);

    return (
        <canvas
            ref={canvasRef}
            className={styles.static}
            width={160}
            height={120}
            style={{ opacity: visible ? 1 : 0 }}
            aria-hidden="true"
        />
    );
}
