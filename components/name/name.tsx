'use client';

import Link from 'next/link';
import * as motion from 'motion/react-client';
import { useCursor } from '@/providers/cursor';
import { Section } from '@/components/section';
import styles from './name.module.scss';

export function Name() {
    const { setPosition } = useCursor();

    return (
        <Section className={styles.name} heading="Name">
            <div className={styles.text}>
                <div>
                    <span className={styles.primary}>Stephen Matheis</span>{' '}
                    <span className={styles.color}>Software Engineer</span>
                </div>
                <motion.div
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
                            type: 'link',
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
                    <Link className={styles.muted} href="/" title="Go to home">
                        stephenmatheis.com
                    </Link>
                </motion.div>
                <div className={styles.light}>38° N, 77° W</div>
            </div>
        </Section>
    );
}
