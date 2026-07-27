'use client';

import { useEffect, useState } from 'react';
import styles from './ColorInput.module.scss';

type ColorInputProps = {
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

export function ColorInput({ label, value, onChange, className }: ColorInputProps) {
    const [text, setText] = useState(value);

    useEffect(() => setText(value), [value]);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const next = event.target.value;
        setText(next);
        if (isLikelyColor(next)) onChange(next);
    }

    return (
        <div className={`${styles.colorInput} ${className ?? ''}`}>
            <div className={styles.label}>{label}</div>
            <div className={styles.row}>
                <span className={styles.swatch} style={{ background: value }} />
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
    );
}
