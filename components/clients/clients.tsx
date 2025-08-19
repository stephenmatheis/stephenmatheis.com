'use client';

import Link from 'next/link';
import * as motion from 'motion/react-client';
import { useCursor } from '@/providers/cursor-provider';
import { Section } from '@/components/section';
import experience from '@/data/clients';
import styles from './clients.module.scss';

export function Clients() {
    const { setPosition, resetPosition } = useCursor();

    return (
        <Section className={styles.clients}>
            <div className={styles.jobs}>
                {experience.map(({ company, stack, roles }, index) => {
                    return (
                        <div key={index} className={styles.job}>
                            <div className={styles.company}>{company}</div>
                            <div className={styles.info}>
                                <div className={styles.roles}>
                                    {roles.map(({ title, start, end, list }, index: number) => {
                                        return (
                                            <div key={index} className={styles.role}>
                                                <div className={styles.details}>
                                                    <span className={styles.title}>{title}</span>{' '}
                                                    <span className={styles.date}>
                                                        {start} – {end}
                                                    </span>
                                                </div>
                                                <div className={styles.list}>
                                                    {list.map((line, i) => {
                                                        return <div key={i}>{line}</div>;
                                                    })}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className={styles.stack}>{stack?.join(', ')}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <motion.div
                className={styles.back}
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
                        type: 'path',
                    }));
                }}
                onHoverEnd={() => resetPosition()}
            >
                <br />
                <Link className={styles.more} href="/work">
                    ← About
                </Link>
            </motion.div>
        </Section>
    );
}
