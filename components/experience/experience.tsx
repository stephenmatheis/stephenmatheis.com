'use client';

import Link from 'next/link';
import * as motion from 'motion/react-client';
import { useCursor } from '@/providers/cursor-provider';
import { Section } from '@/components/section';
import experience from '@/data/experience';
import styles from './experience.module.scss';

export function Experience() {
    const { setPosition } = useCursor();

    return (
        <Section className={styles.experience} heading="Experience">
            <div className={styles.jobs}>
                {experience.map(({ company, stack, roles }, index) => {
                    if (company === 'Break') {
                        return (
                            <div key={index} className={styles.job}>
                                Break{' '}
                                {roles.map(({ start, end }, index: number) => {
                                    return (
                                        <span key={index} className={styles.role}>
                                            <span className={styles.date}>
                                                {start}–{end}
                                            </span>
                                        </span>
                                    );
                                })}
                            </div>
                        );
                    }

                    return (
                        <div key={index} className={styles.job}>
                            <div className={styles.company}>{company}</div>
                            <div className={styles.roles}>
                                {roles.map(({ title, start, end }, index: number) => {
                                    return (
                                        <div key={index} className={styles.role}>
                                            <span className={styles.title}>{title}</span>{' '}
                                            <span className={styles.date}>
                                                {start} – {end}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className={styles.stack}>{stack?.join(', ')}</div>
                        </div>
                    );
                })}
            </div>
            <br />

            <motion.span
                className={styles.link}
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
                <br />
                <Link className={styles.more} href="/work">
                    More →
                </Link>
            </motion.span>
        </Section>
    );
}
