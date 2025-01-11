'use client';

import { useState } from 'react';
import styles from './page.module.scss';

const cards = ['Card 0', 'Card 1', 'Card 2', 'Card 3', 'Card 4'];

export default function RootPage() {
    const [selected, setSelected] = useState<number>(0);

    return (
        <div className={styles.slider}>
            <div className={styles.box}>
                <div className={styles.full}>{cards[selected]}</div>
                {cards
                    .filter((_, index) => index > selected)
                    .map((card, index) => (
                        <div
                            key={index}
                            style={{
                                left: `calc(50% + (240px * ${index * 1}))`,
                            }}
                            className={styles.card}
                        >
                            {card}
                        </div>
                    ))}
            </div>
            {/* TODO: Add animation to prev/next selection */}
            <div className={styles.controls}>
                <button
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
                    onClick={() =>
                        setSelected((prev) =>
                            prev + 1 > cards.length - 2
                                ? cards.length - 2
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
