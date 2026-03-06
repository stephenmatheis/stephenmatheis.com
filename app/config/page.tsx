'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMode } from '@/providers/ModeProvider';
import { Statusbar } from '@/components/Statusbar';
import { Time } from '@/components/Time';
import { useVimMotions } from '@/hooks/useVimMotions';
import styles from './page.module.scss';

const tools = [
    {
        name: 'Config 1',
        href: '/tools/test',
        content: <div className={styles.editor}>Config 1 content.</div>,
    },
    {
        name: 'Config 2',
        href: '/tools/test',
        content: <div className={styles.editor}>Config 2 content.</div>,
    },
    {
        name: 'Config 3',
        href: '/tools/test',
        content: <div className={styles.editor}>Config 3 content.</div>,
    },
    {
        name: 'Config 4',
        href: '/tools/test',
        content: <div className={styles.editor}>Config 4 content.</div>,
    },
    {
        name: 'Config 5',
        href: '/tools/test',
        content: <div className={styles.editor}>Config 5 content.</div>,
    },
];

function fuzzyRegex(search: string) {
    const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = escaped.split('').join('.*');

    return new RegExp(pattern, 'i');
}

export default function Page() {
    const router = useRouter();
    const { mode } = useMode();
    const [selected, setSelected] = useState<number>(0);
    const [query, setQuery] = useState<string>('');
    const selectedName = tools[0].name;
    const selectedContent = tools[selected].content;
    const re = fuzzyRegex(query);
    const selectedTools = tools.filter(({ name }) => re.test(name));
    const inputRef = useRef<HTMLInputElement>(null);

    useVimMotions({
        max: selectedTools.length - 1,
        selected,
        setSelected,
        onEnter() {
            router.push(selectedTools[selected].href);
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
        <div className={styles.page}>
            <div className={styles.window}>
                <div className={styles.pane}>
                    <div className={styles.name}>Config</div>
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
                        {selectedTools.map(({ name }, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`${styles.option} ${index === selected ? styles.selected : styles.normal}`}
                                >
                                    {name}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className={styles.pane}>
                    <div className={styles.label}>{selectedName}</div>
                    {selectedContent}
                </div>
            </div>
            <Statusbar msg="" outerBar={<>Showing {selectedTools.length} tools</>} innerBar={<Time />} />
        </div>
    );
}
