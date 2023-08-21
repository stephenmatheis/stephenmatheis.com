'use client';

import { usePrompts } from '@/contexts/prompts';
import styles from './controller.module.scss';

export function Controller() {
    const { open, setOpen, menu, setMenu } = usePrompts();

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
                        <path
                            fillRule="evenodd"
                            d="M7.022 1.566a1.13 1.13 0 0 1 1.96 0l6.857 11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889 0-1.437-.99-.98-1.767L7.022 1.566z"
                        />
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
                            <path
                                fillRule="evenodd"
                                d="M7.022 1.566a1.13 1.13 0 0 1 1.96 0l6.857 11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889 0-1.437-.99-.98-1.767L7.022 1.566z"
                            />
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
                            <path
                                fillRule="evenodd"
                                d="M7.022 1.566a1.13 1.13 0 0 1 1.96 0l6.857 11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889 0-1.437-.99-.98-1.767L7.022 1.566z"
                            />
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
                        <path
                            fillRule="evenodd"
                            d="M7.022 1.566a1.13 1.13 0 0 1 1.96 0l6.857 11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889 0-1.437-.99-.98-1.767L7.022 1.566z"
                        />
                    </svg>
                </div>
            </div>
            <div className={styles.menu}>
                <button
                    className={styles['btn-ctr']}
                    onClick={() => {
                        setMenu('Select');
                        setOpen((prev) => {
                            if (menu === 'Select') {
                                return !prev;
                            } else {
                                return true;
                            }
                        });
                    }}
                >
                    <div className={styles.btn} />
                    <div className={styles.label}>Select</div>
                </button>
                <button
                    className={styles['btn-ctr']}
                    onClick={() => {
                        setMenu('Start');
                        setOpen((prev) => {
                            if (menu === 'Start') {
                                return !prev;
                            } else {
                                return true;
                            }
                        });
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
                    <button
                        onClick={() => {
                            console.log('B');
                        }}
                    >
                        B
                    </button>
                </div>
            </div>
        </div>
    );
}
