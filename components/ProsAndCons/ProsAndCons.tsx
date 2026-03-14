'use client';

import { useEffect, useState } from 'react';
import { Statusbar } from '@/components/Statusbar';
import { useMode } from '@/providers/ModeProvider';
import { Time } from '@/components/Time';
import { useVimMotions } from '@/hooks/useVimMotions';
import styles from './ProsAndCons.module.scss';

export function ProsAndCons() {
    const { mode } = useMode();
    const [pros, setPros] = useState<string[]>(['One', 'Two', 'Three', 'Four']);
    const [cons, setCons] = useState<string[]>(['']);
    const [selected, setSelected] = useState<number>(0);

    useVimMotions({
        max: pros.length - 1,
        selected,
        setSelected,
        onEnter() {
            console.log('???');
        },
    });

    useEffect(() => {
        const storedPros = localStorage.getItem('pros');

        if (storedPros !== null) {
            setPros(JSON.parse(storedPros));
        }

        const storedCons = localStorage.getItem('cons');

        if (storedCons !== null) {
            setPros(JSON.parse(storedCons));
        }
    }, []);

    return (
        <div className={styles.prosandcons}>
            <div className={styles.window}>
                <div className={styles.pane}>
                    <div className={styles.label}>Pros</div>
                    <div className={styles.editor}>
                        {pros.map((pro, index) => {
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
                                                    setPros((prev) => {
                                                        return prev.map((item, prevIndex) => {
                                                            if (prevIndex === index) {
                                                                return event.target.value;
                                                            }

                                                            return item;
                                                        });
                                                    });
                                                }}
                                            />
                                            {/* <div className={styles.border} /> */}
                                        </>
                                    ) : (
                                        <span className={mode === 'INSERT' ? styles.muted : styles.content}>{pro}</span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    {/* <textarea
                        autoFocus
                        className={styles.editor}
                        value={pros}
                        onChange={(event) => {
                            setPros(event.target.value);
                            localStorage.setItem('pros', event.target.value);
                        }}
                    /> */}
                </div>
                <div className={styles.pane}>
                    <div className={styles.label}>Cons</div>
                    {/* <textarea
                        className={styles.editor}
                        value={cons}
                        onChange={(event) => {
                            setCons(event.target.value);
                            localStorage.setItem('cons', event.target.value);
                        }}
                    /> */}
                </div>
            </div>
            <Statusbar msg="" outerBar="" innerBar={<Time />} />
        </div>
    );
}
