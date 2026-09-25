'use client';

import { useEffect, useRef, useState } from 'react';
import { playClick, playTones } from '../audio';
import { FittedFrame } from '../fitted-frame';
import { versions, versionUrl, type Version } from '../versions';
import styles from './rotary-phone.module.css';

/**
 * A rotary phone. Dial a version's number, it rings, and the version picks up.
 *
 * On a rotary dial you put your finger in a digit's hole and turn the dial
 * clockwise until your finger hits the metal stop, then let go. The dial
 * spins back on its own, and the phone counts the clicks on the way back:
 * one click for 1, nine for 9, ten for 0. So bigger digits take longer to
 * dial. Here, clicking a hole plays that whole motion.
 *
 * Typing digits works too. After the second digit (or a pause after the
 * first), it places the call.
 */

/**
 * Where each digit's hole sits around the dial, in degrees clockwise from
 * the top. The 1 is at about two o'clock, just before the finger stop, and
 * each digit after it is 30° further counterclockwise, ending with the 0 at
 * about five o'clock. So the 1 turns the least to reach the stop and the 0
 * turns nearly all the way around.
 */
const holes = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((digit, index) => ({
    digit,
    angle: (60 - index * 30 + 360) % 360,
}));

/** The finger stop, at about four o'clock. */
const stopAngle = 125;

/** Pause after one digit before dialing, in case there's no second digit. */
const dialPauseMilliseconds = 1600;

type CallState =
    | { kind: 'idle' }
    | { kind: 'ringing'; version: Version }
    | { kind: 'connected'; version: Version }
    | { kind: 'not-in-service'; number: string };

/**
 * How far the dial turns for a hole: clockwise from the hole's starting
 * angle to the finger stop.
 */
function turnFor(angle: number) {
    return (stopAngle - angle + 360) % 360;
}

export function RotaryPhone() {
    const [dialed, setDialed] = useState('');
    const [rotation, setRotation] = useState(0);
    const [turning, setTurning] = useState(false);
    const [call, setCall] = useState<CallState>({ kind: 'idle' });

    const ringTimeouts = useRef<number[]>([]);

    function dial(digit: string) {
        if (turning || call.kind !== 'idle' || dialed.length >= 2) {
            return;
        }

        const hole = holes.find((each) => each.digit === digit)!;
        const turn = turnFor(hole.angle);
        const clicks = digit === '0' ? 10 : Number(digit);

        setTurning(true);
        setRotation(turn);

        // Wind up, then return: one click per pulse on the way back, spaced
        // out like a real dial's return.
        window.setTimeout(() => {
            setRotation(0);

            for (let click = 0; click < clicks; click++) {
                window.setTimeout(() => playClick({ pitch: 2600, volume: 0.25, length: 0.02 }), click * 60);
            }

            window.setTimeout(
                () => {
                    setTurning(false);
                    setDialed((current) => current + digit);
                },
                clicks * 60 + 120,
            );
        }, 350);
    }

    function hangUp() {
        ringTimeouts.current.forEach((timeout) => window.clearTimeout(timeout));
        ringTimeouts.current = [];
        setCall({ kind: 'idle' });
        setDialed('');
    }

    // Place the call after two digits, or after a pause following one.
    useEffect(() => {
        if (dialed === '' || call.kind !== 'idle' || turning) {
            return;
        }

        function placeCall() {
            const version = versions.find((each) => each.number === Number(dialed));

            if (!version) {
                // The three rising "special information" tones, then the
                // famous recording's message.
                [913.8, 1370.6, 1776.7].forEach((tone, index) =>
                    window.setTimeout(() => playTones([tone], 0.28, 0.06), index * 300),
                );
                setCall({ kind: 'not-in-service', number: dialed });

                return;
            }

            setCall({ kind: 'ringing', version });

            // Two rings: the North American ringback is 440 + 480 Hz together,
            // two seconds on, then a pause.
            playTones([440, 480], 1.6);
            ringTimeouts.current.push(window.setTimeout(() => playTones([440, 480], 1.6), 2600));
            ringTimeouts.current.push(window.setTimeout(() => setCall({ kind: 'connected', version }), 4600));
        }

        const timeout = window.setTimeout(placeCall, dialed.length === 2 ? 300 : dialPauseMilliseconds);

        return () => window.clearTimeout(timeout);
    }, [dialed, call.kind, turning]);

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (/^[0-9]$/.test(event.key)) {
                dial(event.key);
            } else if (event.key === 'Escape' || event.key === 'Backspace') {
                hangUp();
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    });

    // Cancel pending rings when leaving the page.
    useEffect(() => () => ringTimeouts.current.forEach((timeout) => window.clearTimeout(timeout)), []);

    let status = 'Dial a version, 1 to 42.';

    if (dialed && call.kind === 'idle') {
        status = `Dialing ${dialed}…`;
    } else if (call.kind === 'ringing') {
        status = `Ringing v${call.version.number}…`;
    } else if (call.kind === 'connected') {
        status = `Connected to v${call.version.number} · ${call.version.name}`;
    } else if (call.kind === 'not-in-service') {
        status = `We're sorry. The number ${call.number} is not in service. Please check the number and dial again.`;
    }

    return (
        <main className={styles.room}>
            <div className={styles.phone} data-ringing={call.kind === 'ringing' || undefined}>
                <div className={styles.handset} aria-hidden="true" />

                <div className={styles.dialPlate}>
                    {/* The number card in the middle, where your own number would be written. */}
                    <div className={styles.card}>
                        <span>{dialed.padEnd(2, '_')}</span>
                        <small>stephenmatheis</small>
                    </div>

                    {/* The finger wheel: the part with holes that turns. */}
                    <div
                        className={styles.fingerWheel}
                        style={{
                            transform: `rotate(${rotation}deg)`,
                            // Winding up is quick and pushed by a finger; the
                            // spring return is steadier.
                            transitionDuration: rotation === 0 ? '0.5s' : '0.35s',
                        }}
                    >
                        {holes.map((hole) => (
                            <button
                                key={hole.digit}
                                type="button"
                                className={styles.hole}
                                style={{
                                    transform: `rotate(${hole.angle}deg) translateY(-118px) rotate(${-hole.angle}deg)`,
                                }}
                                onClick={() => dial(hole.digit)}
                                aria-label={`Dial ${hole.digit}`}
                            >
                                <span style={{ transform: `rotate(${-rotation}deg)` }}>{hole.digit}</span>
                            </button>
                        ))}
                    </div>

                    <div
                        className={styles.fingerStop}
                        style={{ transform: `rotate(${stopAngle}deg) translateY(-150px)` }}
                        aria-hidden="true"
                    />
                </div>
            </div>

            <p className={styles.status} aria-live="polite">
                {status}
            </p>

            {call.kind !== 'idle' && (
                <button type="button" className={styles.hangUp} onClick={hangUp}>
                    hang up
                </button>
            )}

            {call.kind === 'connected' && (
                <div className={styles.line}>
                    <FittedFrame src={versionUrl(call.version)} title={call.version.name} />
                </div>
            )}
        </main>
    );
}
