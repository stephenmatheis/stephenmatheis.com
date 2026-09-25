'use client';

import Image from 'next/image';
import { useState } from 'react';
import { effort } from '../facts';
import { versions, versionShot, versionUrl, type Version } from '../versions';
import styles from './subway-map.module.css';

/**
 * The history drawn as a subway map.
 *
 * Each framework is a line, running left to right in its own color, like
 * the lines on a transit map. The route through time rides along whichever
 * line each version was built on, and when the framework changes, it curves
 * over to another line. Those stations are drawn as interchanges.
 *
 * The track is SVG. The stations on top are ordinary HTML buttons, placed
 * at the same pixel positions, so they can be focused and clicked like any
 * control. Pick a station to see its version.
 */

type Line = { framework: string; color: string; bullet: string };

// Colors borrowed from the New York subway's palette.
const lines: Line[] = [
    {
        framework: 'Next.js 13',
        color: '#ee352e',
        bullet: '13',
    },
    {
        framework: 'Next.js 14',
        color: '#0039a6',
        bullet: '14',
    },
    {
        framework: 'Next.js 15',
        color: '#00933c',
        bullet: '15',
    },
    {
        framework: 'Next.js 16',
        color: '#ff6319',
        bullet: '16',
    },
    {
        framework: 'React Router 7',
        color: '#b933ad',
        bullet: 'RR',
    },
];

// The map's layout, in pixels.
const left = 150;
const top = 150;
const stationGap = 40;
const lineGap = 56;
const mapWidth = left + (versions.length - 1) * stationGap + 120;
const mapHeight = top + (lines.length - 1) * lineGap + 70;

function lineFor(version: Version) {
    return lines.findIndex((line) => line.framework === version.framework);
}

function positionOf(version: Version) {
    return {
        x: left + (version.number - 1) * stationGap,
        y: top + lineFor(version) * lineGap,
    };
}

/**
 * The track between two neighboring stations. On the same line, it's
 * straight. Changing lines, it's an S-curve: a cubic Bézier whose two control
 * points sit halfway across, one at each station's height, so the track
 * leaves flat and arrives flat.
 */
function trackPath(from: Version, to: Version) {
    const start = positionOf(from);
    const end = positionOf(to);

    if (start.y === end.y) {
        return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
    }

    const middleX = (start.x + end.x) / 2;

    return `M ${start.x} ${start.y} C ${middleX} ${start.y}, ${middleX} ${end.y}, ${end.x} ${end.y}`;
}

export function SubwayMap() {
    const [selected, setSelected] = useState(versions[versions.length - 1]);

    // The first version of each year, for the year markers along the bottom.
    const yearStarts = versions.filter(
        (version, index) => index === 0 || versions[index - 1].frozen.slice(0, 4) !== version.frozen.slice(0, 4),
    );

    return (
        <main className={styles.page}>
            <h1 className={styles.title}>stephenmatheis.com transit map</h1>

            <div className={styles.scroller}>
                <div className={styles.map} style={{ width: mapWidth, height: mapHeight }}>
                    <svg width={mapWidth} height={mapHeight} className={styles.track} aria-hidden="true">
                        {/* Faint guide lines behind everything: one per framework, full width. */}
                        {lines.map((line, index) => (
                            <line
                                key={line.framework}
                                x1={left - 20}
                                x2={mapWidth - 60}
                                y1={top + index * lineGap}
                                y2={top + index * lineGap}
                                stroke={line.color}
                                strokeOpacity={0.12}
                                strokeWidth={8}
                            />
                        ))}

                        {yearStarts.map((version) => (
                            <g key={version.number}>
                                <line
                                    x1={positionOf(version).x - stationGap / 2}
                                    x2={positionOf(version).x - stationGap / 2}
                                    y1={top - 40}
                                    y2={mapHeight - 30}
                                    stroke="#c9c9c9"
                                    strokeDasharray="3 5"
                                />
                                <text
                                    x={positionOf(version).x - stationGap / 2 + 6}
                                    y={mapHeight - 12}
                                    className={styles.year}
                                >
                                    {version.frozen.slice(0, 4)}
                                </text>
                            </g>
                        ))}

                        {/* The route: one segment per step, colored for the line it arrives on. */}
                        {versions.slice(1).map((version, index) => (
                            <path
                                key={version.number}
                                d={trackPath(versions[index], version)}
                                stroke={lines[lineFor(version)].color}
                                strokeWidth={8}
                                strokeLinecap="round"
                                fill="none"
                            />
                        ))}
                    </svg>

                    {/* Line bullets down the left edge, like the colored circles on subway signs. */}
                    {lines.map((line, index) => (
                        <div key={line.framework} className={styles.lineLabel} style={{ top: top + index * lineGap }}>
                            <span className={styles.bullet} style={{ background: line.color }}>
                                {line.bullet}
                            </span>
                            {line.framework}
                        </div>
                    ))}

                    {versions.map((version, index) => {
                        const { x, y } = positionOf(version);
                        const interchange = index > 0 && versions[index - 1].framework !== version.framework;

                        return (
                            <button
                                key={version.number}
                                type="button"
                                className={styles.station}
                                data-interchange={interchange || undefined}
                                data-selected={selected.number === version.number || undefined}
                                style={{ left: x, top: y }}
                                onClick={() => setSelected(version)}
                                aria-label={`v${version.number} ${version.name}, ${version.framework}`}
                            >
                                <span className={styles.stationName}>
                                    v{version.number} {version.name}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <section className={styles.panel} aria-live="polite">
                <div className={styles.shot}>
                    <Image src={versionShot(selected)} alt="" fill sizes="320px" />
                </div>
                <div>
                    <h2>
                        <span className={styles.bullet} style={{ background: lines[lineFor(selected)].color }}>
                            {lines[lineFor(selected)].bullet}
                        </span>{' '}
                        v{selected.number} · {selected.name}
                    </h2>
                    <p>
                        {selected.framework} line · {selected.frozen} · {effort(selected)}
                    </p>
                    <a href={versionUrl(selected)}>Ride to v{selected.number} →</a>
                </div>
            </section>
        </main>
    );
}
