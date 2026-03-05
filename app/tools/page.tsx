'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Statusbar } from '@/components/Statusbar';
import { Time } from '@/components/Time';
import { useVimMotions } from '@/hooks/useVimMotions';
import styles from './page.module.scss';
import { useMode } from '@/providers/ModeProvider';

const tools = [
    {
        name: 'Tool 1',
        href: '/tools/test',
        content: <div className={styles.editor}>Tool 1 content.</div>,
    },
    {
        name: 'Tool 2',
        href: '/tools/test',
        content: <div className={styles.editor}>Tool 2 content.</div>,
    },
    {
        name: 'Tool 3',
        href: '/tools/test',
        content: <div className={styles.editor}>Tool 3 content.</div>,
    },
    {
        name: 'Tool 4',
        href: '/tools/test',
        content: <div className={styles.editor}>Tool 4 content.</div>,
    },
    {
        name: 'Tool 5',
        href: '/tools/test',
        content: <div className={styles.editor}>Tool 5 content.</div>,
    },
    {
        name: 'Tool 6',
        href: '/tools/test',
        content: <div className={styles.editor}>Tool 6 content.</div>,
    },
    {
        name: 'Tool 7',
        href: '/tools/test',
        content: <div className={styles.editor}>Tool 7 content.</div>,
    },
    {
        name: 'Tool 8',
        href: '/tools/test',
        content: <div className={styles.editor}>Tool 8 content.</div>,
    },
    {
        name: 'Tool 9',
        href: '/tools/test',
        content: <div className={styles.editor}>Tool 9 content.</div>,
    },
    {
        name: 'Tool 10',
        href: '/tools/test',
        content: <div className={styles.editor}>Tool 10 content.</div>,
    },
    {
        name: 'Tool 11',
        href: '/tools/test',
        content: <div className={styles.editor}>Tool 11 content.</div>,
    },
    {
        name: 'Tool 12',
        href: '/tools/test',
        content: <div className={styles.editor}>Tool 12 content.</div>,
    },
    {
        name: 'Tool 13',
        href: '/tools/test',
        content: <div className={styles.editor}>Tool 13 content.</div>,
    },
    {
        name: 'Tool 14',
        href: '/tools/test',
        content: <div className={styles.editor}>Tool 14 content.</div>,
    },
    {
        name: 'Tool 15',
        href: '/tools/test',
        content: <div className={styles.editor}>Tool 15 content.</div>,
    },
    {
        name: 'Tool 16',
        href: '/tools/test',
        content: <div className={styles.editor}>Tool 16 content.</div>,
    },
    {
        name: 'Tool 17',
        href: '/tools/test',
        content: <div className={styles.editor}>Tool 17 content.</div>,
    },
    {
        name: 'Tool 18',
        href: '/tools/test',
        content: <div className={styles.editor}>Tool 18 content.</div>,
    },
    {
        name: 'Tool 19',
        href: '/tools/test',
        content: <div className={styles.editor}>Tool 19 content.</div>,
    },
    {
        name: 'Tool 20',
        href: '/tools/test',
        content: <div className={styles.editor}>Tool 20 content.</div>,
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
    const selectedToolName = tools[0].name;
    const selectedToolContent = tools[selected].content;
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
                    <div className={styles.name}>Tools</div>
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
                    <div className={styles.label}>{selectedToolName}</div>
                    {selectedToolContent}
                </div>
            </div>
            <Statusbar fileName="" outerBar={<>Showing {selectedTools.length} tools</>} innerBar={<Time />} />
        </div>
    );
}
