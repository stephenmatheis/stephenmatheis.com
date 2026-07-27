'use client';

import { useEffect, useState } from 'react';
import { colorVars, ColorProps } from '../colors';
import { EventProps } from '../events';
import styles from './NumberInput.module.scss';

type NumberInputProps = ColorProps &
    EventProps & {
        label: string;
        value: number;
        onChange: (value: number) => void;
        className?: string;
    };

function isNumeric(text: string) {
    if (text.trim() === '') return false;
    return !Number.isNaN(Number(text));
}

// Text input constrained to numbers, not a native <input type="number"> —
// keeps the browser's spinner chrome out of a system that's trying to stay
// minimal. Same live-but-validated pattern as ColorInput: partial entry
// like "-" or "3." doesn't propagate until it resolves to a real number.
export function NumberInput({
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
}: NumberInputProps) {
    const [text, setText] = useState(String(value));

    useEffect(() => setText(String(value)), [value]);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const next = event.target.value;
        setText(next);
        if (isNumeric(next)) onChange(Number(next));
    }

    return (
        <div
            className={`${styles.numberInput} ${className ?? ''}`}
            style={colorVars({ background, foreground, accent })}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onMouseOver={onMouseOver}
            onClick={onClick}
        >
            <div className={styles.label}>{label}</div>
            <div className={styles.field}>
                <span className={`${styles.corner} ${styles.tl}`} />
                <span className={`${styles.corner} ${styles.tr}`} />
                <span className={`${styles.corner} ${styles.bl}`} />
                <span className={`${styles.corner} ${styles.br}`} />
                <input
                    type="text"
                    inputMode="decimal"
                    className={styles.input}
                    value={text}
                    onChange={handleChange}
                    spellCheck={false}
                    autoComplete="off"
                />
            </div>
        </div>
    );
}
