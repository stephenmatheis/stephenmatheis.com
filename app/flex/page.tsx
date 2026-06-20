'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import styles from './page.module.scss';

const CELL_WIDTH = 14;
const CELL_HEIGHT = 28;
const ROW_OFFSET = 4;
const COL_OFFSET = ROW_OFFSET * 2;

type DrawBoxProps = {
    chars: string[][];
    x: number;
    y: number;
    width: number;
    height: number;
};

function DrawBox({ chars, x: startX, y: startY, width, height }: DrawBoxProps) {
    chars[startY][startX] = '\u256D';
    chars[startY][startX + width - 1] = '\u256E';
    chars[startY + height - 1][startX] = '\u2570';
    chars[startY + height - 1][startX + width - 1] = '\u256F';

    for (let x = startX + 1; x < startX + width - 1; x++) {
        chars[startY][x] = '\u2500';
        chars[startY + height - 1][x] = '\u2500';
    }

    for (let y = startY + 1; y < startY + height - 1; y++) {
        chars[y][startX] = '\u2502';
        chars[y][startX + width - 1] = '\u2502';
    }

    return chars;
}

export default function Home() {
    const [cols, setCols] = useState<number>(0);
    const [rows, setRows] = useState<number>(0);
    const [cells, setCells] = useState<string[][]>([]);
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
            const chars = Array.from({ length: rows }).map(() => Array.from({ length: cols }, () => ''));
            const outer = DrawBox({
                chars,
                x: 0,
                y: 0,
                width: cols,
                height: rows,
            });

            const inner = DrawBox({
                chars: outer,
                x: 2,
                y: 2,
                width: cols - 4,
                height: rows - 4,
            });

            setCols(cols);
            setRows(rows);
            setCells(inner);

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
                <div
                    ref={gridRef}
                    className={styles.grid}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${cols}, ${CELL_WIDTH}px)`,
                        gridTemplateRows: `repeat(${rows}, ${CELL_HEIGHT}px)`,
                    }}
                >
                    {cells.map((row, y) => {
                        return (
                            <Fragment key={y}>
                                {row.map((char, x) => {
                                    return (
                                        <div key={x} className={styles.cell}>
                                            {char}
                                        </div>
                                    );
                                })}
                            </Fragment>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
