'use client';

import { Fragment } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import * as motion from 'motion/react-client';
import { useCursor } from '@/providers/cursor-provider';
// import { LoadingCanvas } from '@/components/loading-canvas';
import styles from './content.module.scss';

export function Content({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { setPosition } = useCursor();

    return (
        <main className={styles.content}>
            {/* Bread Crumbs */}
            <nav className={styles.breadcrumbs}>
                {[
                    { label: '/', path: '/' },
                    { label: 'work', path: '/work' },
                    { label: 'blog', path: '/blog' },
                    { label: 'about', path: '/about' },
                ].map((crumb, i, arr) => {
                    const duration = 0.3;
                    const i2 = (i + 1) * 2 - 1;
                    const i1 = i2 - 1;
                    const d2 = i2 * 0.04;
                    const d1 = i1 * 0.04;

                    return (
                        <Fragment key={i}>
                            <motion.span
                                className={styles.link}
                                initial={{ opacity: 0, scale: 1.5 }}
                                // animate={{ opacity: 1, scale: 1 }}
                                // transition={{ duration, delay: d1 }}
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
                                <Link href={crumb.path} className={pathname === crumb.path ? styles.pathname : ''}>
                                    {crumb.label}
                                </Link>
                            </motion.span>
                            {i < arr.length - 1 && (
                                <motion.span
                                    className={styles.spacer}
                                    initial={{ opacity: 0, scale: 1.5 }}
                                    // animate={{ opacity: 1, scale: 1 }}
                                    // transition={{ duration, delay: d2 }}
                                >
                                    {'>'}
                                </motion.span>
                            )}
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
                            initial={{ opacity: 0, scale: 2 }}
                            // animate={{ opacity: 1, scale: 1 }}
                            // transition={{ duration: 0.2, delay: i * 0.015 }}
                        >
                            {i + 1}
                        </motion.div>
                    );
                })}
            </div>
            {children}

            {/* Status Bar  */}
            <div className={styles.statusbar}>
                <div className={styles.block}>
                    <motion.span
                        className={styles.spacer}
                        initial={{ opacity: 0, scale: 2 }}
                        // animate={{ opacity: 1, scale: 1 }}
                        // transition={{ ease: 'easeOut', duration: 0.5, delay: 0.5 }}
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
                        <Link href="https://github.com/stephenmatheis/stephenmatheis.com/tree/main" target="_blank">
                            <svg
                                width="11"
                                height="17"
                                viewBox="0 0 11 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M4 17H1V16H4V17Z" fill="currentColor" />
                                <path d="M1 16H0V13H1V16Z" fill="currentColor" />
                                <path d="M5 16H4V13H5V16Z" fill="currentColor" />
                                <path d="M4 5H3V10H4V11H3V12H4V13H1V12H2V5H1V4H4V5Z" fill="currentColor" />
                                <path d="M8 10H4V9H8V10Z" fill="currentColor" />
                                <path d="M10 8H9V9H8V8H7V7H10V8Z" fill="currentColor" />
                                <path d="M7 7H6V4H7V7Z" fill="currentColor" />
                                <path d="M11 7H10V4H11V7Z" fill="currentColor" />
                                <path d="M1 4H0V1H1V4Z" fill="currentColor" />
                                <path d="M5 4H4V1H5V4Z" fill="currentColor" />
                                <path d="M10 4H7V3H10V4Z" fill="currentColor" />
                                <path d="M4 1H1V0H4V1Z" fill="currentColor" />
                            </svg>
                            main*
                        </Link>
                    </motion.span>
                </div>
                <div className={styles.block}>
                    {[
                        {
                            label: 'UTF-8',
                            href: 'https://www.unicode.org/versions/Unicode8.0.0/',
                        },
                        {
                            label: 'LF',
                            href: 'https://docs.github.com/en/get-started/git-basics/configuring-git-to-handle-line-endings',
                        },
                        {
                            label: '¶ Plain Text',
                            href: 'https://en.wikipedia.org/wiki/Plain_text',
                        },
                    ].map(({ label, href }, i) => {
                        return (
                            <motion.span
                                key={label}
                                initial={{ opacity: 0, scale: 2 }}
                                // animate={{ opacity: 1, scale: 1 }}
                                // transition={{ ease: 'easeOut', duration: 0.5, delay: (i + 2) * 0.5 }}
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
                                <Link href={href} target="_blank">
                                    {label}
                                </Link>
                            </motion.span>
                        );
                    })}
                </div>
            </div>

            {/* DEV: */}
            {/* <LoadingCanvas /> */}
        </main>
    );
}
