'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { playClick } from '../audio';
import { versions, versionShot, versionUrl } from '../versions';
import styles from './stereo-viewer.module.css';

/**
 * The red plastic stereo viewer: hold it to your eyes, pull the lever, and
 * the paper reel inside turns to the next picture.
 *
 * A reel holds seven pictures, so 42 versions make exactly six reels. Each
 * picture has two slightly different images, one per eye, and your brain
 * combines them into one picture with depth. Here the two lenses show the
 * same screenshot, nudged a few pixels apart, which gives a hint of that
 * stereo feeling.
 *
 * Pull the lever (or press → / Space) to advance. After the seventh picture
 * the next reel slides in. ← goes back.
 */

const picturesPerReel = 7;
const reelCount = Math.ceil(versions.length / picturesPerReel);

/** How long the lever stays down, with the lenses dark, while the reel turns. */
const leverMilliseconds = 220;

export function StereoViewer() {
    const [index, setIndex] = useState(0);
    const [leverDown, setLeverDown] = useState(false);

    const version = versions[index];
    const reel = Math.floor(index / picturesPerReel);
    const pictureOnReel = index % picturesPerReel;

    function pull(step: number) {
        if (leverDown) {
            return;
        }

        playClick({ pitch: 1400, volume: 0.35, length: 0.05 });
        setLeverDown(true);

        window.setTimeout(() => {
            setIndex((current) => (current + step + versions.length) % versions.length);
            setLeverDown(false);
            playClick({ pitch: 2400, volume: 0.25, length: 0.03 });
        }, leverMilliseconds);
    }

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'ArrowRight' || event.key === ' ') {
                event.preventDefault();
                pull(1);
            } else if (event.key === 'ArrowLeft') {
                pull(-1);
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    });

    const firstOnReel = reel * picturesPerReel + 1;
    const lastOnReel = Math.min(versions.length, firstOnReel + picturesPerReel - 1);

    return (
        <main className={styles.room}>
            <div className={styles.viewer}>
                <div className={styles.lenses} data-dark={leverDown || undefined}>
                    {/* Two eyes: the same picture, shifted a little in opposite directions. */}
                    {[-5, 5].map((shift) => (
                        <div key={shift} className={styles.lens}>
                            <div className={styles.picture} style={{ transform: `translateX(${shift}px) scale(1.25)` }}>
                                <Image src={versionShot(version)} alt="" fill sizes="300px" />
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    type="button"
                    className={styles.lever}
                    data-down={leverDown || undefined}
                    onClick={() => pull(1)}
                    aria-label="Pull the lever for the next picture"
                />

                <div className={styles.brand}>stephenmatheis.com</div>
            </div>

            <p className={styles.caption}>
                <a href={versionUrl(version)}>
                    v{version.number} · {version.name}
                </a>{' '}
                · picture {pictureOnReel + 1} of {picturesPerReel}
            </p>

            <Reel reel={reel} picture={pictureOnReel} firstNumber={firstOnReel} lastNumber={lastOnReel} />

            <p className={styles.hint}>pull the lever or press → · ← goes back</p>
        </main>
    );
}

/**
 * The paper reel: a white disc with pairs of little picture windows around
 * the edge (one for each eye). It turns one step per picture, and the
 * pair lined up at the top is the one in the viewer.
 */
function Reel({
    reel,
    picture,
    firstNumber,
    lastNumber,
}: {
    reel: number;
    picture: number;
    firstNumber: number;
    lastNumber: number;
}) {
    const degreesPerPicture = 360 / picturesPerReel;

    return (
        <div className={styles.reelWrapper}>
            <svg className={styles.reel} viewBox="-50 -50 100 100" aria-hidden="true">
                <circle r="48" className={styles.reelDisc} />
                <g className={styles.reelTurn} style={{ transform: `rotate(${-picture * degreesPerPicture}deg)` }}>
                    {Array.from({ length: picturesPerReel }, (_, slot) => (
                        <g key={slot} transform={`rotate(${slot * degreesPerPicture})`}>
                            {/* Left-eye window, and its right-eye twin across the disc. */}
                            <rect
                                x="-4"
                                y="-44"
                                width="8"
                                height="10"
                                rx="1"
                                className={slot === picture ? styles.windowCurrent : styles.window}
                            />
                            <rect
                                x="-4"
                                y="34"
                                width="8"
                                height="10"
                                rx="1"
                                className={slot === picture ? styles.windowCurrent : styles.window}
                            />
                        </g>
                    ))}
                </g>
                <circle r="6" className={styles.reelHole} />
            </svg>
            <p className={styles.reelLabel}>
                Reel {reel + 1} of {reelCount}
                <br />v{firstNumber}–v{lastNumber}
            </p>
        </div>
    );
}
