'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import styles from './page.module.scss';

const CELL_WIDTH = 14;
const CELL_HEIGHT = 28;
const ROW_OFFSET = 4;
const COL_OFFSET = ROW_OFFSET * 2;

type BorderStyle = 'rounded' | 'single' | 'double';

type BoxProps = {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    border?: boolean;
    borderStyle?: BorderStyle;
    title?: string;
    titleAlignment?: 'left' | 'center' | 'right';
    padding?: number;
    paddingX?: number;
    paddingY?: number;
};

type BoxNode = BoxProps & { children: BoxNode[] };

function Box(props: BoxProps, ...children: BoxNode[]): BoxNode {
    return { border: true, borderStyle: 'rounded', x: 0, y: 0, ...props, children };
}

function render(
    {
        x = 0,
        y = 0,
        width,
        height,
        border,
        borderStyle = 'rounded',
        title,
        titleAlignment = 'left',
        padding = 1,
        paddingX,
        paddingY,
        children,
    }: BoxNode,
    chars: string[][],
) {
    if (border) {
        const borderStyles = {
            double: ['\u2554', '\u2557', '\u255A', '\u255D'],
            single: ['\u250C', '\u2510', '\u2514', '\u2518'],
            rounded: ['\u256D', '\u256E', '\u2570', '\u256F'],
        };
        const corners = borderStyles[borderStyle];
        const horizontalEdge = borderStyle === 'double' ? '\u2550' : '\u2500';
        const verticalEdge = borderStyle === 'double' ? '\u2551' : '\u2502';

        height = height || chars.length;
        width = width || chars[0].length;

        chars[y][x] = corners[0];
        chars[y][x + width - 1] = corners[1];
        chars[y + height - 1][x] = corners[2];
        chars[y + height - 1][x + width - 1] = corners[3];

        for (let cx = x + 1; cx < x + width - 1; cx++) {
            chars[y][cx] = horizontalEdge;
            chars[y + height - 1][cx] = horizontalEdge;
        }

        for (let cy = y + 1; cy < y + height - 1; cy++) {
            chars[cy][x] = verticalEdge;
            chars[cy][x + width - 1] = verticalEdge;
        }

        if (title) {
            const paddedTitle = ` ${title} `;
            const startX = {
                left: x + 2,
                center: x + Math.floor((width - paddedTitle.length) / 2),
                right: x + width - 2 - paddedTitle.length,
            };

            for (let i = 0; i < paddedTitle.length; i++) {
                chars[y][startX[titleAlignment] + i] = paddedTitle[i];
            }
        }
    }

    for (const child of children) {
        const px = paddingX ?? padding;
        const py = paddingY ?? padding;

        render(
            {
                ...child,
                x: x + px + (child.x ?? 0),
                y: y + py + (child.y ?? 0),
                width: child.width ?? (width || 0) - px * 2,
                height: child.height ?? (height || 0) - py * 2,
            },
            chars,
        );
    }
}

export default function Home() {
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

            render(
                Box(
                    {
                        title: 'Outer',
                        paddingX: 2,
                    },
                    Box(
                        {
                            title: 'Inner',
                            titleAlignment: 'right',
                            paddingX: 2,
                        },
                        Box({
                            title: 'Center',
                            titleAlignment: 'center',
                        }),
                    ),
                ),
                chars,
            );

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
                <div
                    ref={gridRef}
                    className={styles.grid}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${cells[0]?.length}, ${CELL_WIDTH}px)`,
                        gridTemplateRows: `repeat(${cells.length}, ${CELL_HEIGHT}px)`,
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
