'use client';

import Link from 'next/link';
import * as motion from 'motion/react-client';
import { useCursor } from '@/providers/cursor';
import { Section } from '@/components/section';
import styles from './name.module.scss';

export function Name() {
    const { setLeft, setWidth, setGrow } = useCursor();

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

                        const { width, left } = rect;

                        setLeft(left);
                        setWidth(width);
                        setGrow('link');
                    }}
                    onHoverEnd={() => {
                        setLeft(0);
                        setWidth(0);
                        setGrow('normal');
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
