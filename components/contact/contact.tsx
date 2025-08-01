'use client';

import Link from 'next/link';
import * as motion from 'motion/react-client';
import { useCursor } from '@/providers/cursor';
import { Section } from '@/components/section';
import contact from '@/data/contact';
import styles from './contact.module.scss';

export function Contact() {
    const { setLeft, setWidth, setGrow } = useCursor();

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
                                <Link href={item.href}>{item.user || item.text}</Link>
                            </motion.div>
                        </div>
                    );
                })}
            </div>
        </Section>
    );
}
