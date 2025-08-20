'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import * as motion from 'motion/react-client';
import { usePage } from '@/providers/page-provider';
import { useCursor } from '@/providers/cursor-provider';
import { Section } from '@/components/section';
import styles from './version.module.scss';
import qr from '@/public/qr.png';

export function Version() {
    const { page } = usePage();
    const { setPosition, resetPosition } = useCursor();
    const [now, setNow] = useState<Date>(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Section className={styles.version} data-page={page}>
            <div className={styles.text}>
                <span className={styles.value}>v2.0.35</span>
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
            <motion.span
                className={styles.code}
                onHoverStart={(event) => {
                    const rect = (event.target as HTMLElement).querySelector('a')?.getBoundingClientRect();

                    if (!rect) return;

                    const { top, left, height, width } = rect;

                    setPosition((prev) => ({
                        ...prev,
                        top,
                        left,
                        height,
                        width,
                        type: 'button',
                    }));
                }}
                onHoverEnd={() => resetPosition()}
            >
                <a className={styles.qr} href="https://nextdotgov.com" target="_blank">
                    <span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 25 25"
                            shapeRendering="crispEdges"
                        >
                            <path
                                stroke="currentColor"
                                d="M0 0.5h7m1 0h1m1 0h1m2 0h1m1 0h2m1 0h7M0 1.5h1m5 0h1m5 0h2m2 0h1m1 0h1m5 0h1M0 2.5h1m1 0h3m1 0h1m2 0h2m4 0h2m1 0h1m1 0h3m1 0h1M0 3.5h1m1 0h3m1 0h1m1 0h2m1 0h1m1 0h4m1 0h1m1 0h3m1 0h1M0 4.5h1m1 0h3m1 0h1m1 0h2m1 0h2m1 0h3m1 0h1m1 0h3m1 0h1M0 5.5h1m5 0h1m1 0h2m2 0h3m1 0h1m1 0h1m5 0h1M0 6.5h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7M8 7.5h1m3 0h1m2 0h1M0 8.5h1m3 0h1m1 0h4m1 0h1m3 0h1m1 0h5m2 0h1M3 9.5h1m4 0h1m1 0h2m1 0h5m2 0h2m1 0h1M2 10.5h1m1 0h1m1 0h2m3 0h1m2 0h3m2 0h4M2 11.5h1m1 0h1m2 0h1m1 0h1m1 0h1m2 0h1m2 0h1m4 0h2M1 12.5h1m1 0h2m1 0h2m1 0h1m1 0h2m2 0h1m1 0h2m2 0h4M0 13.5h1m3 0h1m3 0h1m3 0h1m1 0h3m3 0h1m2 0h1M2 14.5h2m1 0h2m1 0h1m2 0h2m2 0h1m3 0h4M3 15.5h1m1 0h1m4 0h3m1 0h2m3 0h2m1 0h2M0 16.5h2m1 0h2m1 0h1m1 0h1m1 0h3m3 0h7M8 17.5h1m1 0h2m1 0h1m2 0h1m3 0h1M0 18.5h7m1 0h2m1 0h3m2 0h1m1 0h1m1 0h1M0 19.5h1m5 0h1m3 0h1m1 0h1m1 0h1m1 0h1m3 0h5M0 20.5h1m1 0h3m1 0h1m1 0h1m2 0h2m1 0h1m1 0h7M0 21.5h1m1 0h3m1 0h1m2 0h1m1 0h1m2 0h1m2 0h3m2 0h3M0 22.5h1m1 0h3m1 0h1m4 0h5m2 0h1m2 0h1m1 0h1M0 23.5h1m5 0h1m8 0h1m1 0h1m1 0h5M0 24.5h7m1 0h3m1 0h1m2 0h1m2 0h1m3 0h3"
                            />
                        </svg>
                    </span>
                </a>
            </motion.span>
        </Section>
    );
}
