'use client';

import { Statusbar } from '@/components/Statusbar';
import styles from './page.module.scss';
import { useState } from 'react';

const tools = [
    {
        name: 'Tool 1',
        content: <div className={styles.editor}>Tool 1 content.</div>,
    },
    {
        name: 'Tool 2',
        content: <div className={styles.editor}>Tool 1 content.</div>,
    },
    {
        name: 'Tool 3',
        content: <div className={styles.editor}>Tool 1 content.</div>,
    },
    {
        name: 'Tool 4',
        content: <div className={styles.editor}>Tool 1 content.</div>,
    },
    {
        name: 'Tool 5',
        content: <div className={styles.editor}>Tool 1 content.</div>,
    },
    {
        name: 'Tool 6',
        content: <div className={styles.editor}>Tool 1 content.</div>,
    },
    {
        name: 'Tool 7',
        content: <div className={styles.editor}>Tool 1 content.</div>,
    },
    {
        name: 'Tool 8',
        content: <div className={styles.editor}>Tool 1 content.</div>,
    },
    {
        name: 'Tool 9',
        content: <div className={styles.editor}>Tool 1 content.</div>,
    },
    {
        name: 'Tool 10',
        content: <div className={styles.editor}>Tool 1 content.</div>,
    },
    {
        name: 'Tool 11',
        content: <div className={styles.editor}>Tool 1 content.</div>,
    },
    {
        name: 'Tool 12',
        content: <div className={styles.editor}>Tool 1 content.</div>,
    },
    {
        name: 'Tool 13',
        content: <div className={styles.editor}>Tool 1 content.</div>,
    },
    {
        name: 'Tool 14',
        content: <div className={styles.editor}>Tool 1 content.</div>,
    },
    {
        name: 'Tool 15',
        content: <div className={styles.editor}>Tool 1 content.</div>,
    },
    {
        name: 'Tool 16',
        content: <div className={styles.editor}>Tool 1 content.</div>,
    },
    {
        name: 'Tool 17',
        content: <div className={styles.editor}>Tool 1 content.</div>,
    },
    {
        name: 'Tool 18',
        content: <div className={styles.editor}>Tool 1 content.</div>,
    },
    {
        name: 'Tool 19',
        content: <div className={styles.editor}>Tool 1 content.</div>,
    },
    {
        name: 'Tool 20',
        content: <div className={styles.editor}>Tool 1 content.</div>,
    },
];

function fuzzyRegex(search: string) {
    const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = escaped.split('').join('.*');

    return new RegExp(pattern, 'i');
}

export default function Page() {
    const [selected, setSelected] = useState<number>(0);
    const [query, setQuery] = useState<string>('');
    const selectedToolName = tools[0].name;
    const selectedToolContent = tools[0].content;
    const re = fuzzyRegex(query);
    const selectedTools = tools.filter(({ name }) => re.test(name));

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
                            className={styles.filter}
                            type="text"
                            value={query}
                            onChange={(event) => {
                                setQuery(event.target.value);
                            }}
                            autoFocus
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
            <Statusbar />
        </div>
    );
}
