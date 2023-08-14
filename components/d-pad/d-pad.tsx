'use client';

import { usePrompts } from '@/contexts/prompts';
import styles from './d-pad.module.scss';

export function DPad() {
    const { open, setOpen } = usePrompts();

    return (
        <div className={styles.controller}>
            <div className={styles.dpad}>
                <div
                    className={styles.up}
                    onClick={() => {
                        console.log('Up');

                        window.dispatchEvent(
                            new KeyboardEvent('keydown', { key: 'ArrowUp' })
                        );
                    }}
                />
                <div className={styles.middle}>
                    <div
                        className={styles.left}
                        onClick={() => {
                            console.log('Left');

                            window.dispatchEvent(
                                new KeyboardEvent('keydown', {
                                    key: 'ArrowLeft',
                                })
                            );
                        }}
                    />
                    <div
                        className={styles.right}
                        onClick={() => {
                            console.log('Right');

                            window.dispatchEvent(
                                new KeyboardEvent('keydown', {
                                    key: 'ArrowRight',
                                })
                            );
                        }}
                    />
                </div>
                <div
                    className={styles.down}
                    onClick={() => {
                        console.log('Down');

                        window.dispatchEvent(
                            new KeyboardEvent('keydown', { key: 'ArrowDown' })
                        );
                    }}
                />
            </div>
            <div className={styles.menu}>
                <button className={styles['btn-ctr']}>
                    <div className={styles.btn} />
                    <div className={styles.label}>Select</div>
                </button>
                <button
                    className={styles['btn-ctr']}
                    onClick={() => {
                        console.log(open);
                        setOpen((prev) => !prev);
                    }}
                >
                    <div className={styles.btn} />
                    <div className={styles.label}>Start</div>
                </button>
            </div>
            <div className={styles.buttons}>
                <button>A</button>
                <button>B</button>
            </div>
        </div>
    );
}
