'use client';

import { useEffect, useState } from 'react';
import styles from './footer.module.scss';

type FooterProps = {};

export function Footer({}: FooterProps) {
    const [now, setNow] = useState<Date>(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.footer}>
            <span className={styles.version}>v2.0.35</span>
            <span className={styles.date} suppressHydrationWarning>
                {Intl.DateTimeFormat('en-US', {
                    day: '2-digit',
                }).format(now)}
                -
                {Intl.DateTimeFormat('en-US', {
                    month: '2-digit',
                }).format(now)}
                -{now.getFullYear()}
            </span>
            <span className={styles.time} suppressHydrationWarning>
                {Intl.DateTimeFormat('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false,
                }).format(now)}
            </span>
        </div>
    );
}
