'use client';

import { useEffect, useRef, useState } from 'react';
import { audioContext, noiseBuffer } from '../audio';
import { FittedFrame } from '../fitted-frame';
import { versions, versionUrl } from '../versions';
import styles from './radio.module.css';

/**
 * A 1950s radio-TV console: turn the dial across the FM band, and when the
 * needle lands on a station, a version comes in on the little screen.
 *
 * Every version gets a frequency, spread evenly from 88.5 to 107.5 MHz.
 * Between stations there's static, both on screen and (once you've touched
 * the dial) in your speakers, and it fades out as you tune in, like the real
 * thing.
 *
 * Drag the dial, scroll over it, or use ← / → to tune.
 */

const lowestFrequency = 88;
const highestFrequency = 108;
const firstStation = 88.5;
const lastStation = 107.5;

/** Within this many MHz of a station, it comes in clearly. */
const lockDistance = 0.12;

/** Past this distance, it's pure static. */
const fadeDistance = 0.35;

function stationFrequency(versionNumber: number) {
    const step = (lastStation - firstStation) / (versions.length - 1);

    return firstStation + (versionNumber - 1) * step;
}

/** The closest station to a frequency, and how far off the dial is from it. */
function nearestStation(frequency: number) {
    let best = versions[0];
    let bestDistance = Infinity;

    for (const version of versions) {
        const distance = Math.abs(stationFrequency(version.number) - frequency);

        if (distance < bestDistance) {
            best = version;
            bestDistance = distance;
        }
    }

    return { version: best, distance: bestDistance };
}

export function Radio() {
    // Start tuned to the newest version's station.
    const [frequency, setFrequency] = useState(stationFrequency(versions.length));
    const [soundOn, setSoundOn] = useState(false);

    // The static's volume control, kept between renders.
    const staticGain = useRef<GainNode | null>(null);

    const { version, distance } = nearestStation(frequency);

    // 0 when locked on, 1 when far from any station.
    const staticLevel = Math.min(1, Math.max(0, (distance - lockDistance) / (fadeDistance - lockDistance)));
    const locked = distance <= lockDistance;

    function tune(nextFrequency: number) {
        setFrequency(Math.min(highestFrequency, Math.max(lowestFrequency, nextFrequency)));
    }

    /**
     * Turn on the speaker static. It's a looping buffer of white noise
     * through a volume control (a gain node). Browsers only allow audio after
     * an interaction, so this is only ever called from a click or key press.
     */
    function startSound() {
        if (staticGain.current) {
            return;
        }

        const context = audioContext();
        const source = context.createBufferSource();
        const gain = context.createGain();

        source.buffer = noiseBuffer(context, 2);
        source.loop = true;
        gain.gain.value = 0;
        source.connect(gain).connect(context.destination);
        source.start();

        staticGain.current = gain;
        setSoundOn(true);
    }

    function stopSound() {
        staticGain.current?.disconnect();
        staticGain.current = null;
        setSoundOn(false);
    }

    // Follow the dial: louder static the further you are from a station.
    // setTargetAtTime glides to the new volume instead of jumping, so
    // turning the dial doesn't crackle.
    useEffect(() => {
        const gain = staticGain.current;

        if (gain) {
            gain.gain.setTargetAtTime(staticLevel * 0.12, gain.context.currentTime, 0.05);
        }
    }, [staticLevel, soundOn]);

    // Stop the sound when leaving the page.
    useEffect(() => () => staticGain.current?.disconnect(), []);

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if ((event.target as HTMLElement).matches('input')) {
                return;
            }

            if (event.key === 'ArrowRight') {
                tune(frequency + 0.1);
            } else if (event.key === 'ArrowLeft') {
                tune(frequency - 0.1);
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    });

    const needlePosition = (frequency - lowestFrequency) / (highestFrequency - lowestFrequency);
    const scaleNumbers = [88, 92, 96, 100, 104, 108];

    return (
        <main className={styles.room}>
            <div className={styles.console}>
                <div className={styles.screen}>
                    {locked && <FittedFrame key={version.number} src={versionUrl(version)} title={version.name} />}
                    <Static level={locked ? 0 : Math.max(staticLevel, 0.35)} />
                </div>

                <div className={styles.stationName} aria-live="polite">
                    {locked ? (
                        <a href={versionUrl(version)}>
                            {frequency.toFixed(1)} FM · v{version.number} {version.name}
                        </a>
                    ) : (
                        `${frequency.toFixed(1)} FM · …`
                    )}
                </div>

                {/* The dial glass: a frequency scale, station ticks, and the needle. */}
                <div className={styles.dial} onWheel={(event) => tune(frequency + (event.deltaY > 0 ? 0.1 : -0.1))}>
                    <div className={styles.scale} aria-hidden="true">
                        {scaleNumbers.map((number) => (
                            <span
                                key={number}
                                style={{
                                    left: `${((number - lowestFrequency) / (highestFrequency - lowestFrequency)) * 100}%`,
                                }}
                            >
                                {number}
                            </span>
                        ))}
                        {versions.map((eachVersion) => (
                            <i
                                key={eachVersion.number}
                                style={{
                                    left: `${((stationFrequency(eachVersion.number) - lowestFrequency) / (highestFrequency - lowestFrequency)) * 100}%`,
                                }}
                            />
                        ))}
                        <div className={styles.needle} style={{ left: `${needlePosition * 100}%` }} />
                    </div>

                    {/*
                     * A real range input stretched invisibly over the dial.
                     * It does the dragging, keyboard, and screen reader work,
                     * while the needle above just draws where it is.
                     */}
                    <input
                        className={styles.tuner}
                        type="range"
                        min={lowestFrequency}
                        max={highestFrequency}
                        step={0.01}
                        value={frequency}
                        onChange={(event) => tune(Number(event.target.value))}
                        onPointerDown={startSound}
                        aria-label="Tuning dial"
                        aria-valuetext={`${frequency.toFixed(1)} FM${locked ? `, v${version.number} ${version.name}` : ', static'}`}
                    />
                </div>

                <div className={styles.knobs}>
                    <button type="button" onClick={soundOn ? stopSound : startSound}>
                        {soundOn ? 'sound: on' : 'sound: off'}
                    </button>
                    <span className={styles.brand}>stephenmatheis · FM</span>
                </div>
            </div>

            <p className={styles.hint}>drag or scroll the dial · ← → to fine-tune</p>
        </main>
    );
}

/**
 * Snowy static over the screen. Its opacity follows the signal: fully
 * visible between stations, gone when locked on.
 */
function Static({ level }: { level: number }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');

        if (!canvas || !context || level === 0) {
            return;
        }

        const image = context.createImageData(canvas.width, canvas.height);
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let frame = 0;

        function paint() {
            for (let index = 0; index < image.data.length; index += 4) {
                const gray = Math.random() * 255;

                image.data[index] = gray;
                image.data[index + 1] = gray;
                image.data[index + 2] = gray;
                image.data[index + 3] = 255;
            }

            context!.putImageData(image, 0, 0);
        }

        function tick() {
            paint();
            frame = requestAnimationFrame(tick);
        }

        if (reduceMotion) {
            paint();
        } else {
            tick();
        }

        return () => cancelAnimationFrame(frame);
    }, [level]);

    return (
        <canvas
            ref={canvasRef}
            className={styles.static}
            width={120}
            height={90}
            style={{ opacity: level }}
            aria-hidden="true"
        />
    );
}
