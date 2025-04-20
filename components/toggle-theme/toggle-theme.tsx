'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import classNames from 'classnames';
import styles from './toggle-theme.module.scss';

const options = ['Light', 'Dark', 'System'];

export function ToggleTheme() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <span className={styles.toggle}>
                {options.map((option) => {
                    return <span key={option}>{option}</span>;
                })}
            </span>
        );
    }

    return (
        <span className={styles.toggle}>
            {options.map((option) => {
                const value = option.toLowerCase();

                return (
                    <span
                        key={option}
                        className={classNames({ [styles.selected]: theme === value })}
                        role="button"
                        onClick={() => setTheme(value)}
                    >
                        {option}
                    </span>
                );
            })}
        </span>
    );
}
