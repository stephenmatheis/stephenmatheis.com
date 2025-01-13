'use client';

import { CSSProperties, useRef, useState } from 'react';
import styles from './page.module.scss';
import classNames from 'classnames';

const animationDuration = 700;
const cards = [
    { label: 'Card 0', color: '#FFFFFF' },
    { label: 'Card 1', color: '#BFBFBF' },
    { label: 'Card 2', color: '#7F7F7F' },
    { label: 'Card 3', color: '#3F3F3F' },
    { label: 'Card 4', color: '#000000' },
];

export default function RootPage() {
    const [selected, setSelected] = useState<number>(0);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    return (
        <div
            style={
                {
                    '--animation-duration': `${animationDuration}ms`,
                } as CSSProperties
            }
            className={styles.slider}
        >
            <div className={styles.box}>
                {cards.map(({ label, color }, index) => {
                    const position = index - selected - 1;

                    return (
                        <div
                            ref={(el) => {
                                cardRefs.current[index] = el;
                            }}
                            key={index}
                            style={
                                {
                                    '--step': position,
                                    backgroundColor: color,
                                } as CSSProperties
                            }
                            className={classNames(styles.card, {
                                [styles.full]: index <= selected,
                            })}
                        >
                            {label}
                        </div>
                    );
                })}
            </div>
            <div className={styles.controls}>
                <button
                    disabled={selected === 0}
                    onClick={() =>
                        setSelected((prev) => (prev - 1 < 0 ? 0 : prev - 1))
                    }
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fillRule="evenodd"
                            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                        />
                    </svg>
                </button>
                <button
                    disabled={selected === cards.length - 1}
                    onClick={() =>
                        setSelected((prev) =>
                            prev + 1 > cards.length - 1
                                ? cards.length - 1
                                : prev + 1
                        )
                    }
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fillRule="evenodd"
                            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}
