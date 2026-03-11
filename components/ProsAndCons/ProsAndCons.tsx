'use client';

import { useEffect, useState } from 'react';
import { Statusbar } from '@/components/Statusbar';
import { Time } from '@/components/Time';
import styles from './ProsAndCons.module.scss';

export function ProsAndCons() {
    const [pros, setPros] = useState<string>('');
    const [cons, setCons] = useState<string>('');

    useEffect(() => {
        const storedPros = localStorage.getItem('pros');

        if (storedPros !== null) {
            setPros(storedPros);
        }

        const storedCons = localStorage.getItem('cons');

        if (storedCons !== null) {
            setCons(storedCons);
        }
    }, []);

    return (
        <div className={styles.prosandcons}>
            <div className={styles.window}>
                <div className={styles.pane}>
                    <div className={styles.label}>Pros</div>
                    <textarea
                        autoFocus
                        className={styles.editor}
                        value={pros}
                        onChange={(event) => {
                            setPros(event.target.value);
                            localStorage.setItem('pros', event.target.value);
                        }}
                    />
                </div>
                <div className={styles.pane}>
                    <div className={styles.label}>Cons</div>
                    <textarea
                        className={styles.editor}
                        value={cons}
                        onChange={(event) => {
                            setCons(event.target.value);
                            localStorage.setItem('cons', event.target.value);
                        }}
                    />
                </div>
            </div>
            <Statusbar msg="" outerBar="" innerBar={<Time />} />
        </div>
    );
}
