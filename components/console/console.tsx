'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './console.module.scss';

// TODO: Add 'Settings' and 'Resume?'

const prompts = ['Posts', 'Archive', 'About', 'Settings'];

export function Console() {
    const router = useRouter();
    const pathname = usePathname();
    const [selected, setSelected] = useState<number>(0);

    useEffect(() => {
        function selectNext(event: KeyboardEvent) {
            if (event.key === 'ArrowDown') {
                event.preventDefault();

                setSelected((prev) => {
                    if (prev < prompts.length - 1) {
                        return prev + 1;
                    } else {
                        return 0;
                    }
                });

                return;
            }

            if (event.key === 'ArrowUp') {
                event.preventDefault();

                setSelected((prev) => {
                    if (prev > 0) {
                        return prev - 1;
                    } else {
                        return prompts.length - 1;
                    }
                });

                return;
            }

            if (event.key === 'Enter') {
                event.preventDefault();

                router.push(`/${prompts[selected].toLowerCase()}`);
            }
        }

        window.addEventListener('keydown', selectNext);

        return () => window.removeEventListener('keydown', selectNext);
    }, [router, selected]);

    return (
        <div className={styles.console}>
            <div className={styles.name}>Stephen Matheis</div>
            <div className={styles.date}>
                {'(C)'} {new Date().getFullYear()}
            </div>
            <div className={styles.prompts}>
                {prompts.map((label: string, index: number) => {
                    const asPath = label.toLowerCase();

                    return (
                        <Link
                            href={`/${asPath}`}
                            key={label}
                            className={styles.prompt}
                            onMouseEnter={() => setSelected(index)}
                        >
                            <div
                                className={[
                                    ...(selected === index
                                        ? [styles.selected]
                                        : []),
                                    styles.indicator,
                                ].join(' ')}
                            >
                                <svg
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                                </svg>
                            </div>
                            <div
                                className={[
                                    ...(pathname === `/${asPath}`
                                        ? [styles.selected]
                                        : []),
                                    styles.label,
                                ].join(' ')}
                            >
                                {label}
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
