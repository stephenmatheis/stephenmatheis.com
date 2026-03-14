'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMode } from '@/providers/ModeProvider';
import { Statusbar } from '@/components/Statusbar';
import { Time } from '@/components/Time';
import { useVimMotions } from '@/hooks/useVimMotions';
import styles from './Viewer.module.scss';

type Item = {
    name: string;
    description?: string;
    href: string;
    content: ReactNode | string;
};

type ViewerProps = {
    title: string;
    items: Item[];
};

function fuzzyRegex(search: string) {
    const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = escaped.split('').join('.*');

    return new RegExp(pattern, 'i');
}

export function Viewer({ title, items }: ViewerProps) {
    const router = useRouter();
    const { mode } = useMode();
    const [selected, setSelected] = useState<number>(0);
    const [query, setQuery] = useState<string>('');
    const { name, content } = items[selected];
    const re = fuzzyRegex(query);
    const selectedItems = items.filter(({ name }) => re.test(name));
    const inputRef = useRef<HTMLInputElement>(null);
    const [horizontal, setHorizontal] = useState<number>(0);

    useVimMotions({
        maxHorizontal: 0,
        horizontal,
        setHorizontal,
        max: selectedItems.length - 1,
        selected,
        setSelected,
        onEnter() {
            router.push(selectedItems[selected].href);
        },
    });

    useEffect(() => {
        if (mode === 'INSERT') {
            inputRef.current?.focus();

            return;
        }

        if (mode === 'NORMAL') {
            inputRef.current?.blur();

            return;
        }
    }, [mode]);

    return (
        <div className={styles.viewer}>
            <div className={styles.window}>
                <div className={styles.pane}>
                    <div className={styles.name}>{title || 'Title'}</div>
                    <div className={styles.field}>
                        <svg width="16" height="16" viewBox="0 0 16 16" strokeLinejoin="round">
                            <path
                                d="M5.50001 1.93933L6.03034 2.46966L10.8536 7.29288C11.2441 7.68341 11.2441 8.31657 10.8536 8.7071L6.03034 13.5303L5.50001 14.0607L4.43935 13L4.96968 12.4697L9.43935 7.99999L4.96968 3.53032L4.43935 2.99999L5.50001 1.93933Z"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                fill="currentColor"
                            />
                        </svg>
                        <input
                            ref={inputRef}
                            className={styles.filter}
                            type="text"
                            value={query}
                            onKeyDown={(event) => {
                                if (event.key === 'q') {
                                    event.preventDefault();
                                    event.stopPropagation();
                                }
                            }}
                            onChange={(event) => {
                                setSelected(0);
                                setQuery(event.target.value);
                            }}
                        />
                    </div>
                    <div className={styles.list}>
                        {selectedItems.map(({ name, description }, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`${styles.option} ${index === selected ? styles.selected : styles.normal}`}
                                >
                                    <span className={styles.toolname}>{name}</span>{' '}
                                    {index === selected && <span className={styles.description}>{description}</span>}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className={styles.pane}>
                    <div className={styles.label}>{name}</div>
                    {content}
                </div>
            </div>
            <Statusbar msg="" outerBar="" innerBar={<Time />} />
        </div>
    );
}
