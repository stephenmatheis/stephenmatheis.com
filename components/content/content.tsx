'use client';

import { Fragment } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import * as motion from 'motion/react-client';
import { useCursor } from '@/providers/cursor-provider';
import { LoadingCanvas } from '@/components/loading-canvas';
import { Footer } from '@/components/footer';
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
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration, delay: d1 + wait }}
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
                            {i < arr.length - 1 && (
                                <motion.span
                                    className={styles.spacer}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration, delay: d2 + wait }}
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
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: 1.3 + wait }}
            >
                [ Status Bar ]{/* <Footer /> */}
            </motion.div>

            {/* Randomized text load  */}
            {/* <LoadingCanvas /> */}
        </main>
    );
}

//  <div className={styles.statusbar}>
//     <div className={styles.block}>
//         <motion.span
//             className={styles.spacer}
//             initial={{ opacity: 0, x: -14 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ ease: 'easeOut', duration: 0.25, delay: 0.1 + 0.75 + wait }}
//             onHoverStart={(event) => {
//                 const rect = (event.target as HTMLElement).querySelector('a')?.getBoundingClientRect();

//                 if (!rect) return;

//                 const { top, left, height, width } = rect;

//                 setPosition((prev) => ({
//                     ...prev,
//                     top,
//                     left,
//                     height,
//                     width,
//                     type: 'path',
//                 }));
//             }}
//             onHoverEnd={() => {
//                 setPosition((prev) => ({
//                     ...prev,
//                     top: 0,
//                     left: 0,
//                     height: 0,
//                     width: 0,
//                     type: 'normal',
//                 }));
//             }}
//         >
//             <Link href="https://github.com/stephenmatheis/stephenmatheis.com/tree/main" target="_blank">
//                 <svg
//                     width="11"
//                     height="17"
//                     viewBox="0 0 11 17"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                 >
//                     <path d="M4 17H1V16H4V17Z" fill="currentColor" />
//                     <path d="M1 16H0V13H1V16Z" fill="currentColor" />
//                     <path d="M5 16H4V13H5V16Z" fill="currentColor" />
//                     <path d="M4 5H3V10H4V11H3V12H4V13H1V12H2V5H1V4H4V5Z" fill="currentColor" />
//                     <path d="M8 10H4V9H8V10Z" fill="currentColor" />
//                     <path d="M10 8H9V9H8V8H7V7H10V8Z" fill="currentColor" />
//                     <path d="M7 7H6V4H7V7Z" fill="currentColor" />
//                     <path d="M11 7H10V4H11V7Z" fill="currentColor" />
//                     <path d="M1 4H0V1H1V4Z" fill="currentColor" />
//                     <path d="M5 4H4V1H5V4Z" fill="currentColor" />
//                     <path d="M10 4H7V3H10V4Z" fill="currentColor" />
//                     <path d="M4 1H1V0H4V1Z" fill="currentColor" />
//                 </svg>
//                 main*
//             </Link>
//         </motion.span>
//     </div>
//     <div className={styles.block}>
//         {[
//             {
//                 label: 'UTF-8',
//                 href: 'https://www.unicode.org/versions/Unicode8.0.0/',
//             },
//             {
//                 label: 'LF',
//                 href: 'https://docs.github.com/en/get-started/git-basics/configuring-git-to-handle-line-endings',
//             },
//             {
//                 label: '¶ Plain Text',
//                 href: 'https://en.wikipedia.org/wiki/Plain_text',
//             },
//         ].map(({ label, href }, i) => {
//             return (
//                 <motion.span
//                     key={label}
//                     initial={{ opacity: 0, x: -14 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ ease: 'easeOut', duration: 0.25, delay: (i + 2) * 0.1 + 0.75 + wait }}
//                     onHoverStart={(event) => {
//                         const rect = (event.target as HTMLElement)
//                             .querySelector('a')
//                             ?.getBoundingClientRect();

//                         if (!rect) return;

//                         const { top, left, height, width } = rect;

//                         setPosition((prev) => ({
//                             ...prev,
//                             top,
//                             left,
//                             height,
//                             width,
//                             type: 'path',
//                         }));
//                     }}
//                     onHoverEnd={() => {
//                         setPosition((prev) => ({
//                             ...prev,
//                             top: 0,
//                             left: 0,
//                             height: 0,
//                             width: 0,
//                             type: 'normal',
//                         }));
//                     }}
//                 >
//                     <Link href={href} target="_blank">
//                         {label}
//                     </Link>
//                 </motion.span>
//             );
//         })}
//     </div>
// </div>
