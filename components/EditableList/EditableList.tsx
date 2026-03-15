'use client';

import { Dispatch, SetStateAction, useEffect } from 'react';
import { useMode } from '@/providers/ModeProvider';
import styles from './EditableList.module.scss';

type EditableListProps = {
    name?: string;
    selected: number | null;
    items: string[];
    setItems: Dispatch<SetStateAction<string[]>>;
};

export function EditableList({ name, items, setItems, selected }: EditableListProps) {
    const { mode } = useMode();

    useEffect(() => {
        // const storedPros = localStorage.getItem('pros');
        // if (storedPros !== null) {
        //     setItems(JSON.parse(storedPros));
        // }
        // const storedCons = localStorage.getItem('cons');
        // if (storedCons !== null) {
        //     setItems(JSON.parse(storedCons));
        // }
    }, []);

    if (selected === null) {
        return (
            <div className={styles.readonly}>
                {items.map((pro, index) => {
                    const lineNumber = index + 1;

                    return (
                        <div key={index} className={styles.line}>
                            <span className={styles.number}>{lineNumber}</span>{' '}
                            <span className={styles.content}>{pro}</span>
                        </div>
                    );
                })}
            </div>
        );
    }

    return (
        <div className={styles.list}>
            {items.map((pro, index) => {
                const lineNumber = index + 1;
                const isSelected = index === selected;

                return (
                    <div
                        key={index}
                        className={`${styles.line} ${isSelected && mode === 'NORMAL' ? styles.selected : styles.normal}`}
                    >
                        <span className={styles.number}>{lineNumber}</span>{' '}
                        {mode === 'INSERT' && isSelected ? (
                            <>
                                <input
                                    autoFocus
                                    type="text"
                                    value={pro}
                                    onKeyDown={(event) => {
                                        console.log('close and go to next');
                                    }}
                                    onChange={(event) => {
                                        setItems((prev) => {
                                            return prev.map((item, prevIndex) => {
                                                if (prevIndex === index) {
                                                    return event.target.value;
                                                }

                                                return item;
                                            });
                                        });
                                    }}
                                />
                            </>
                        ) : (
                            <span className={mode === 'INSERT' ? styles.muted : styles.content}>{pro}</span>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
