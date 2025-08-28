'use client';

import { useEffect, useState } from 'react';
import * as motion from 'motion/react-client';
import { useCursor } from '@/providers/cursor-provider';
import { Section } from '@/components/section';
import styles from './version.module.scss';

export function Version() {
    const { setPosition, resetPosition } = useCursor();
    const [now, setNow] = useState<Date>(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Section className={styles.version}>
            <div className={styles.value}>v2.0.35</div>
            <div className={styles.date}>
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
        </Section>
    );
}
