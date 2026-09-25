'use client';

import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { desktopHeight, desktopWidth } from '../fitted-frame';
import { versions, versionShot, versionUrl } from '../versions';
import styles from './photomosaic.module.css';

/**
 * A photomosaic: one version's screenshot, rebuilt out of 2,560 tiny tiles,
 * where every tile is a whole screenshot of some version.
 *
 * How it works:
 *
 * 1. Shrink every screenshot to a tiny thumbnail, and work out its average
 *    color (add up every pixel's red, green, and blue, then divide).
 * 2. Shrink the target screenshot to one pixel per tile (64 × 40). Each of
 *    those pixels is the color that tile should be.
 * 3. For each tile, pick a screenshot whose average color is close to the
 *    color it needs. To avoid huge patches of the same screenshot, it picks
 *    at random among the few closest.
 * 4. Draw the chosen screenshot small, then wash it lightly with the color
 *    it needs, so from a distance the whole thing reads as the target.
 *
 * Point at a tile to see which version it is. Click to visit it.
 */

const columns = 64;
const rows = 40;
const tileWidth = desktopWidth / columns;
const tileHeight = desktopHeight / rows;

/** How many of the closest-colored screenshots each tile chooses from. */
const choices = 4;

/** How strongly each tile is washed with the color it's standing in for. */
const tintStrength = 0.45;

type Rgb = [number, number, number];

function loadImage(src: string) {
    return new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image();

        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = src;
    });
}

/** Draws an image into a small canvas and returns that canvas's pixels. */
function shrink(image: HTMLImageElement, width: number, height: number) {
    const canvas = document.createElement('canvas');

    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d', { willReadFrequently: true })!;

    // High-quality smoothing averages big areas of the image into each small
    // pixel. Without it, shrinking this far just samples a few pixels, and the
    // "average" colors come out noisy.
    context.imageSmoothingQuality = 'high';
    context.drawImage(image, 0, 0, width, height);

    return { canvas, pixels: context.getImageData(0, 0, width, height).data };
}

function averageColor(pixels: Uint8ClampedArray): Rgb {
    let red = 0;
    let green = 0;
    let blue = 0;

    for (let index = 0; index < pixels.length; index += 4) {
        red += pixels[index];
        green += pixels[index + 1];
        blue += pixels[index + 2];
    }

    const count = pixels.length / 4;

    return [red / count, green / count, blue / count];
}

function colorDistance(a: Rgb, b: Rgb) {
    return (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2;
}

export function Photomosaic() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [target, setTarget] = useState(versions.length);
    const [status, setStatus] = useState('Loading 42 screenshots…');
    const [hovered, setHovered] = useState<number | null>(null);

    // Which version each tile ended up using, so hovering can name it.
    const tileVersions = useRef<number[]>([]);

    useEffect(() => {
        let cancelled = false;

        async function build() {
            const images = await Promise.all(versions.map((version) => loadImage(versionShot(version))));
            const targetImage = images[target - 1];

            if (cancelled) {
                return;
            }

            // Step 1: a tiny, ready-to-draw copy of every screenshot, and its
            // average color. Drawing 2,560 small canvases is much faster than
            // shrinking 2,560 full-size screenshots.
            const tiles = images.map((image) => {
                const small = shrink(image, Math.ceil(tileWidth), Math.ceil(tileHeight));

                return { canvas: small.canvas, color: averageColor(small.pixels) };
            });

            // Step 2: the color each tile position needs.
            const needed = shrink(targetImage, columns, rows).pixels;

            const context = canvasRef.current?.getContext('2d');

            if (!context) {
                return;
            }

            tileVersions.current = [];

            for (let row = 0; row < rows; row++) {
                for (let column = 0; column < columns; column++) {
                    const index = (row * columns + column) * 4;
                    const color: Rgb = [needed[index], needed[index + 1], needed[index + 2]];

                    // Step 3: the closest few screenshots, then one of them at random.
                    const closest = tiles
                        .map((tile, tileIndex) => ({ tileIndex, distance: colorDistance(tile.color, color) }))
                        .sort((a, b) => a.distance - b.distance)
                        .slice(0, choices);
                    const chosen = closest[Math.floor(Math.random() * closest.length)].tileIndex;

                    tileVersions.current.push(chosen + 1);

                    // Step 4: draw the tile, then wash it with the needed color.
                    const x = column * tileWidth;
                    const y = row * tileHeight;

                    context.drawImage(tiles[chosen].canvas, x, y, tileWidth, tileHeight);
                    context.fillStyle = `rgb(${color[0]} ${color[1]} ${color[2]} / ${tintStrength})`;
                    context.fillRect(x, y, tileWidth, tileHeight);
                }
            }

            setStatus(`v${target} ${versions[target - 1].name}, made of ${columns * rows} tiles.`);
        }

        build().catch(() => setStatus('Some screenshots failed to load.'));

        return () => {
            cancelled = true;
        };
    }, [target]);

    // Which tile the pointer is over, in board coordinates. Typed as a mouse
    // event because both pointer moves and clicks pass through here, and a
    // pointer event is a kind of mouse event.
    function tileAt(event: MouseEvent<HTMLCanvasElement>) {
        const rect = event.currentTarget.getBoundingClientRect();
        const column = Math.floor(((event.clientX - rect.left) / rect.width) * columns);
        const row = Math.floor(((event.clientY - rect.top) / rect.height) * rows);

        return tileVersions.current[row * columns + column] ?? null;
    }

    const hoveredVersion = hovered === null ? null : versions[hovered - 1];

    return (
        <main className={styles.page}>
            <header className={styles.toolbar}>
                <label>
                    Rebuild{' '}
                    <select value={target} onChange={(event) => setTarget(Number(event.target.value))}>
                        {versions.map((version) => (
                            <option key={version.number} value={version.number}>
                                v{version.number} · {version.name}
                            </option>
                        ))}
                    </select>{' '}
                    out of all 42
                </label>
                <span className={styles.readout} aria-live="polite">
                    {hoveredVersion ? `This tile: v${hoveredVersion.number} ${hoveredVersion.name}` : status}
                </span>
            </header>

            <canvas
                ref={canvasRef}
                className={styles.mosaic}
                width={desktopWidth}
                height={desktopHeight}
                onPointerMove={(event) => setHovered(tileAt(event))}
                onPointerLeave={() => setHovered(null)}
                onClick={(event) => {
                    const number = tileAt(event);

                    if (number !== null) {
                        window.location.assign(versionUrl(versions[number - 1]));
                    }
                }}
                aria-label={status}
            />
        </main>
    );
}
