'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './page.module.scss';

const CELL_WIDTH = 14;
const CELL_HEIGHT = 28;
const ROW_OFFSET = 2;
const COL_OFFSET = 4;
const TEXT = 'Hello, world.';

export default function Home() {
    const [cols, setCols] = useState<number>(0);
    const [rows, setRows] = useState<number>(0);
    const pageRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function setSize() {
            const canvas = gridRef.current;

            if (!canvas) return;

            const { innerWidth, innerHeight } = window;
            const raw_cols = Math.floor(innerWidth / CELL_WIDTH);
            const raw_rows = Math.floor(innerHeight / CELL_HEIGHT);
            const cols = raw_cols - COL_OFFSET;
            const rows = raw_rows - ROW_OFFSET;
            const width = cols * CELL_WIDTH;
            const height = rows * CELL_HEIGHT;

            setRows(rows);
            setCols(cols);

            console.log(`Viewport:\t${innerWidth}x${innerHeight}`);
            console.log(`Grid:\t\t${cols}x${rows}`);
            console.log(`DOM:\t\t${width}x${height}`);

            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
        }

        setSize();

        window.addEventListener('resize', setSize);

        if (!pageRef.current) return;
        pageRef.current.style.opacity = '1';

        return () => window.removeEventListener('resize', setSize);
    }, []);

    return (
        <div ref={pageRef} className={styles.page} style={{ opacity: 0 }}>
            <div className={styles.renderer}>
                {/* <div className={styles.text}>
                    {TEXT.split('').map((char, index) => {
                        return (
                            <div key={index} className={styles.char}>
                                {char === ' ' ? <>&nbsp;</> : char}
                            </div>
                        );
                    })}
                </div> */}
                <div
                    ref={gridRef}
                    className={styles.grid}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${cols}, ${CELL_WIDTH}px)`,
                        gridTemplateRows: `repeat(${rows}, ${CELL_HEIGHT}px)`,
                    }}
                >
                    {Array.from({ length: cols * rows }).map((_, index) => {
                        const char = index < TEXT.length ? TEXT[index] : '';

                        return (
                            <div key={index} className={styles.cell}>
                                {char}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
