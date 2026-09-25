'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { versions, versionShot, versionUrl, type Version } from '../versions';
import styles from './vending-machine.module.css';

/**
 * A snack vending machine stocked with versions.
 *
 * 42 versions fill a 6 × 7 grid exactly. Each slot has a code, a row letter
 * then a column number, like A1 or F7, and you punch codes in on the keypad
 * (or type them). The version drops into the tray at the bottom, and
 * clicking it there opens it.
 *
 * Prices are commits at a penny each, so the big efforts cost the most.
 */

const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
const columns = 7;

/** Slot code for a version: v1 is A1, v7 is A7, v8 is B1, and so on. */
function slotCode(version: Version) {
    const index = version.number - 1;

    return `${rows[Math.floor(index / columns)]}${(index % columns) + 1}`;
}

/** The version in a slot, or undefined for a code that doesn't exist. */
function versionAt(code: string) {
    const row = rows.indexOf(code[0]);
    const column = Number(code[1]);

    if (row === -1 || column < 1 || column > columns) {
        return undefined;
    }

    return versions[row * columns + column - 1];
}

function price(version: Version) {
    return `$${(version.commits / 100).toFixed(2)}`;
}

/** How long the drop animation takes before the version lands in the tray. */
const dropMilliseconds = 900;

export function VendingMachine() {
    // What's been typed so far: empty, a letter, or a letter and a digit.
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('INSERT CODE');
    const [dropping, setDropping] = useState<Version | null>(null);
    const [inTray, setInTray] = useState<Version | null>(null);

    function press(key: string) {
        if (dropping) {
            return;
        }

        if (key === 'CLR') {
            setCode('');
            setMessage('INSERT CODE');

            return;
        }

        const isLetter = rows.includes(key);

        // A code is a letter first, then a digit. Keys pressed out of order are
        // ignored, the way a real keypad beeps at you.
        if ((code === '' && !isLetter) || (code.length === 1 && isLetter)) {
            return;
        }

        const nextCode = code + key;

        setCode(nextCode);

        if (nextCode.length < 2) {
            setMessage(nextCode + '_');

            return;
        }

        const version = versionAt(nextCode);

        if (!version) {
            setMessage('INVALID');
            setCode('');

            return;
        }

        setMessage(`${nextCode} · ${price(version)}`);
        setDropping(version);
        setInTray(null);
    }

    // Once the drop animation finishes, the version lands in the tray.
    useEffect(() => {
        if (!dropping) {
            return;
        }

        const timeout = window.setTimeout(() => {
            setInTray(dropping);
            setDropping(null);
            setCode('');
            setMessage('ENJOY!');
        }, dropMilliseconds);

        return () => window.clearTimeout(timeout);
    }, [dropping]);

    // Typing works too: letters A–F, digits 1–7, Backspace or Escape to clear.
    // No dependency list, so the listener always calls the latest `press`,
    // which knows what's been typed so far.
    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            const key = event.key.toUpperCase();

            if (rows.includes(key) || /^[1-7]$/.test(key)) {
                press(key);
            } else if (event.key === 'Backspace' || event.key === 'Escape') {
                press('CLR');
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    });

    return (
        <main className={styles.room}>
            <div className={styles.machine}>
                <div className={styles.window}>
                    {versions.map((version) => (
                        <div key={version.number} className={styles.slot}>
                            <div
                                className={styles.product}
                                data-dropping={dropping?.number === version.number || undefined}
                                title={`v${version.number} · ${version.name}`}
                            >
                                <Image src={versionShot(version)} alt="" fill sizes="120px" />
                            </div>
                            <div className={styles.coil} aria-hidden="true" />
                            <div className={styles.tag}>
                                {slotCode(version)} {price(version)}
                            </div>
                        </div>
                    ))}
                </div>

                <aside className={styles.panel}>
                    <div className={styles.display} aria-live="polite">
                        {message}
                    </div>

                    <div className={styles.keypad}>
                        {[...rows, '1', '2', '3', '4', '5', '6', '7', 'CLR'].map((key) => (
                            <button key={key} type="button" onClick={() => press(key)}>
                                {key}
                            </button>
                        ))}
                    </div>

                    <div className={styles.coinSlot} aria-hidden="true" />
                </aside>

                <div className={styles.tray}>
                    {inTray ? (
                        <a href={versionUrl(inTray)} className={styles.trayItem}>
                            v{inTray.number} · {inTray.name} → take it
                        </a>
                    ) : (
                        <span className={styles.trayEmpty}>PUSH</span>
                    )}
                </div>
            </div>
        </main>
    );
}
