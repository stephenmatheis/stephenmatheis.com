'use client';

import { useRef, useState } from 'react';
import styles from './NewListScreen.module.scss';
import { useRouter } from 'next/navigation';

type List = {
    question: string;
    list: string[];
};

type ListPair = {
    one: List;
    two: List;
};

export function NewListScreen() {
    const router = useRouter();
    const [one, setOne] = useState<string>('');
    const [two, setTwo] = useState<string>('');
    const oneRef = useRef<HTMLInputElement>(null);
    const twoRef = useRef<HTMLInputElement>(null);

    function create() {
        let lists: ListPair[] = [];
        let id: number = 1;

        const listsAutoCounter = localStorage.getItem('lists-auto-counter');
        const storedLists = localStorage.getItem('lists');

        if (!listsAutoCounter) {
            console.log('first row. id: 1');
        } else {
            const counter = parseInt(listsAutoCounter);
            id = counter + 1;
            console.log('increment counter.', 'next id:', id);
        }

        if (!storedLists) {
            console.log('no lists. start fresh.');
        } else {
            lists = JSON.parse(storedLists);
            console.log('load:', lists);
        }

        const newList = {
            id,
            one: {
                question: one,
                list: [],
            },
            two: {
                question: two,
                list: [],
            },
        };

        lists.push(newList);

        console.log('save:', lists);

        localStorage.setItem('lists-auto-counter', id.toString());
        localStorage.setItem('lists', JSON.stringify(lists));

        router.push(`/lists/${id}`);
    }

    return (
        <div className={styles.newlistscreen}>
            <div className={styles.pane}>
                <div className={styles.label}>New</div>
                <div className={styles.content}>
                    <div className={styles.name}>First question</div>
                    <div className={styles.field}>
                        <svg width="16" height="16" viewBox="0 0 16 16" strokeLinejoin="round">
                            {one ? (
                                <path
                                    d="M15.5607 3.99999L15.0303 4.53032L6.23744 13.3232C5.55403 14.0066 4.44599 14.0066 3.76257 13.3232L4.2929 12.7929L3.76257 13.3232L0.969676 10.5303L0.439346 9.99999L1.50001 8.93933L2.03034 9.46966L4.82323 12.2626C4.92086 12.3602 5.07915 12.3602 5.17678 12.2626L13.9697 3.46966L14.5 2.93933L15.5607 3.99999Z"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    fill="currentColor"
                                />
                            ) : (
                                <path
                                    d="M5.50001 1.93933L6.03034 2.46966L10.8536 7.29288C11.2441 7.68341 11.2441 8.31657 10.8536 8.7071L6.03034 13.5303L5.50001 14.0607L4.43935 13L4.96968 12.4697L9.43935 7.99999L4.96968 3.53032L4.43935 2.99999L5.50001 1.93933Z"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    fill="currentColor"
                                />
                            )}
                        </svg>
                        <input
                            ref={oneRef}
                            autoFocus
                            type="text"
                            placeholder="Ex: What are the pros?"
                            value={one}
                            onChange={(event) => setOne(event.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();

                                    if (two && (event.target as HTMLInputElement).value) {
                                        create();

                                        return;
                                    } else {
                                        twoRef.current?.focus();
                                    }
                                }
                            }}
                        />
                    </div>
                    <div className={styles.name}>Second question</div>
                    <div className={styles.field}>
                        <svg width="16" height="16" viewBox="0 0 16 16" strokeLinejoin="round">
                            {two ? (
                                <path
                                    d="M15.5607 3.99999L15.0303 4.53032L6.23744 13.3232C5.55403 14.0066 4.44599 14.0066 3.76257 13.3232L4.2929 12.7929L3.76257 13.3232L0.969676 10.5303L0.439346 9.99999L1.50001 8.93933L2.03034 9.46966L4.82323 12.2626C4.92086 12.3602 5.07915 12.3602 5.17678 12.2626L13.9697 3.46966L14.5 2.93933L15.5607 3.99999Z"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    fill="currentColor"
                                />
                            ) : (
                                <path
                                    d="M5.50001 1.93933L6.03034 2.46966L10.8536 7.29288C11.2441 7.68341 11.2441 8.31657 10.8536 8.7071L6.03034 13.5303L5.50001 14.0607L4.43935 13L4.96968 12.4697L9.43935 7.99999L4.96968 3.53032L4.43935 2.99999L5.50001 1.93933Z"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    fill="currentColor"
                                />
                            )}
                        </svg>
                        <input
                            ref={twoRef}
                            type="text"
                            placeholder="Ex: What are the cons?"
                            value={two}
                            onChange={(event) => setTwo(event.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();

                                    if (one && (event.target as HTMLInputElement).value) {
                                        create();

                                        return;
                                    } else {
                                        oneRef.current?.focus();
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
                <div className={styles.buttons}>
                    <button>
                        enter <span>{one !== '' && two !== '' ? 'create' : 'next'}</span>
                    </button>
                    <button>
                        esc <span>cancel</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
