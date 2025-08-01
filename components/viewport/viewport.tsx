'use client';

import { Fragment, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import * as motion from 'motion/react-client';
import { useCursor } from '@/providers/cursor';
import { useOverlay } from '@/providers/overlay';
import { Page } from '@/components/page';
import { Details } from '@/components/details';
import { Readout } from '@/components/readout';
import styles from './viewport.module.scss';

export function Viewport({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { setLeft, setWidth, setGrow } = useCursor();
    const { overlays } = useOverlay();
    const hudRef = useRef<HTMLDivElement>(null);
    const hudTabRef = useRef<HTMLDivElement>(null);
    const toolbarRef = useRef<HTMLDivElement>(null);
    const toolbarTabRef = useRef<HTMLDivElement>(null);

    return (
        <div className={styles.viewport}>
            <div ref={hudRef} className={styles.hud}>
                <Details />
                <motion.div
                    ref={hudTabRef}
                    className={styles.pulltab}
                    onHoverStart={() => {
                        setGrow('tab');
                    }}
                    onHoverEnd={() => {
                        setGrow('normal');
                    }}
                    onPan={(event, info) => {
                        setGrow('moving');

                        if (!hudRef.current) return;

                        const { height } = hudRef.current.getBoundingClientRect();
                        const newHeight = height + info.delta.y;

                        hudRef.current.style.height = `${newHeight > 16.5 ? newHeight : 16.5}px`;
                    }}
                    onPanEnd={() => {
                        setGrow('normal');
                    }}
                    whileHover={{
                        boxShadow: '0px 0px 0px 1px var(--lightest)',
                        transition: { type: 'spring', stiffness: 300, damping: 15 },
                    }}
                />
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
                            <motion.span
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
                                <Link
                                    href="https://github.com/stephenmatheis/stephenmatheis.com/tree/main"
                                    target="_blank"
                                >
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
                                        <Link href={href} target="_blank">
                                            {label}
                                        </Link>
                                    </motion.span>
                                );
                            })}
                        </div>
                    </div>
                </Page>
            </div>
            <div ref={toolbarRef} className={styles.toolbar}>
                <motion.div
                    ref={toolbarTabRef}
                    className={styles.pulltab}
                    onHoverStart={() => {
                        setGrow('tab');
                    }}
                    onHoverEnd={() => {
                        setGrow('normal');
                    }}
                    onPan={(event, info) => {
                        console.log(info.delta.y);

                        setGrow('moving');

                        if (!toolbarRef.current) return;

                        const { height } = toolbarRef.current.getBoundingClientRect();
                        const newHeight = height - info.delta.y;

                        toolbarRef.current.style.height = `${newHeight > 16.5 ? newHeight : 16.5}px`;
                    }}
                    onPanEnd={(event, info) => {
                        setGrow('normal');
                    }}
                    whileHover={{
                        boxShadow: '0px 0px 0px 1px var(--lightest)',
                        transition: { type: 'spring', stiffness: 300, damping: 15 },
                    }}
                />
                <Readout />
            </div>
        </div>
    );
}
