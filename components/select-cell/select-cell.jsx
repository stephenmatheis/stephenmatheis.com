'use client';

import { Fragment, useEffect, useMemo } from 'react';
import { Comment } from '@/components/comment';
import styles from './select-cell.module.scss';

export function SelectCell() {
    const enemies = useMemo(() => {
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
    }, []);

    // Loop
    useEffect(() => {
        // State
        let t = 0;
        let seconds = 0;
        let enemeies = [...document.querySelectorAll(`.${styles.cell}`)].map(
            (cell) => {
                cell.mission = 'protect';

                return cell;
            }
        );
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

                const max_index = Math.min(9, enemeies.length);
                const index = Math.floor(Math.random() * max_index) + 1;
                const cell = enemeies.at(-index);

                console.log(`Selected #${cell} :`, cell);
                console.log(`Mission?`, cell.mission);

                // Set el to attack
                cell.mission = 'attack';

                // Add to list of selected enemies
                selected.push(cell);

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

                if (enemeies.length == 0) {
                    clearInterval(game_loop);
                    return;
                }
            }

            // TODO:
            // Randomly select an enemy to be killed
            // at a random frame
            if (t % 30 === 0) {
                const index = Math.floor(Math.random() * (enemeies.length - 1));

                console.log(`#${index} killed.`);

                enemeies.splice(index, 1);
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
