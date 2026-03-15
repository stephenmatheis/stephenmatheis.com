'use client';

import { useState } from 'react';
import { Statusbar } from '@/components/Statusbar';
import { Time } from '@/components/Time';
import styles from './page.module.scss';

export default function Page() {
    const [pros, setPros] = useState<string[]>(['']);
    const [cons, setCons] = useState<string[]>(['']);

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.left}>
                        <div className={styles.title}>
                            <input name="title" type="text" placeholder="Pro question" tabIndex={-1} />
                        </div>
                        <ul>
                            {pros.map((pro, index) => {
                                return (
                                    <li key={index}>
                                        <input
                                            autoFocus
                                            name={`pro-${index}`}
                                            type="text"
                                            value={pro}
                                            placeholder="Pro"
                                            onChange={(event) => {
                                                setPros((prev) => {
                                                    return prev.map((item, itemIndex) => {
                                                        if (itemIndex === index) {
                                                            return event.target.value;
                                                        }

                                                        return item;
                                                    });
                                                });
                                            }}
                                        />
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className={styles.divider} />
                    <div className={styles.right}>
                        <div className={styles.title}>
                            <input name="title" type="text" placeholder="Con question" tabIndex={-1} />
                        </div>
                        <ul>
                            {cons.map((pro, index) => {
                                return (
                                    <li key={index}>
                                        <input
                                            autoFocus
                                            name={`con-${index}`}
                                            type="text"
                                            value={pro}
                                            placeholder="Con"
                                            onChange={(event) => {
                                                setCons((prev) => {
                                                    return prev.map((item, itemIndex) => {
                                                        if (itemIndex === index) {
                                                            return event.target.value;
                                                        }

                                                        return item;
                                                    });
                                                });
                                            }}
                                        />
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            <div className={styles.status}>{/* <Statusbar msg="" outerBar="" innerBar={<Time />} /> */}</div>
        </div>
    );
}
