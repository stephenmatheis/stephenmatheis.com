'use client';

import Link from 'next/link';
import * as motion from 'motion/react-client';
import { useCursor } from '@/providers/cursor';
import { Section } from '@/components/section';
import contact from '@/data/contact';
import styles from './contact.module.scss';

export function Contact() {
    const { setPosition } = useCursor();

    return (
        <Section className={styles.contact} heading="Contact">
            <div className={styles.list}>
                {contact.map((item, index) => {
                    return (
                        <div key={index} className={styles.item}>
                            <div className={styles.name}>{item.name}</div>
                            <motion.div
                                className={styles.text}
                                onHoverStart={(event) => {
                                    const rect = (event.target as HTMLElement)
                                        .querySelector('a')
                                        ?.getBoundingClientRect();

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
                                <Link href={item.href}>{item.user || item.text}</Link>
                            </motion.div>
                        </div>
                    );
                })}
            </div>
        </Section>
    );
}
