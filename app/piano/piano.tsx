'use client';

import Image from 'next/image';
import { useEffect, useState, type CSSProperties } from 'react';
import { audioContext } from '../audio';
import { versions, versionShot, versionUrl } from '../versions';
import styles from './piano.module.css';

/**
 * A piano with 42 keys: one per version, in order, starting from C3.
 *
 * Every key plays its note and puts its version on the screen above, so
 * playing a scale walks through the history and a melody jumps around it.
 *
 * Notes are synthesized: a triangle wave (softer than a square, brighter
 * than a sine) that starts quickly and fades out, which is roughly what a
 * struck string does. Each note's frequency comes from its MIDI number,
 * the standard numbering where 69 is the A above middle C at 440 Hz, and
 * every step of 12 doubles the frequency (one octave).
 *
 * Computer keys play one octave, laid out like a piano: the A S D F row is
 * the white keys, and W E T Y U above it are the black keys. Z and X shift
 * the octave down and up. Enter opens whatever is on screen.
 */

const lowestMidiNote = 48; // C3
const noteNames = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'];

/** Which of the 12 notes in an octave are black keys. */
const blackNotes = new Set([1, 3, 6, 8, 10]);

/** Computer keys → semitones above the current octave's C. */
const keyboardLayout: Record<string, number> = {
    a: 0,
    w: 1,
    s: 2,
    e: 3,
    d: 4,
    f: 5,
    t: 6,
    g: 7,
    y: 8,
    h: 9,
    u: 10,
    j: 11,
    k: 12,
    o: 13,
    l: 14,
    p: 15,
    ';': 16,
};

function frequencyOf(midiNote: number) {
    return 440 * 2 ** ((midiNote - 69) / 12);
}

function noteName(keyIndex: number) {
    const midiNote = lowestMidiNote + keyIndex;
    const octave = Math.floor(midiNote / 12) - 1;

    return `${noteNames[midiNote % 12]}${octave}`;
}

function playNote(keyIndex: number) {
    const context = audioContext();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const now = context.currentTime;

    oscillator.type = 'triangle';
    oscillator.frequency.value = frequencyOf(lowestMidiNote + keyIndex);

    // The envelope: rise to full volume in 10ms (the "strike"), then fade
    // away over a second and a half.
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);

    oscillator.connect(gain).connect(context.destination);
    oscillator.start(now);
    oscillator.stop(now + 1.5);
}

/**
 * The keyboard layout, worked out once when the module loads, since it never
 * changes. White keys sit side by side. Black keys are positioned over the
 * gap between two white keys, so each one needs to know how many white keys
 * come before it.
 *
 * This lives outside the component on purpose. Counting with a variable
 * that changes inside `.map()` during render is something the React Compiler
 * flags, because renders are supposed to be free of that kind of mutation.
 * Out here it's just a one-time calculation.
 */
const keys = (() => {
    let whiteKeysSoFar = 0;

    return versions.map((version, index) => {
        const isBlack = blackNotes.has((lowestMidiNote + index) % 12);
        const whiteIndex = whiteKeysSoFar;

        if (!isBlack) {
            whiteKeysSoFar += 1;
        }

        return { version, index, isBlack, whiteIndex };
    });
})();

const whiteKeyCount = keys.filter((key) => !key.isBlack).length;

export function Piano() {
    const [currentIndex, setCurrentIndex] = useState(versions.length - 1);
    const [pressed, setPressed] = useState<number | null>(null);

    // Which octave the computer keyboard plays: 0 starts at C3.
    const [octave, setOctave] = useState(1);

    const version = versions[currentIndex];

    function press(keyIndex: number) {
        if (keyIndex < 0 || keyIndex >= versions.length) {
            return;
        }

        playNote(keyIndex);
        setCurrentIndex(keyIndex);
        setPressed(keyIndex);
    }

    // Let the pressed key pop back up shortly after.
    useEffect(() => {
        if (pressed === null) {
            return;
        }

        const timeout = window.setTimeout(() => setPressed(null), 160);

        return () => window.clearTimeout(timeout);
    }, [pressed]);

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            // Holding a key down repeats keydown events. A piano doesn't do that.
            if (event.repeat) {
                return;
            }

            const key = event.key.toLowerCase();

            if (key in keyboardLayout) {
                press(octave * 12 + keyboardLayout[key]);
            } else if (key === 'z') {
                setOctave((current) => Math.max(0, current - 1));
            } else if (key === 'x') {
                setOctave((current) => Math.min(2, current + 1));
            } else if (event.key === 'Enter') {
                window.location.assign(versionUrl(version));
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    });

    return (
        <main className={styles.room}>
            <div className={styles.screen}>
                <Image src={versionShot(version)} alt="" fill sizes="(max-width: 900px) 100vw, 900px" />
            </div>

            <p className={styles.label}>
                <a href={versionUrl(version)}>
                    v{version.number} · {version.name}
                </a>{' '}
                <span>{noteName(currentIndex)}</span>
            </p>

            <div className={styles.piano} style={{ '--white-keys': whiteKeyCount } as CSSProperties}>
                {keys.map((key) => (
                    <button
                        key={key.index}
                        type="button"
                        className={key.isBlack ? styles.blackKey : styles.whiteKey}
                        data-pressed={pressed === key.index || undefined}
                        data-current={currentIndex === key.index || undefined}
                        style={
                            key.isBlack
                                ? { left: `calc(10px + ${key.whiteIndex} * (100% - 20px) / var(--white-keys))` }
                                : undefined
                        }
                        onPointerDown={() => press(key.index)}
                        aria-label={`${noteName(key.index)}: v${key.version.number} ${key.version.name}`}
                    >
                        <span>{key.version.number}</span>
                    </button>
                ))}
            </div>

            <p className={styles.hint}>
                click the keys, or play A S D F G H J K (W E T Y U for sharps) · Z / X change octave (now C{octave + 3})
                · Enter opens
            </p>
        </main>
    );
}
