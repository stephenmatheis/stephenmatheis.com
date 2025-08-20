'use client';

import Link from 'next/link';
import * as motion from 'motion/react-client';
import { useCursor } from '@/providers/cursor-provider';
import { Section } from '@/components/section';
import work from '@/data/work';
import styles from './work.module.scss';

export function Work() {
    const { setPosition, resetPosition } = useCursor();

    return (
        <Section className={styles.work} heading="Work">
            <div className={styles.list}>
                {work.map(({ name, href, description }) => (
                    <div key={name} className={styles.item}>
                        <motion.div
                            className={styles.href}
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
                            onHoverEnd={() => resetPosition()}
                        >
                            <Link href={href} target="_blank" aria-label={name}>
                                {name}
                            </Link>
                        </motion.div>
                        <div className={styles.description}>{description}</div>
                    </div>
                ))}
            </div>
        </Section>
    );
}
