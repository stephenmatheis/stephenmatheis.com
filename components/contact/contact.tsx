'use client';

import * as motion from 'motion/react-client';
import { usePage } from '@/providers/page-provider';
import { useCursor } from '@/providers/cursor-provider';
import { Section } from '@/components/section';
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
            <div className={`${styles.group} ${styles.personal}`}>
                <motion.a
                    href="mailto:stephen@matheis.email"
                    target="_blank"
                    title="My email address"
                    onHoverStart={(event) => {
                        const rect = (event.target as HTMLElement).getBoundingClientRect();

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
                    stephen@matheis.email
                </motion.a>
                <motion.a
                    href="tel:9124922522"
                    target="_blank"
                    title="My phone number"
                    onHoverStart={(event) => {
                        const rect = (event.target as HTMLElement).getBoundingClientRect();

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
                    912.492.2522
                </motion.a>
            </div>
            <div className={`${styles.group} ${styles.sites}`}>
                <motion.a
                    href="https://github.com/stephenmatheis"
                    target="_blank"
                    title="My GitHub profile"
                    onHoverStart={(event) => {
                        const rect = (event.target as HTMLElement).getBoundingClientRect();

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
                    github.com/stephenmatheis
                </motion.a>
                <motion.a
                    href="https://stephenmatheis.com"
                    target="_blank"
                    title="My website"
                    onHoverStart={(event) => {
                        const rect = (event.target as HTMLElement).getBoundingClientRect();

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
                    stephenmatheis.com
                </motion.a>
                <motion.a
                    href="https://nextdotgov.com"
                    target="_blank"
                    title="A Web Consultancy for Government."
                    onHoverStart={(event) => {
                        const rect = (event.target as HTMLElement).getBoundingClientRect();

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
                    nextdotgov.com
                </motion.a>
            </div>
        </Section>
    );
}
