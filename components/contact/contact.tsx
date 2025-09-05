'use client';

import * as motion from 'motion/react-client';
import { useCursor } from '@/providers/cursor-provider';
import { Section } from '@/components/section';
import styles from './contact.module.scss';

export function Contact() {
    const { setPosition, resetPosition } = useCursor();

    return (
        <Section className={styles.contact}>
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
                (912) 492-2522
            </motion.a>
            {/* <motion.a
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
            </motion.a> */}
        </Section>
    );
}
