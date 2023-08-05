'use client';

import { Fragment, useEffect, useMemo } from 'react';
import { Comment } from '@/components/comment';
import styles from './select-cell.module.scss';

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

export function SelectCell() {
    const enemies = useMemo(() => {
        return setEnemies();
    }, []);

    // Loop
    useEffect(() => {
        // State
        let t = 0;
        let seconds = 0;
        let enemeies = [...document.querySelectorAll(`.${styles.cell}`)];
        let range = enemeies.slice(-10);
        let selected = [];

        // Run at 30fps
        let game_loop;

        function start_game() {
            return setInterval(() => {
                _update();
                _draw();
            }, 1000 / 30);
        }

        function _update() {
            // Set frame
            t += 1;
            document.querySelector('.fps').innerText = t;

            // TODO: Add number field for user to set
            // Every second (30 frames)
            if (t % 30 === 0) {
                seconds += 1;
                document.querySelector('.seconds').innerText = seconds;

                const row_len = 10;
                const el = rnd_element(range);
                const range_index = range.indexOf(el);
                const enemies_index = enemeies.indexOf(el);

                const new_el = enemeies[enemies_index - row_len];

                // NOTE: Don't remove the enemy
                // It will be removed either by:
                // 1. Player reduces the enemy's health to 0
                // 2. The enemy leaves the screen
                //
                // This poses a problem. We don't know what the size
                // of the array will be on any given frame.
                // We'll have to check the size of the array on each
                // pass to see what's there

                enemeies.splice(enemies_index, 1);
                range.splice(range_index, 1);

                // if (new_el) {
                //     range.splice(range_index, 1, new_el);
                // } else {
                //     range.splice(range_index, 1);
                // }

                // DEV: From SHMUP.P8
                // local max_num = min(10, #enemies)
                // local index = flr(rnd(max_num))

                // index = #enemies - index

                // local enemy = enemies[index]
                // DEV:

                // console.log(
                //     'Range:',
                //     range.map((c) => c.innerText)
                // );
                // console.log('Selected:', el);
                // console.log('Range index:', range_index);
                // console.log(
                //     'Enemies:',
                //     enemeies.map((c) => c.innerText)
                // );
                // console.log('Enemies index:', enemies_index);
                // console.log('New enemy?', new_el);
                // console.log('----------------------------------------\n');

                selected.push(el);

                // Update order selected
                document.querySelector(
                    `.${styles.selected}:not(.${styles.cell})`
                ).innerHTML = selected
                    .map((cell, index) => {
                        const num = index + 1;

                        return /*html*/ `
                            <div class="${styles['order-line']}">
                                <span style="margin-right: ${
                                    num > 10 ? '1ch' : '2ch'
                                }">${num}</span><span>${cell.innerText}</span>
                            </div>
                        `;
                    })
                    .join('\n');

                // Grab the next 10 items
                if (range.length === 0) {
                    range = enemeies.slice(-10);
                }

                if (enemeies.length == 0) {
                    clearInterval(game_loop);
                    return;
                }
            }
        }

        function _draw() {
            [...document.querySelectorAll(`.${styles.cell}`)].forEach(
                (cell) => {
                    if (selected.includes(cell)) {
                        cell.classList.add(styles.selected);
                    }
                }
            );
        }

        function reset_state() {
            t = 0;
            seconds = 0;
            enemeies = [...document.querySelectorAll(`.${styles.cell}`)];
            range = enemeies.slice(-10);
            selected = [];
        }

        function rnd_element(arr) {
            return arr[Math.floor(Math.random() * arr.length)];
        }

        // start
        document.querySelector('.start').addEventListener('click', () => {
            game_loop = start_game();
        });

        // stop
        document.querySelector('.stop').addEventListener('click', () => {
            clearInterval(game_loop);
        });

        // reset
        document.querySelector('.reset').addEventListener('click', () => {
            clearInterval(game_loop);

            // set state back to initial values
            reset_state();

            // reset frame counter
            document.querySelector('.fps').innerText = 0;

            // reset seconds elapsed
            document.querySelector('.seconds').innerText = 0;

            // remove selected class from cells
            [...document.querySelectorAll(`.${styles.cell}`)].forEach(
                (cell) => {
                    if (cell.classList.contains(styles.selected)) {
                        cell.classList.remove(styles.selected);
                    }
                }
            );

            document.querySelector(
                `.${styles.selected}:not(.${styles.cell})`
            ).innerHTML = /*html*/ `
                <div
                    class="${styles['order-line']} ${styles.placeholder}"
                >
                    None
                </div>
            `;
        });
    }, []);

    return (
        <div className={styles['grid-wrapper']}>
            <div className={styles['stats-ctr']}>
                <div className={styles.stats}>
                    <div>
                        <span>Frame</span>
                        <span className={[styles.counter, 'fps'].join(' ')}>
                            0
                        </span>
                    </div>
                    <div>
                        <span>Seconds</span>
                        <span className={[styles.counter, 'seconds'].join(' ')}>
                            0
                        </span>
                    </div>
                </div>
            </div>
            <div className={styles.grid}>
                {enemies.map((row, index) => {
                    return (
                        <Fragment key={index}>
                            {row.map((cell) => {
                                return (
                                    <div key={cell} className={styles.cell}>
                                        {cell}
                                    </div>
                                );
                            })}
                        </Fragment>
                    );
                })}
            </div>
            {/* Buttons */}
            <div className={styles.toolbar}>
                <button className={[styles.btn, 'start'].join(' ')}>
                    Start
                </button>
                <button className={[styles.btn, 'stop'].join(' ')}>Stop</button>
                <button className={[styles.btn, 'reset'].join(' ')}>
                    Reset
                </button>
            </div>
            {/* Readout */}
            <div className={styles.readout}>
                <Comment text="Order Selected" />
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
        </div>
    );
}
