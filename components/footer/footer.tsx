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
                {now.toLocaleString('en-US', {
                    day: '2-digit',
                })}
                .
                {now.toLocaleString('en-US', {
                    month: '2-digit',
                })}
                .{now.getFullYear()}
            </span>
            <span className={styles.time} suppressHydrationWarning>
                {now.toLocaleString('en-US', {
                    hour: '2-digit',
                    hour12: false,
                })}
                .
                {now.toLocaleString('en-US', {
                    minute: '2-digit',
                })}
                .
                {now.toLocaleString('en-US', {
                    second: '2-digit',
                })}
            </span>
        </div>
    );
}
