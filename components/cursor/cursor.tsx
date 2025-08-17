'use client';

import { useRef } from 'react';
import * as motion from 'motion/react-client';
import { useCursor } from '@/providers/cursor-provider';
import styles from './cursor.module.scss';

export function Cursor() {
    const { position } = useCursor();
    const ref = useRef<HTMLDivElement>(null);

    return (
        <>
            <motion.div
                ref={ref}
                className={styles.cursor}
                style={{ x: position.left + position.width / 2, y: position.top + position.height / 2 }}
                variants={{
                    normal: {
                        height: 0,
                        width: 0,
                        opacity: 0,
                    },
                    path: {
                        top: (position.height + 7) / -2,
                        left: (position.width + 14) / -2,
                        height: position.height + 7,
                        width: position.width + 14,
                        opacity: 1,
                    },
                    button: {
                        top: (position.height + 14) / -2,
                        left: (position.width + 14) / -2,
                        height: position.height + 14,
                        width: position.width + 14,
                        opacity: 1,
                    },
                    link: {
                        top: (position.height + 7) / -2,
                        left: (position.width + 14) / -2,
                        height: position.height + 7,
                        width: position.width + 14,
                        opacity: 1,
                    },
                    // line: {
                    //     height: position.height + 4,
                    //     width: 644 + 28 + 42,
                    //     borderRadius: 4,
                    //     top: (position.height + 4) / -2,
                    //     left: -21,
                    //     color: 'var(--accent)',
                    //     transition: { type: 'spring', stiffness: 300, damping: 15 },
                    // },
                    // markup: {
                    //     height: position.height + 4,
                    //     width: position.width + 7,
                    //     borderRadius: 4,
                    //     top: (position.height + 4) / -2,
                    //     left: (position.width + 7) / -2,
                    //     color: 'var(--accent)',
                    //     transition: { type: 'spring', stiffness: 300, damping: 15 },
                    // },
                }}
                initial="normal"
                animate={position.type}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
                {/* top left */}
                <svg
                    className={styles.topleft}
                    width="6"
                    height="6"
                    viewBox="0 0 6 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M0 0H6V2H0V0Z" fill="currentColor" />
                    <path d="M0 0H2V6H0V0Z" fill="currentColor" />
                </svg>

                {/* top right */}
                <svg
                    className={styles.topright}
                    width="6"
                    height="6"
                    viewBox="0 0 6 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M0 0H6V2H0V0Z" fill="currentColor" />
                    <path d="M4 0H6V6H4V0Z" fill="currentColor" />
                </svg>

                {/* bottom left */}
                <svg
                    className={styles.bottomleft}
                    width="6"
                    height="6"
                    viewBox="0 0 6 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M0 4H6V6H0V4Z" fill="currentColor" />
                    <path d="M0 0H2V6H0V0Z" fill="currentColor" />
                </svg>

                {/* bottom right */}
                <svg
                    className={styles.bottomright}
                    width="6"
                    height="6"
                    viewBox="0 0 6 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M0 4H6V6H0V4Z" fill="currentColor" />
                    <path d="M4 0H6V6H4V0Z" fill="currentColor" />
                </svg>
            </motion.div>
        </>
    );
}
