'use client';

import { Fragment } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import * as motion from 'motion/react-client';
import { useCursor } from '@/providers/cursor-provider';
import styles from './content.module.scss';

const wait = 0.7;

export function Content({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { setPosition } = useCursor();

    return (
        <main className={styles.content}>
            {/* Bread Crumbs */}
            <nav className={styles.breadcrumbs}>
                {[
                    { label: 'home', path: '/' },
                    { label: 'about', path: '/about' },
                    { label: 'work', path: '/work' },
                    { label: 'blog', path: '/blog' },
                    { label: 'resume', path: '/stephen-matheis-resume.pdf', newTab: true },
                ].map(({ label, path, newTab }, i, arr) => {
                    const duration = 0;
                    const i2 = (i + 1) * 2 - 1;
                    const i1 = i2 - 1;
                    const d2 = i2 * 0.1;
                    const d1 = i1 * 0.1;

                    return (
                        <Fragment key={i}>
                            <motion.span
                                className={styles.link}
                                // initial={{ opacity: 0 }}
                                // animate={{ opacity: 1 }}
                                // transition={{ duration, delay: d1 + wait }}
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
                                {newTab ? (
                                    <a href={path} className={pathname === path ? styles.pathname : ''} target="_blank">
                                        {label}
                                    </a>
                                ) : (
                                    <Link href={path} className={pathname === path ? styles.pathname : ''}>
                                        {label}
                                    </Link>
                                )}
                            </motion.span>
                        </Fragment>
                    );
                })}
            </nav>

            {/* Line Numbers */}
            <div className={styles.linenumbers}>
                {Array.from({ length: 58 }, (_, i) => {
                    return (
                        <motion.div
                            key={i}
                            className={styles.line}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0, delay: i * 0.015 + wait }}
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
                                    type: 'line',
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
                            {i + 1}
                        </motion.div>
                    );
                })}
            </div>

            {/* Main */}
            {children}

            {/* Status Bar  */}
            <motion.div
                className={styles.statusbar}
                // initial={{ opacity: 0, x: -14 }}
                // animate={{ opacity: 1, x: 0 }}
                // transition={{ duration: 0.25, delay: 1.3 + wait }}
            >
                {/*  */}
            </motion.div>
        </main>
    );
}
