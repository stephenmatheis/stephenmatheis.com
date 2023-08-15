'use client';

import { usePrompts } from '@/contexts/prompts';
import styles from './controller.module.scss';

export function Controller() {
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
                >
                    <svg
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                    >
                        <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                    </svg>
                </div>
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
                    >
                        <svg
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                        >
                            <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                        </svg>
                    </div>
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
                    >
                        <svg
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                        >
                            <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                        </svg>
                    </div>
                </div>
                <div
                    className={styles.down}
                    onClick={() => {
                        console.log('Down');

                        window.dispatchEvent(
                            new KeyboardEvent('keydown', { key: 'ArrowDown' })
                        );
                    }}
                >
                    <svg
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                    >
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                    </svg>
                </div>
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
                <div className={styles.top}>
                    <button
                        onClick={() => {
                            console.log('A');

                            window.dispatchEvent(
                                new KeyboardEvent('keydown', {
                                    key: 'Enter',
                                })
                            );
                        }}
                    >
                        A
                    </button>
                </div>
                <div className={styles.bottom}>
                    <button>B</button>
                </div>
            </div>
        </div>
    );
}
