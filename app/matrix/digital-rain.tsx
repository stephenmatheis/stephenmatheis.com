'use client';

import { useEffect, useRef, useState } from 'react';
import { useIsClient } from '../use-is-client';
import { versions, versionUrl } from '../versions';
import styles from './digital-rain.module.css';

/**
 * The Matrix's digital rain, with versions falling through it. Click one as
 * it goes by to open it.
 *
 * Two layers:
 *
 * 1. The rain, drawn on a canvas. The screen is divided into columns, each
 *    with a "drop" at some height. Every frame draws a random glyph at each
 *    drop and moves it down. Instead of clearing the canvas, each frame first
 *    paints a mostly transparent black rectangle over everything, so older
 *    glyphs fade gradually. That fading is what makes the trails.
 * 2. The versions: ordinary buttons falling with a CSS animation, on top of
 *    the canvas so they can be clicked. Each time one reaches the bottom, it
 *    comes back as a different random version in a new column.
 */

const glyphs = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789~';
const fontSize = 16;
const fallingNameCount = 10;

function randomVersionNumber() {
    return Math.floor(Math.random() * versions.length) + 1;
}

type FallingName = {
    id: number;
    versionNumber: number;

    /** Horizontal position, as a percentage of the screen width. */
    left: number;

    /** Seconds to fall the height of the screen. */
    duration: number;

    /**
     * Seconds before the fall starts. The first batch gets a negative delay,
     * which starts the animation partway through, so the names begin
     * scattered down the screen instead of all dropping from the top at once.
     */
    delay: number;
};

function randomFallingName(id: number, firstBatch = false): FallingName {
    const duration = 7 + Math.random() * 8;

    return {
        id,
        versionNumber: randomVersionNumber(),
        left: 4 + Math.random() * 88,
        duration,
        delay: firstBatch ? -Math.random() * duration : 0,
    };
}

export function DigitalRain() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // The names are random, so they're only rendered in the browser (see
    // useIsClient). The server picks its own random set too, but never shows it.
    const isClient = useIsClient();
    const [names, setNames] = useState(() =>
        Array.from({ length: fallingNameCount }, (_, index) => randomFallingName(index, true)),
    );

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');

        if (!canvas || !context) {
            return;
        }

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // One drop per column, each starting at a random height so they don't
        // all fall in a line. Heights are in rows, not pixels.
        let drops: number[] = [];

        function resize() {
            canvas!.width = window.innerWidth;
            canvas!.height = window.innerHeight;
            drops = Array.from({ length: Math.ceil(canvas!.width / fontSize) }, () => Math.random() * -50);
        }

        resize();
        window.addEventListener('resize', resize);

        let frame = 0;
        let lastPaint = 0;

        // One step of the rain: fade what's there, then draw a glyph at every drop.
        function paint() {
            context!.fillStyle = 'rgb(0 0 0 / 0.08)';
            context!.fillRect(0, 0, canvas!.width, canvas!.height);
            context!.fillStyle = '#00ff41';
            context!.font = `${fontSize}px monospace`;

            drops.forEach((row, column) => {
                const glyph = glyphs[Math.floor(Math.random() * glyphs.length)];

                context!.fillText(glyph, column * fontSize, row * fontSize);

                // Past the bottom, restart at the top now and then, so columns
                // drift out of sync instead of repeating together.
                drops[column] = row * fontSize > canvas!.height && Math.random() > 0.975 ? 0 : row + 1;
            });
        }

        // The animation loop, kept separate from painting so reduced motion
        // can paint without starting it.
        function tick(time: number) {
            frame = requestAnimationFrame(tick);

            // ~20 frames per second: fast enough to feel alive, slow enough to
            // read, and a lot cheaper than drawing at 60.
            if (time - lastPaint < 50) {
                return;
            }

            lastPaint = time;
            paint();
        }

        if (reduceMotion) {
            // One still frame, painted enough times to fill the screen.
            for (let step = 0; step < 60; step++) {
                paint();
            }
        } else {
            frame = requestAnimationFrame(tick);
        }

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('resize', resize);
        };
    }, []);

    // When a name reaches the bottom, send it back up as a different version.
    function respawn(id: number) {
        setNames((current) => current.map((name) => (name.id === id ? randomFallingName(id) : name)));
    }

    return (
        <main className={styles.matrix}>
            <canvas ref={canvasRef} className={styles.rain} aria-hidden="true" />

            {isClient &&
                names.map((name) => {
                    const version = versions[name.versionNumber - 1];

                    return (
                        <a
                            key={`${name.id}-${name.versionNumber}-${name.left}`}
                            className={styles.name}
                            href={versionUrl(version)}
                            style={{
                                left: `${name.left}%`,
                                animationDuration: `${name.duration}s`,
                                animationDelay: `${name.delay}s`,
                            }}
                            onAnimationEnd={() => respawn(name.id)}
                        >
                            v{version.number} {version.name}
                        </a>
                    );
                })}

            <p className={styles.hint}>catch a version</p>
        </main>
    );
}
