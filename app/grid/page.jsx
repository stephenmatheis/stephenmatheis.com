'use client';

import { Page } from '@/components/page';
import { Main } from '@/components/main';
import { Comment } from '@/components/comment';
import styles from './grid.module.scss';
import { Fragment, useEffect, useMemo } from 'react';

function rnd(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rnd_el(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function setEnemies() {
    const enemies = [];
    let cell = 1;

    for (let row = 1; row <= 4; row++) {
        const cells = [];

        for (let col = 1; col <= 10; col++) {
            cells.push(cell++);
        }

        enemies.push(cells);
    }

    return enemies;
}

export default function DrawingsPage() {
    const enemies = useMemo(() => {
        return setEnemies();
    }, []);

    // Loop
    useEffect(() => {
        setInterval(() => {}, 1000);
    }, []);

    return (
        <Page
            links={[
                {
                    label: 'Home',
                    path: '/',
                },
            ]}
        >
            <Main columns={2}>
                <Comment text="Grid" />
                <div className={styles['grid-wrapper']}>
                    <div className={styles.stats}>
                        <div>
                            <span>Frame</span>
                            <span
                                className={[styles.counter, styles.fps].join(
                                    ' '
                                )}
                            >
                                0
                            </span>
                        </div>
                        <div>
                            <span>Seconds</span>
                            <span
                                className={[
                                    styles.counter,
                                    styles.seconds,
                                ].join(' ')}
                            >
                                0
                            </span>
                        </div>
                    </div>
                    <div className={styles.grid}>
                        {enemies.map((row, index) => {
                            return (
                                <Fragment key={index}>
                                    {row.map((cell) => {
                                        return (
                                            <div
                                                key={cell}
                                                className={styles.cell}
                                            >
                                                {cell}
                                            </div>
                                        );
                                    })}
                                </Fragment>
                            );
                        })}
                    </div>
                    <div className={styles.readout}>
                        <div className={styles.heading}>Order Selected</div>
                        <div className={styles.selected}>
                            <div
                                className={[
                                    styles['order-line'],
                                    styles.placeholder,
                                ].join(' ')}
                            >
                                None
                            </div>
                        </div>
                    </div>
                    <div className={styles.toolbar}>
                        <button
                            className={[styles.btn, styles.start].join(' ')}
                        >
                            Start
                        </button>
                        <button className={[styles.btn, styles.stop].join(' ')}>
                            Stop
                        </button>
                        <button
                            className={[styles.btn, styles.reset].join(' ')}
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </Main>
        </Page>
    );
}
