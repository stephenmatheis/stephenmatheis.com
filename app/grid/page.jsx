'use client';

import { Page } from '@/components/page';
import { Main } from '@/components/main';
import { Comment } from '@/components/comment';
import styles from './grid.module.scss';
import { Fragment, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';

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
    const [seconds, setSeconds] = useState(0);
    const [selected, setSelected] = useState([]);
    const enemies = useMemo(() => {
        return setEnemies();
    }, []);

    // Loop
    useEffect(() => {
        setInterval(() => {
            setSeconds((prev) => prev + 1);
        }, 1000);
    }, []);

    useEffect(() => {
        setInterval(() => {
            // console.log(rnd(1, 40));
            // const cell = rnd(1, 40);
            const range = enemies.at(-1);
            const min = range[0];
            const max = range.at(-1);
            const el = rnd_el(range);

            // setSelected(prev => [
            //     ...prev,
            //     cell
            // ]);
        }, 2000);
    }, []);

    useEffect(() => {
        console.log(selected);
    }, [selected]);

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
                <div className={styles.grid}>
                    {enemies.map((row, index) => {
                        return (
                            <Fragment key={index}>
                                {row.map((cell) => {
                                    return (
                                        <div
                                            key={cell}
                                            className={classNames(styles.cell, {
                                                [styles.selected]:
                                                    selected.includes(cell),
                                            })}
                                        >
                                            {cell}
                                        </div>
                                    );
                                })}
                            </Fragment>
                        );
                    })}
                </div>
                <div className={styles.timer}>
                    <div>Seconds</div>
                    <div>{seconds}</div>
                </div>
                <div className={styles.timer}>
                    <div>Selected</div>
                    <div>{selected.join(', ')}</div>
                </div>
            </Main>
        </Page>
    );
}
