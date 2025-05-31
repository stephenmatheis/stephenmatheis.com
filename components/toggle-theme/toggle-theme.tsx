'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import styles from './toggle-theme.module.scss';

const options = ['Light', 'Dark', 'System'];

export function ToggleTheme() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <span className={styles.toggle}>
            {options.map((option) => {
                const value = option.toLowerCase();

                return (
                    <span
                        key={option}
                        className={mounted && theme === value ? styles.selected : ''}
                        role="button"
                        onClick={() => setTheme(value)}
                        suppressHydrationWarning
                    >
                        {option}
                    </span>
                );
            })}
        </span>
    );
}
