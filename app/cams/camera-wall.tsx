'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { FittedFrame } from '../fitted-frame';
import { versions, versionShot, versionUrl, type Version } from '../versions';
import styles from './camera-wall.module.css';

/**
 * A security monitor wall: one camera per version.
 *
 * The wall shows screenshots, filtered to look like grainy black-and-white
 * CCTV, because 42 live sites at once would be 42 whole websites loading.
 * Clicking a camera opens its "live feed", which is the real site in an
 * iframe, with the same overlays.
 *
 * The timestamps are a small joke: each camera shows the date its version
 * froze, with today's time of day ticking along, as if every version were
 * still running in its own moment. (They are all still running.)
 */
export function CameraWall() {
    const [clock, setClock] = useState<string | null>(null);
    const [liveVersion, setLiveVersion] = useState<Version | null>(null);

    /**
     * One shared clock for all cameras, ticking once a second. It starts as
     * null and only gets a value in the browser, because the server's time
     * and the visitor's time differ. Rendering a time on the server would
     * make React warn that the page changed when it hydrated.
     */
    useEffect(() => {
        function tick() {
            setClock(new Date().toLocaleTimeString('en-GB', { hour12: false }));
        }

        tick();

        const interval = window.setInterval(tick, 1000);

        return () => window.clearInterval(interval);
    }, []);

    /**
     * The live feed is a native <dialog>. Opening it with showModal() (instead
     * of just rendering it) makes it modal: it sits above everything, the rest
     * of the page can't be clicked or tabbed into, and Escape closes it. The
     * browser does all of that, so none of it has to be written here.
     *
     * showModal() is a method on the element, so the dialog needs a ref, and
     * it's called after React has put the dialog on the page.
     */
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (liveVersion && !dialogRef.current?.open) {
            dialogRef.current?.showModal();
        }
    }, [liveVersion]);

    return (
        <main className={styles.room}>
            <header className={styles.header}>
                <span>SECURITY · {versions.length} FEEDS</span>
                <span>{clock ?? '--:--:--'}</span>
            </header>

            <div className={styles.wall}>
                {versions.map((version) => (
                    <button
                        key={version.number}
                        type="button"
                        className={styles.camera}
                        onClick={() => setLiveVersion(version)}
                        aria-label={`Camera ${version.number}: ${version.name}. Open live feed.`}
                    >
                        {/*
                         * Thumbnails are ~220–300px wide, so next/image serves
                         * small resized copies instead of the 1280px originals.
                         * It also lazy-loads them by default.
                         */}
                        <Image
                            className={styles.feed}
                            src={versionShot(version)}
                            alt=""
                            fill
                            sizes="(max-width: 500px) 100vw, 300px"
                        />
                        <Overlay version={version} clock={clock} />
                    </button>
                ))}
            </div>

            {liveVersion && (
                <dialog
                    ref={dialogRef}
                    className={styles.liveFeed}
                    aria-label={`Live feed: ${liveVersion.name}`}
                    // Fires however the dialog closes: the button, or Escape.
                    onClose={() => setLiveVersion(null)}
                >
                    <div className={styles.liveScreen}>
                        <FittedFrame src={versionUrl(liveVersion)} title={liveVersion.name} />
                        <Overlay version={liveVersion} clock={clock} live />
                    </div>

                    <div className={styles.liveControls}>
                        <button type="button" onClick={() => dialogRef.current?.close()}>
                            ← back to wall (esc)
                        </button>
                        <a href={versionUrl(liveVersion)}>open ↗</a>
                    </div>
                </dialog>
            )}
        </main>
    );
}

/**
 * The text burned into a camera image: camera number, a blinking record dot,
 * the version name, and the timestamp. `pointer-events: none` in the styles
 * lets clicks pass through to the camera underneath.
 */
function Overlay({ version, clock, live = false }: { version: Version; clock: string | null; live?: boolean }) {
    return (
        <div className={styles.overlay} aria-hidden="true">
            <span className={styles.cameraNumber}>CAM {String(version.number).padStart(2, '0')}</span>
            <span className={styles.recording}>{live ? 'LIVE' : 'REC'}</span>
            <span className={styles.cameraName}>{version.name.toUpperCase()}</span>
            <span className={styles.timestamp}>
                {version.frozen} {clock ?? '--:--:--'}
            </span>
        </div>
    );
}
