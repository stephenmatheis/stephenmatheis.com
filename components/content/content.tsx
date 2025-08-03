'use client';

import { Fragment } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import * as motion from 'motion/react-client';
import { useCursor } from '@/providers/cursor';
import { useOverlay } from '@/providers/overlay';
import { Name } from '@/components/name';
import { Experience } from '@/components/experience';
import { Contact } from '@/components/contact';
import { Skills } from '@/components/skills';
import { Work } from '@/components/work';
import styles from './content.module.scss';

export function Content() {
    const pathname = usePathname();
    const { setPosition } = useCursor();
    const { overlays } = useOverlay();

    return (
        <main className={styles.content}>
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

            <Name />
            <Contact />
            <Experience />
            <Skills />
            <Work />

            {/* Status Bar */}
            <div
                className={`${styles.statusbar}${
                    overlays.statusBar.isHovered || overlays.statusBar.isOn ? ` ${styles.on}` : ''
                }`}
            >
                <div className={styles.block}>
                    <motion.span
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
                    ].map(({ label, href }) => {
                        return (
                            <motion.span
                                key={label}
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
                                <Link href={href} target="_blank">
                                    {label}
                                </Link>
                            </motion.span>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}
