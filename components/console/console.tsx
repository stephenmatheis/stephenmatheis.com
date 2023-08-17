'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { usePrompts } from '@/contexts/prompts';
import { Indicator } from '@/components/indicator';
import type { PromptProps } from '@/contexts/prompts/prompts';
import styles from './console.module.scss';

// TODO: Add 'game' path to JS canvas game (something simple, following YT tutorial)
const startMenuPrompts: PromptProps[] = [
    {
        label: 'Posts',
        path: '/posts',
        type: 'console',
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

// TODO: Should routes live in the 'Select', and leave fun stuff like 'Game' in 'Start?'
const selectMenuPrompts: PromptProps[] = [
    {
        label: 'RSS',
        path: '/rss',
        type: 'console',
        newTab: true,
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
    prompts,
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

function choosePrompts(menu: string) {
    switch (menu) {
        case 'Start':
            return startMenuPrompts;
        case 'Select':
            return selectMenuPrompts;
        default:
            return [];
    }
}

export function Console() {
    const pathname = usePathname();
    const { open, setOpen, menu } = usePrompts();
    const promptsRef = useRef<HTMLDivElement>(null);
    const prompts = choosePrompts(menu);
    const pathPrompt = prompts.map(({ path }) => path).indexOf(pathname);
    const [selected, setSelected] = useState(pathPrompt);
    const router = useRouter();

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

        if (!open) {
            setSelected(pathPrompt);
        }

        window.addEventListener('keydown', selectNext);

        return () => window.removeEventListener('keydown', selectNext);
    }, [open, pathPrompt, prompts, router, selected, setOpen, setSelected]);

    useEffect(() => {
        if (menu) {
            setSelected(pathPrompt !== -1 ? pathPrompt : 0);
        }
    }, [menu, pathPrompt]);

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
                                            prompts={prompts}
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
