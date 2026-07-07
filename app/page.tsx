'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.scss';

const CELL_WIDTH = 10.5;
const CELL_HEIGHT = 21;
const ROW_OFFSET = 2;
const COL_OFFSET = 8;

function getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function Home() {
    const [cols, setCols] = useState(0);
    const [rows, setRows] = useState(0);

    useEffect(() => {
        function setDimensions() {
            setCols(Math.floor(window.innerWidth / CELL_WIDTH) - COL_OFFSET);
            setRows(Math.floor(window.innerHeight / CELL_HEIGHT) - ROW_OFFSET);
        }

        setDimensions();

        window.addEventListener('resize', setDimensions);

        return () => window.removeEventListener('resize', setDimensions);
    }, []);

    return (
        <div className={styles.page}>
            {Array.from({ length: rows }).map((_, i) => {
                return (
                    <div key={i} className={styles.line}>
                        <span className={styles.content}>
                            {Array.from({ length: cols })
                                .map(() => {
                                    const randomChar = getRandomIntInclusive(65, 90);

                                    return String.fromCodePoint(randomChar);
                                })
                                .join('')}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}
