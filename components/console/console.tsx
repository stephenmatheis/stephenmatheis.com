'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { usePrompts } from '@/contexts/prompts';
import styles from './console.module.scss';

export function Console() {
    const { prompts, selected, setSelected } = usePrompts();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (prompts[selected].type === 'console') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }

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

                if (
                    prompts[selected].newTab ||
                    prompts[selected].type === 'external'
                ) {
                    window.open(prompts[selected].path);
                } else {
                    router.push(prompts[selected].path);
                }
            }
        }

        window.addEventListener('keydown', selectNext);

        return () => window.removeEventListener('keydown', selectNext);
    }, [prompts, router, selected, setSelected]);

    return (
        <div className={styles.console}>
            <div className={styles.name}>Stephen Matheis</div>
            <div className={styles.date}>
                {'(C)'} {new Date().getFullYear()}
            </div>
            <div className={styles.prompts}>
                {prompts
                    .filter(({ type }) => type === 'console')
                    .map(({ label, path }, index: number) => {
                        return (
                            <Link
                                href={path}
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
                                        ...(pathname === path
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
