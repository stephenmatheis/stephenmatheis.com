'use client';

import { useMemo, useRef } from 'react';
import { colorVars, ColorProps } from '../colors';
import { EventProps } from '../events';
import styles from './Ring.module.scss';

// Each ring is fully independent now — its own radius, depth, tick count,
// tick weight, ordinal emphasis, spin, and whether it draws a circle
// underneath its ticks. Nothing is derived from position in the array.
export type RingLayer = {
    radius: number;
    z: number;
    opacity: number;
    tickCount: number;
    tickWidth: number;
    emphasizeMajors: boolean;
    spinSeconds: number;
    showCircle: boolean;
};

export const DEFAULT_RING_LAYERS: RingLayer[] = [
    { radius: 46, z: -60, opacity: 0.3, tickCount: 48, tickWidth: 1, emphasizeMajors: true, spinSeconds: 90, showCircle: false },
    { radius: 33, z: -30, opacity: 0.8, tickCount: 48, tickWidth: 1, emphasizeMajors: true, spinSeconds: 0, showCircle: true },
];

const MAJOR_EVERY = 6;

// Rounded to avoid a hydration mismatch: Math.cos/sin can serialize to a
// different last digit between the server and browser JS engines.
function round(n: number) {
    return Math.round(n * 1000) / 1000;
}

// Tick coordinates around a circle in a 0-100 viewBox. Every 6th tick runs
// longer when majors are emphasized, the way a real dial marks 5s and 10s
// differently from the rest.
function ticks(radius: number, minorLength: number, majorLength: number, count: number) {
    return Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
        const isMajor = i % MAJOR_EVERY === 0;
        const length = isMajor ? majorLength : minorLength;
        const x1 = round(50 + Math.cos(angle) * radius);
        const y1 = round(50 + Math.sin(angle) * radius);
        const x2 = round(50 + Math.cos(angle) * (radius - length));
        const y2 = round(50 + Math.sin(angle) * (radius - length));

        return { key: i, x1, y1, x2, y2, isMajor };
    });
}

type RingProps = ColorProps &
    EventProps & {
        label: string;
        value: React.ReactNode;
        className?: string;
        size?: number;
        layers?: RingLayer[];
        tiltStrength?: number;
        fontSize?: number;
        fontWeight?: number;
    };

// Same content contract as Frame (label + live value), a different register
// entirely: a radial gauge built from real layered depth. Every dial in the
// reference material — Oblivion, magic circles, Tron — turned out to share
// one skeleton: concentric rings with radiating ticks.
export function Ring({
    label,
    value,
    className,
    size = 160,
    layers = DEFAULT_RING_LAYERS,
    tiltStrength = 18,
    fontSize,
    fontWeight,
    background,
    foreground,
    accent,
    onMouseEnter,
    onMouseLeave,
    onMouseOver,
    onClick,
}: RingProps) {
    const stageRef = useRef<HTMLDivElement>(null);

    const computed = useMemo(
        () =>
            layers.map((layer) => {
                const minorLength = 3;
                const majorLength = layer.emphasizeMajors ? 6 : 3;

                return {
                    ...layer,
                    minorStroke: 0.4 * layer.tickWidth,
                    majorStroke: (layer.emphasizeMajors ? 0.8 : 0.4) * layer.tickWidth,
                    ticks: ticks(layer.radius, minorLength, majorLength, layer.tickCount),
                };
            }),
        [layers],
    );

    function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
        const bounds = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;

        stageRef.current?.style.setProperty('--ry', `${x * tiltStrength}deg`);
        stageRef.current?.style.setProperty('--rx', `${y * -tiltStrength}deg`);
    }

    function handleMouseLeave(event: React.MouseEvent<HTMLDivElement>) {
        stageRef.current?.style.setProperty('--ry', '0deg');
        stageRef.current?.style.setProperty('--rx', '0deg');
        onMouseLeave?.(event);
    }

    return (
        <div
            className={`${styles.wrap} ${className ?? ''}`}
            style={
                {
                    ...colorVars({ background, foreground, accent }),
                    '--size': `${size}px`,
                    '--value-font-size': fontSize !== undefined ? `${fontSize}px` : undefined,
                    '--value-font-weight': fontWeight,
                } as React.CSSProperties
            }
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={onMouseEnter}
            onMouseOver={onMouseOver}
            onClick={onClick}
        >
            <div className={styles.stage} ref={stageRef}>
                {computed.map((layer, i) => (
                    <svg
                        key={i}
                        className={`${styles.layer} ${layer.spinSeconds > 0 ? styles.spinning : ''}`}
                        viewBox="0 0 100 100"
                        style={
                            {
                                opacity: layer.opacity,
                                '--z': `${layer.z}px`,
                                '--spin-duration': `${layer.spinSeconds}s`,
                            } as React.CSSProperties
                        }
                    >
                        {layer.showCircle && <circle cx="50" cy="50" r={layer.radius} fill="none" strokeWidth={layer.minorStroke} />}
                        {layer.ticks.map((t) => (
                            <line
                                key={t.key}
                                x1={t.x1}
                                y1={t.y1}
                                x2={t.x2}
                                y2={t.y2}
                                strokeWidth={t.isMajor ? layer.majorStroke : layer.minorStroke}
                            />
                        ))}
                    </svg>
                ))}

                <div className={styles.layerNear}>
                    <div className={styles.value}>{value}</div>
                    <div className={styles.label}>{label}</div>
                </div>
            </div>
        </div>
    );
}
