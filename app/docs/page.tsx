'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Statusbar } from '@/components/Statusbar';
import { Time } from '@/components/Time';
import { useVimMotions } from '@/hooks/useVimMotions';
import styles from './page.module.scss';

const tools = [
    {
        name: 'Doc 1',
        href: '/tools/test',
        content: <div className={styles.editor}>Doc 1 content.</div>,
    },
    {
        name: 'Doc 2',
        href: '/tools/test',
        content: <div className={styles.editor}>Doc 2 content.</div>,
    },
    {
        name: 'Doc 3',
        href: '/tools/test',
        content: <div className={styles.editor}>Doc 3 content.</div>,
    },
    {
        name: 'Doc 4',
        href: '/tools/test',
        content: <div className={styles.editor}>Doc 4 content.</div>,
    },
    {
        name: 'Doc 5',
        href: '/tools/test',
        content: <div className={styles.editor}>Doc 5 content.</div>,
    },
    {
        name: 'Doc 6',
        href: '/tools/test',
        content: <div className={styles.editor}>Doc 6 content.</div>,
    },
    {
        name: 'Doc 7',
        href: '/tools/test',
        content: <div className={styles.editor}>Doc 7 content.</div>,
    },
    {
        name: 'Doc 8',
        href: '/tools/test',
        content: <div className={styles.editor}>Doc 8 content.</div>,
    },
    {
        name: 'Doc 9',
        href: '/tools/test',
        content: <div className={styles.editor}>Doc 9 content.</div>,
    },
    {
        name: 'Doc 10',
        href: '/tools/test',
        content: <div className={styles.editor}>Doc 10 content.</div>,
    },
    {
        name: 'Doc 11',
        href: '/tools/test',
        content: <div className={styles.editor}>Doc 11 content.</div>,
    },
    {
        name: 'Doc 12',
        href: '/tools/test',
        content: <div className={styles.editor}>Doc 12 content.</div>,
    },
    {
        name: 'Doc 13',
        href: '/tools/test',
        content: <div className={styles.editor}>Doc 13 content.</div>,
    },
    {
        name: 'Doc 14',
        href: '/tools/test',
        content: <div className={styles.editor}>Doc 14 content.</div>,
    },
    {
        name: 'Doc 15',
        href: '/tools/test',
        content: <div className={styles.editor}>Doc 15 content.</div>,
    },
    {
        name: 'Doc 16',
        href: '/tools/test',
        content: <div className={styles.editor}>Doc 16 content.</div>,
    },
    {
        name: 'Doc 17',
        href: '/tools/test',
        content: <div className={styles.editor}>Doc 17 content.</div>,
    },
    {
        name: 'Doc 18',
        href: '/tools/test',
        content: <div className={styles.editor}>Doc 18 content.</div>,
    },
    {
        name: 'Doc 19',
        href: '/tools/test',
        content: <div className={styles.editor}>Doc 19 content.</div>,
    },
    {
        name: 'Doc 20',
        href: '/tools/test',
        content: <div className={styles.editor}>Doc 20 content.</div>,
    },
];

function fuzzyRegex(search: string) {
    const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = escaped.split('').join('.*');

    return new RegExp(pattern, 'i');
}

export default function Page() {
    const router = useRouter();
    const [selected, setSelected] = useState<number>(0);
    const [query, setQuery] = useState<string>('');
    const selectedDocName = tools[0].name;
    const selectedDocContent = tools[0].content;
    const re = fuzzyRegex(query);
    const selectedDocs = tools.filter(({ name }) => re.test(name));
    const inputRef = useRef<HTMLInputElement>(null);

    useVimMotions({
        max: selectedDocs.length - 1,
        selected,
        setSelected,
        onEnter() {
            router.push(selectedDocs[selected].href);
        },
    });

    return (
        <div className={styles.page}>
            <div className={styles.window}>
                <div className={styles.pane}>
                    <div className={styles.name}>Docs</div>
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
                        {selectedDocs.map(({ name }, index) => {
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
                    <div className={styles.label}>{selectedDocName}</div>
                    {selectedDocContent}
                </div>
            </div>
            <Statusbar fileName="" outerBar={<>Showing {selectedDocs.length} docs</>} innerBar={<Time />} />
        </div>
    );
}
