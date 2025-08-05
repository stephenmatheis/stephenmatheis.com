'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import * as motion from 'motion/react-client';
import { useCursor } from '@/providers/cursor-provider';
import styles from './content.module.scss';

type Letter = {
    x: number;
    y: number;
    delay: number;
};

const wait = 500;

export function Content({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { setPosition } = useCursor();
    const patternRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => {
            setMounted(true);
        }, wait);
    }, []);

    useEffect(() => {
        if (!patternRef.current) return;

        const cols = 95;
        const rows = 58;
        const width = 7;
        const height = 16.5;

        const canvas = patternRef.current.querySelector('#canvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        const devicePixelRatio = window.devicePixelRatio || 1;

        const canvasWidth = 665;
        const canvasHeight = 957;

        canvas.width = canvasWidth * devicePixelRatio;
        canvas.height = canvasHeight * devicePixelRatio;
        canvas.style.width = `${canvasWidth}px`;
        canvas.style.height = `${canvasHeight}px`;

        if (!ctx) return;

        ctx.scale(devicePixelRatio, devicePixelRatio);

        const letters: Letter[] = [];

        if (!ctx) return;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const letter = {
                    x: col * width,
                    y: row * height,
                    delay: (Math.random() + Math.random()) * 250 + wait,
                };

                letters.push(letter);
            }
        }

        let start: number;

        function animate(timestamp: number) {
            if (!ctx) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (start === undefined) {
                start = timestamp;
            }

            const progress = timestamp - start;

            letters.forEach(({ x, y, delay }, index) => {
                let opacity = progress < delay ? 1 : 0;

                ctx.fillStyle = `rgba(255,255,255,${opacity})`;
                ctx.fillRect(x, y, width, height);
            });

            requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);
    }, []);

    return (
        <main className={styles.content}>
            <nav className={styles.breadcrumbs}>
                {[
                    { label: '/', path: '/' },
                    { label: 'work', path: '/work' },
                    { label: 'blog', path: '/blog' },
                    { label: 'about', path: '/about' },
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
                        {i < arr.length - 1 && <span className={styles.spacer}>{'>'}</span>}
                    </Fragment>
                ))}
            </nav>
            <div className={styles.linenumbers}>
                {Array.from({ length: 58 }, (_, i) => {
                    const delay = Math.random() * 0.5;

                    // console.log(delay);

                    return (
                        <motion.div
                            key={i}
                            className={styles.line}
                            // initial={{ opacity: 0 }}
                            // animate={{ opacity: 1 }}
                            // transition={{ type: 'spring', stiffness: 300, damping: 20, delay }}
                        >
                            {i + 1}
                        </motion.div>
                    );
                })}
            </div>
            {children}
            <div className={styles.statusbar}>
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

            {/* Fade SVG */}
            <div ref={patternRef} className={styles.pattern}>
                <canvas id="canvas" width={665} height={957} />
                {!mounted && <div className={styles.backdrop} />}
            </div>
        </main>
    );
}
