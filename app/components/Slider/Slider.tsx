'use client';

import { useMemo, useRef } from 'react';
import { colorVars, ColorProps } from '../colors';
import { EventProps } from '../events';
import styles from './Slider.module.scss';

type SliderProps = ColorProps &
    EventProps & {
        label: string;
        value: number;
        min: number;
        max: number;
        step?: number;
        onChange: (value: number) => void;
        orientation?: 'horizontal' | 'vertical';
        className?: string;
    };

function clamp(n: number, min: number, max: number) {
    return Math.min(max, Math.max(min, n));
}

// One tick per step, not a decorative fixed-pixel pattern — the thumb
// should always land exactly on a mark. Some ranges (a large max over a
// small step) pack ticks close together; that's fine, it's honest about
// how many stops the slider actually has.
export function Slider({
    label,
    value,
    min,
    max,
    step = 1,
    onChange,
    orientation = 'horizontal',
    className,
    background,
    foreground,
    accent,
    onMouseEnter,
    onMouseLeave,
    onMouseOver,
    onClick,
}: SliderProps) {
    const trackRef = useRef<HTMLDivElement>(null);
    const percent = ((value - min) / (max - min)) * 100;

    // Positions only depend on the range, not the current value — memoized
    // separately so dragging (which changes percent on every move) doesn't
    // regenerate this array on every frame.
    const tickPositions = useMemo(() => {
        const stepCount = Math.max(1, Math.round((max - min) / step));

        return Array.from({ length: stepCount + 1 }, (_, i) => (i / stepCount) * 100);
    }, [min, max, step]);

    function valueFromPointer(clientX: number, clientY: number) {
        const bounds = trackRef.current!.getBoundingClientRect();
        const ratio =
            orientation === 'horizontal' ? (clientX - bounds.left) / bounds.width : 1 - (clientY - bounds.top) / bounds.height;
        const raw = min + clamp(ratio, 0, 1) * (max - min);

        return Math.round(raw / step) * step;
    }

    function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
        event.currentTarget.setPointerCapture(event.pointerId);
        onChange(clamp(valueFromPointer(event.clientX, event.clientY), min, max));
    }

    function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
        if (event.buttons !== 1) return;
        onChange(clamp(valueFromPointer(event.clientX, event.clientY), min, max));
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
        const forward = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowUp';
        const backward = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowDown';

        if (event.key === forward) onChange(clamp(value + step, min, max));
        else if (event.key === backward) onChange(clamp(value - step, min, max));
        else if (event.key === 'Home') onChange(min);
        else if (event.key === 'End') onChange(max);
        else return;

        event.preventDefault();
    }

    return (
        <div
            className={`${styles.slider} ${styles[orientation]} ${className ?? ''}`}
            style={colorVars({ background, foreground, accent })}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onMouseOver={onMouseOver}
            onClick={onClick}
        >
            <div className={styles.row}>
                <div className={styles.label}>{label}</div>
                <div className={styles.readout}>{value}</div>
            </div>

            <div
                ref={trackRef}
                className={styles.track}
                role="slider"
                tabIndex={0}
                aria-valuenow={value}
                aria-valuemin={min}
                aria-valuemax={max}
                aria-label={label}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onKeyDown={handleKeyDown}
            >
                {tickPositions.map((pos, i) => (
                    <span
                        key={i}
                        className={styles.tick}
                        data-active={pos <= percent + 0.001}
                        style={{ '--pos': `${pos}%` } as React.CSSProperties}
                    />
                ))}
                <span className={styles.handle} style={{ '--percent': `${percent}%` } as React.CSSProperties} />
            </div>
        </div>
    );
}
