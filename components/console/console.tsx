'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { usePrompts } from '@/contexts/prompts';
import { Indicator } from '@/components/indicator';
import type { PromptProps } from '@/contexts/prompts/prompts';
import styles from './console.module.scss';

const prompts: PromptProps[] = [
    {
        label: 'Posts',
        path: '/posts',
        type: 'console',
    },
    {
        label: 'RSS',
        path: '/rss',
        type: 'console',
        nest: '/posts',
        newTab: true,
    },
    {
        label: 'Archive',
        path: '/archive',
        type: 'console',
    },
    {
        label: 'Projects',
        path: '/projects',
        type: 'console',
    },
    {
        label: 'About',
        path: '/about',
        type: 'console',
    },
    {
        label: 'Resume',
        path: '/resume.pdf',
        type: 'console',
        newTab: true,
    },
    {
        label: 'Settings',
        path: '/settings',
        type: 'console',
    },
];

function PromptLink({
    label,
    path,
    index,
    selected,
    setSelected,
    pathname,
    nest,
    newTab,
    scrollCtr,
    ...props
}) {
    return (
        <LinkType
            href={path}
            className={[
                styles.prompt,
                ...(nest ? [styles.nest] : []),
                ...(selected === index ? [styles.selected] : []),
            ].join(' ')}
            onMouseEnter={() => setSelected(index)}
            newTab={newTab}
            {...props}
        >
            <Indicator
                label={label}
                selected={selected}
                prompts={prompts}
                scrollCtr={scrollCtr}
            />
            <div
                className={[
                    ...(pathname === path ? [styles.selected] : []),
                    styles.label,
                ].join(' ')}
            >
                {label}
            </div>
        </LinkType>
    );
}

function LinkType({ children, href, newTab, ...props }) {
    return newTab ? (
        <a href={href} target="_blank" {...props}>
            {children}
        </a>
    ) : (
        <Link href={href} {...props}>
            {children}
        </Link>
    );
}

export function Console() {
    // const { prompts, selected, setSelected, open, setOpen } = usePrompts();
    const promptsRef = useRef<HTMLDivElement>(null);
    const { open, setOpen } = usePrompts();
    const [selected, setSelected] = useState(0);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        function selectNext(event: KeyboardEvent) {
            if (!open) {
                return;
            }

            if (event.key === 'ArrowDown' && !event.metaKey) {
                event.preventDefault();

                setSelected((prev) => {
                    const selected = prev < prompts.length - 1 ? prev + 1 : 0;

                    return selected;
                });

                return;
            }

            if (event.key === 'ArrowUp' && !event.metaKey) {
                event.preventDefault();

                setSelected((prev) => {
                    const selected = prev > 0 ? prev - 1 : prompts.length - 1;

                    return selected;
                });

                return;
            }

            if (event.key === 'Enter') {
                event.preventDefault();

                if (!prompts[selected].path) {
                    return;
                }

                if (prompts[selected].newTab) {
                    window.open(prompts[selected].path);
                } else {
                    router.push(prompts[selected].path!);
                }
            }

            if (event.key === ' ' || event.key === 'Escape') {
                event.preventDefault();
                setOpen((prev) => !prev);
            }
        }

        window.addEventListener('keydown', selectNext);

        return () => window.removeEventListener('keydown', selectNext);
    }, [open, router, selected, setOpen, setSelected]);

    return (
        <>
            {/* <div className={styles.menu}>
                Press <span className={styles.keyboard}>Spacebar</span>{' '}
                <span className={styles.touch}>Start</span>
            </div> */}
            {open && (
                <div className={styles.console}>
                    <div className={styles.prompts} ref={promptsRef}>
                        {prompts
                            .filter(({ type }) => type === 'console')
                            .map(
                                (
                                    { label, path, nest, newTab },
                                    index: number
                                ) => {
                                    return (
                                        <PromptLink
                                            key={label}
                                            label={label}
                                            path={path}
                                            index={index}
                                            selected={selected}
                                            setSelected={setSelected}
                                            pathname={pathname}
                                            newTab={newTab}
                                            nest={nest}
                                            scrollCtr={promptsRef}
                                        />
                                    );
                                }
                            )}
                    </div>
                </div>
            )}
        </>
    );
}
