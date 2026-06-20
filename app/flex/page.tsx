'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import styles from './page.module.scss';

const CELL_WIDTH = 14;
const CELL_HEIGHT = 28;
const ROW_OFFSET = 4;
const COL_OFFSET = ROW_OFFSET * 2;
// const TEXT = 'Hello, world.';

type DrawBoxProps = {
    chars: string[][];
    x: number;
    y: number;
    width: number;
    height: number;
};

// eslint-disable-next-line
function DrawBox({ chars, x: startX, y: startY, width, height }: DrawBoxProps) {
    // top left
    chars[0][0] = '\u256D';

    // top edge
    chars = chars.map((row, y) => {
        return row.map((col, x) => {
            if (y === startY && x > startX && x < width - 1) {
                return '\u2500';
            }

            return col;
        });
    });

    // top right
    chars[0][width - 1] = '\u256E';

    // bottom left
    chars[height - 1][0] = '\u2570';

    // bottom edge
    chars = chars.map((row, y) => {
        return row.map((col, x) => {
            if (y === height - 1 && x > startX && x < width - 1) {
                return '\u2500';
            }

            return col;
        });
    });

    // bottom right
    chars[height - 1][width - 1] = '\u256F';

    // left edge
    chars = chars.map((row, y) => {
        return row.map((col, x) => {
            if (x === startX && y > startX && y < height - 1) {
                return '\u2502';
            }

            return col;
        });
    });

    // right edge
    chars = chars.map((row, y) => {
        return row.map((col, x) => {
            if (x === width - 1 && y > startY && y < height - 1) {
                return '\u2502';
            }

            return col;
        });
    });
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

            let chars = Array.from({ length: rows }).map(() => Array.from({ length: cols }, () => ''));

            // top left
            chars[0][0] = '\u256D';

            // top edge
            chars = chars.map((row, y) => {
                return row.map((col, x) => {
                    if (y === 0 && x > 0 && x < cols - 1) {
                        return '\u2500';
                    }

                    return col;
                });
            });

            // top right
            chars[0][cols - 1] = '\u256E';

            // bottom left
            chars[rows - 1][0] = '\u2570';

            // bottom edge
            chars = chars.map((row, y) => {
                return row.map((col, x) => {
                    if (y === rows - 1 && x > 0 && x < cols - 1) {
                        return '\u2500';
                    }

                    return col;
                });
            });

            // bottom right
            chars[rows - 1][cols - 1] = '\u256F';

            // left edge
            chars = chars.map((row, y) => {
                return row.map((col, x) => {
                    if (x === 0 && y > 0 && y < rows - 1) {
                        return '\u2502';
                    }

                    return col;
                });
            });

            // right edge
            chars = chars.map((row, y) => {
                return row.map((col, x) => {
                    if (x === cols - 1 && y > 0 && y < rows - 1) {
                        return '\u2502';
                    }

                    return col;
                });
            });

            setCols(cols);
            setRows(rows);
            setCells(chars);

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
                {/* <div
                    className={styles.flex}
                    style={{
                        width: `calc(${cols} * ${CELL_WIDTH}px)`,
                        height: `calc(${rows} * ${CELL_HEIGHT}px)`,
                        padding: `${CELL_HEIGHT}px ${CELL_WIDTH}px`,
                    }}
                >
                    {TEXT}
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
                    {/* {Array.from({ length: cols * rows }).map((_, index) => {
                        const char = index < TEXT.length ? TEXT[index] : '';

                        return (
                            <div key={index} className={styles.cell}>
                                {char}
                            </div>
                        );
                    })} */}
                    {cells.map((row, y) => {
                        return (
                            <Fragment key={y}>
                                {row.map((char, x) => {
                                    if (char !== '') {
                                        console.log(x, y, char);
                                    }
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
