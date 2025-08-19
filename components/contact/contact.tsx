'use client';

import Link from 'next/link';
import * as motion from 'motion/react-client';
import { usePage } from '@/providers/page-provider';
import { useCursor } from '@/providers/cursor-provider';
import { Section } from '@/components/section';
import contact from '@/data/contact';
import styles from './contact.module.scss';

export function Contact() {
    const { page, direction, canUpdate } = usePage();
    const { setPosition, resetPosition } = useCursor();

    return (
        <Section
            className={styles.contact}
            data-page={page}
            data-can-update={canUpdate}
            data-direction={direction === null ? 'null' : direction}
        >
            <div className={styles.list}>
                {contact.map(({ href, text, title, newTab }) => {
                    return (
                        <motion.div
                            key={href}
                            className={styles.item}
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
                            {newTab ? (
                                <a href={href} target="_blank" title={title}>
                                    {text}
                                </a>
                            ) : (
                                <Link href={href} title={title}>
                                    {text}
                                </Link>
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </Section>
    );
}
