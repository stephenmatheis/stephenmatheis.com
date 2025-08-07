'use client';

import Link from 'next/link';
import * as motion from 'motion/react-client';
import { useCursor } from '@/providers/cursor-provider';
import { Section } from '@/components/section';
import styles from './name.module.scss';

export function Name() {
    const { setPosition } = useCursor();
    return (
        <Section className={styles.name}>
            <motion.span
                className={styles.link}
                // initial={{ opacity: 0, scale: 0.75, x: '-2ch' }}
                // animate={{ opacity: 1, scale: 1, x: '0' }}
                // transition={{ duration, delay: d1 + wait }}
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
                onHoverEnd={() => {
                    setPosition((prev) => ({
                        ...prev,
                        top: 0,
                        left: 0,
                        height: 0,
                        width: 0,
                        type: 'normal',
                    }));
                }}
            >
                <Link className={styles.qr} href="/">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="41"
                        height="41"
                        viewBox="0 0 25 25"
                        shapeRendering="crispEdges"
                    >
                        <path
                            stroke="currentColor"
                            d="M0 0.5h7m4 0h1m2 0h1m1 0h1m1 0h7M0 1.5h1m5 0h1m2 0h3m1 0h4m1 0h1m5 0h1M0 2.5h1m1 0h3m1 0h1m1 0h1m1 0h3m3 0h1m1 0h1m1 0h3m1 0h1M0 3.5h1m1 0h3m1 0h1m1 0h1m2 0h1m1 0h1m4 0h1m1 0h3m1 0h1M0 4.5h1m1 0h3m1 0h1m1 0h3m2 0h1m2 0h1m1 0h1m1 0h3m1 0h1M0 5.5h1m5 0h1m1 0h1m1 0h7m1 0h1m5 0h1M0 6.5h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7M8 7.5h2m1 0h1m4 0h1M0 8.5h1m1 0h5m2 0h1m1 0h1m1 0h3m2 0h5M0 9.5h1m1 0h3m3 0h3m1 0h1m3 0h1m2 0h1m3 0h1M0 10.5h4m1 0h3m2 0h1m2 0h1m1 0h1m1 0h2m1 0h2m1 0h2M1 11.5h1m1 0h2m2 0h1m1 0h1m1 0h1m2 0h7m3 0h1M1 12.5h1m1 0h4m2 0h3m1 0h6m1 0h1m1 0h3M0 13.5h5m4 0h2m1 0h2m2 0h2m1 0h1m1 0h1m1 0h1M0 14.5h1m1 0h1m1 0h3m6 0h4m2 0h3m1 0h2M0 15.5h1m1 0h2m4 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h3m3 0h1M0 16.5h1m1 0h2m2 0h1m1 0h3m1 0h3m1 0h5m1 0h1M8 17.5h1m4 0h1m1 0h2m3 0h2M0 18.5h7m2 0h1m1 0h2m1 0h1m1 0h1m1 0h1m1 0h1m1 0h3M0 19.5h1m5 0h1m1 0h1m1 0h2m2 0h1m1 0h1m3 0h2M0 20.5h1m1 0h3m1 0h1m1 0h1m1 0h2m3 0h6m1 0h3M0 21.5h1m1 0h3m1 0h1m1 0h1m1 0h1m1 0h2m1 0h1m1 0h2m1 0h5M0 22.5h1m1 0h3m1 0h1m1 0h3m2 0h2m2 0h1m3 0h2m1 0h1M0 23.5h1m5 0h1m2 0h2m1 0h2m1 0h7m2 0h1M0 24.5h7m1 0h1m3 0h1m1 0h1m3 0h7"
                        />
                    </svg>
                </Link>
            </motion.span>

            <div className={styles.text}>
                <div className={styles.primary}>Stephen Matheis</div>
                <div className={styles.muted}>Software Engineer</div>
                <div className={styles.light}>38° N, 77° W</div>
            </div>
        </Section>
    );
}
