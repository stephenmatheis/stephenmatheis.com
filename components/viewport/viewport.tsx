'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import * as motion from 'motion/react-client';
import { useCursor } from '@/providers/cursor';
import { useOverlay } from '@/providers/overlay';
import { Page } from '@/components/page';
import { Details } from '@/components/details';
import { Readout } from '@/components/readout';
import styles from './viewport.module.scss';
import { Fragment } from 'react';

export function Viewport({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { setWidth, setGrow } = useCursor();
    const { overlays } = useOverlay();

    return (
        <div className={styles.viewport}>
            <div className={styles.hud}>
                <Details />
            </div>
            <div className={styles.workspace}>
                <Page>
                    {/* Breadcrumbs */}
                    <nav
                        className={`${styles.breadcrumbs}${
                            overlays.tabs.isHovered || overlays.tabs.isOn ? ` ${styles.on}` : ''
                        }`}
                    >
                        {[
                            { label: 'bio', path: '/' },
                            { label: 'work', path: '/work' },
                            { label: 'blog', path: '/blog' },
                        ].map((crumb, i, arr) => (
                            <Fragment key={i}>
                                <motion.span
                                    onHoverStart={(event) => {
                                        const rect = (event.target as HTMLElement)
                                            .querySelector('a')
                                            ?.getBoundingClientRect();

                                        if (!rect) return;

                                        const { width } = rect;

                                        setWidth(width);
                                        setGrow('link');
                                    }}
                                    onHoverEnd={() => {
                                        setWidth(0);
                                        setGrow('normal');
                                    }}
                                >
                                    <Link href={crumb.path} className={pathname === crumb.path ? styles.pathname : ''}>
                                        {crumb.label}
                                    </Link>
                                </motion.span>
                                {i < arr.length - 1 && <span className={styles.spacer}>{'>'}</span>}
                            </Fragment>
                        ))}
                    </nav>

                    {/* Line Numbers */}
                    <div
                        className={`${styles.linenumbers}${
                            overlays.numbers.isHovered || overlays.numbers.isOn ? ` ${styles.on}` : ''
                        }`}
                    >
                        {Array.from({ length: 58 }, (_, i) => (
                            <div key={i} className={styles.line}>
                                {i + 1}
                            </div>
                        ))}
                    </div>

                    {children}

                    {/* Status Bar */}
                    <div
                        className={`${styles.statusbar}${
                            overlays.statusBar.isHovered || overlays.statusBar.isOn ? ` ${styles.on}` : ''
                        }`}
                    >
                        <div className={styles.block}>
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
                        </div>
                        <div className={styles.block}>
                            <Link href="https://www.unicode.org/versions/Unicode8.0.0/" target="_blank">
                                UTF-8
                            </Link>
                            <Link
                                href="https://docs.github.com/en/get-started/git-basics/configuring-git-to-handle-line-endings"
                                target="_blank"
                            >
                                LF
                            </Link>
                            <Link href="https://en.wikipedia.org/wiki/Plain_text" target="_blank">
                                {'¶'} Plain Text
                            </Link>
                        </div>
                    </div>
                </Page>
            </div>
            <div className={styles.toolbar}>
                <Readout />
            </div>
        </div>
    );
}
