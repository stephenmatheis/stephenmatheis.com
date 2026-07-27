'use client';

import { useEffect, useState } from 'react';
import { colorVars, ColorProps } from '../colors';
import { EventProps } from '../events';
import styles from './ColorInput.module.scss';

type ColorInputProps = ColorProps &
    EventProps & {
        label: string;
        value: string;
        onChange: (value: string) => void;
        className?: string;
    };

// Only fires onChange once the text plausibly resolves to a color, so
// typing "#1" doesn't flash the swatch to broken mid-edit. Hex or hsl() —
// no native color-wheel picker, just a live text field and a preview.
function isLikelyColor(text: string) {
    return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(text) || /^hsl\(.+\)$/i.test(text.trim());
}

function Corners() {
    return (
        <>
            <span className={`${styles.corner} ${styles.tl}`} />
            <span className={`${styles.corner} ${styles.tr}`} />
            <span className={`${styles.corner} ${styles.bl}`} />
            <span className={`${styles.corner} ${styles.br}`} />
        </>
    );
}

export function ColorInput({
    label,
    value,
    onChange,
    className,
    background,
    foreground,
    accent,
    onMouseEnter,
    onMouseLeave,
    onMouseOver,
    onClick,
}: ColorInputProps) {
    const [text, setText] = useState(value);

    useEffect(() => setText(value), [value]);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const next = event.target.value;
        setText(next);
        if (isLikelyColor(next)) onChange(next);
    }

    return (
        <div
            className={`${styles.colorInput} ${className ?? ''}`}
            style={colorVars({ background, foreground, accent })}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onMouseOver={onMouseOver}
            onClick={onClick}
        >
            <div className={styles.label}>{label}</div>
            <div className={styles.row}>
                <span className={styles.swatch} style={{ background: value }}>
                    <Corners />
                </span>
                <div className={styles.field}>
                    <Corners />
                    <input
                        type="text"
                        className={styles.input}
                        value={text}
                        onChange={handleChange}
                        spellCheck={false}
                        autoComplete="off"
                    />
                </div>
            </div>
        </div>
    );
}
