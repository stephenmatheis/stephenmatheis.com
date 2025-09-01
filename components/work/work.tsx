'use client';

import Link from 'next/link';
import * as motion from 'motion/react-client';
import { useCursor } from '@/providers/cursor-provider';
import work from '@/data/work';
import styles from './work.module.scss';
import { Heading } from '../heading';

export function Work() {
    const { setPosition, resetPosition } = useCursor();

    return (
        <div className={styles.work}>
            <Heading>Work</Heading>
            <div className={styles.list}>
                {work.map(({ name, href }) => (
                    <div key={name} className={styles.item}>
                        <motion.div
                            className={styles.name}
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
                    </div>
                ))}
            </div>
        </div>
    );
}
