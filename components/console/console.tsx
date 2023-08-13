'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { usePrompts } from '@/contexts/prompts';
import { Indicator } from '@/components/indicator';
import styles from './console.module.scss';

function PromptLink({
    label,
    path,
    index,
    selected,
    setSelected,
    pathname,
    nest,
}) {
    return (
        <Link
            href={path}
            className={[
                styles.prompt,
                ...(nest ? [styles.nest] : []),
                ...(selected === index ? [styles.selected] : []),
            ].join(' ')}
            onMouseEnter={() => setSelected(index)}
        >
            <Indicator label={label} />
            <div
                className={[
                    ...(pathname === path ? [styles.selected] : []),
                    styles.label,
                ].join(' ')}
            >
                {label}
            </div>
        </Link>
    );
}

export function Console() {
    const { prompts, selected, setSelected } = usePrompts();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        function scrollToTop(selected: number) {
            if (prompts[selected].type === 'console') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
            }
        }

        function selectNext(event: KeyboardEvent) {
            if (event.key === 'ArrowDown' && !event.metaKey) {
                event.preventDefault();

                setSelected((prev) => {
                    const selected = prev < prompts.length - 1 ? prev + 1 : 0;

                    scrollToTop(selected);

                    return selected;
                });

                return;
            }

            if (event.key === 'ArrowUp' && !event.metaKey) {
                event.preventDefault();

                setSelected((prev) => {
                    const selected = prev > 0 ? prev - 1 : prompts.length - 1;

                    scrollToTop(selected);

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
        }

        window.addEventListener('keydown', selectNext);

        return () => window.removeEventListener('keydown', selectNext);
    }, [prompts, router, selected, setSelected]);

    return (
        <div className={styles.console}>
            <Link className={styles.name} href={'/'}>
                Stephen Matheis
            </Link>
            <div className={styles.date}>
                {'(C)'} {new Date().getFullYear()}
            </div>
            <div className={styles.prompts}>
                {prompts
                    .filter(({ type }) => type === 'console')
                    .map(({ label, path, nest }, index: number) => {
                        return (
                            <PromptLink
                                key={label}
                                label={label}
                                path={path}
                                index={index}
                                selected={selected}
                                setSelected={setSelected}
                                pathname={pathname}
                                nest={nest}
                            />
                        );
                    })}
            </div>
        </div>
    );
}
