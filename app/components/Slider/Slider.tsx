'use client';

import { useRef } from 'react';
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

// A caret crossing a hairline track, not a thumb riding a filled bar —
// keeps the same tick/rule vocabulary as Frame and Ring instead of
// reaching for the generic rounded-track slider every UI kit ships.
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
                <span className={styles.handle} style={{ '--percent': `${percent}%` } as React.CSSProperties} />
            </div>
        </div>
    );
}
