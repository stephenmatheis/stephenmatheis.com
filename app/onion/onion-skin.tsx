'use client';

import Image from 'next/image';
import { useState } from 'react';
import { versions, versionShot, versionUrl } from '../versions';
import styles from './onion-skin.module.css';

/**
 * Onion skin: every version's screenshot stacked in one spot, all see-through,
 * so you see all 42 designs at once. Point at a number and that one comes into
 * focus while the rest fade back.
 *
 * The name comes from animation, where artists drew on thin "onion skin" paper
 * to see the frames underneath.
 *
 * The interesting part is the opacity. Give every layer the same opacity and
 * the top few drown out everything else, because each layer covers part of all
 * the ones below it. Instead, layer number `n` (counting from 1 at the bottom)
 * gets opacity `1 / n`:
 *
 *   layer 1: 1      (fully covers the background)
 *   layer 2: 1/2    (half of it, half of layer 1)
 *   layer 3: 1/3    (a third of it, two thirds of the average below)
 *   …
 *
 * Each new layer blends in exactly its fair share, like updating a running
 * average. With 42 layers, every version contributes exactly 1/42 of the
 * final picture, with no favorites.
 */
function averagingOpacity(layerNumber: number) {
    return 1 / layerNumber;
}

export function OnionSkin() {
    // The version currently in focus, or null to show the blend of all of them.
    const [focusedNumber, setFocusedNumber] = useState<number | null>(null);

    const focused = versions.find((version) => version.number === focusedNumber);

    return (
        <main className={styles.onion}>
            <div className={styles.stack}>
                {versions.map((version) => {
                    const isFocused = version.number === focusedNumber;

                    // With something in focus, it goes on top at nearly full
                    // strength, and everything else keeps its faint blend
                    // underneath as a ghost.
                    let opacity = averagingOpacity(version.number);

                    if (focusedNumber !== null) {
                        opacity = isFocused ? 0.92 : averagingOpacity(version.number) * 0.5;
                    }

                    // next/image resizes each screenshot to fit the window and
                    // serves a compressed format, instead of 42 full-size PNGs.
                    // `fill` makes it cover its positioned parent, the stack.
                    return (
                        <Image
                            key={version.number}
                            className={styles.layer}
                            src={versionShot(version)}
                            alt=""
                            fill
                            sizes="(max-width: 1280px) 100vw, 1280px"
                            style={{
                                opacity,
                                zIndex: isFocused ? versions.length + 1 : version.number,
                            }}
                        />
                    );
                })}
            </div>

            <p className={styles.caption}>
                {focused ? (
                    <>
                        v{focused.number} · {focused.name} · {focused.frozen}
                    </>
                ) : (
                    <>all {versions.length} at once</>
                )}
            </p>

            {/*
             * The numbers. Pointing at one (or tabbing to it) focuses that
             * layer. Clicking opens the version. Moving off a number clears
             * the focus and goes back to the blend.
             *
             * Sliding from one number to the next fires "leave" on the first
             * and "enter" on the second in the same frame, so the blend never
             * gets painted in between. No flicker.
             */}
            <nav className={styles.numbers} aria-label="Versions">
                {versions.map((version) => (
                    <a
                        key={version.number}
                        href={versionUrl(version)}
                        onMouseEnter={() => setFocusedNumber(version.number)}
                        onMouseLeave={() => setFocusedNumber(null)}
                        onFocus={() => setFocusedNumber(version.number)}
                        onBlur={() => setFocusedNumber(null)}
                        aria-current={version.number === focusedNumber ? 'true' : undefined}
                    >
                        {version.number}
                    </a>
                ))}
            </nav>
        </main>
    );
}
