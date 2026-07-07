'use client';

import { useEffect, useRef } from 'react';
import styles from './page.module.scss';

const CELL_WIDTH = 14;
const CELL_HEIGHT = 28;
const ROW_OFFSET = 2;
const COL_OFFSET = 4;
const TEXT = 'Hello, world.';

export default function Home() {
    const pageRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        if (!ctx) return;

        const rootStyles = window.getComputedStyle(document.documentElement);
        const fontSize = rootStyles.getPropertyValue('--canvas-font-size').trim();
        const fontFamily = rootStyles.getPropertyValue('--canvas-font-family').trim();
        const { innerWidth, innerHeight } = window;
        const cols = Math.floor(innerWidth / CELL_WIDTH);
        const rows = Math.floor(innerHeight / CELL_HEIGHT);
        const width = (cols - COL_OFFSET) * CELL_WIDTH;
        const height = (rows - ROW_OFFSET) * CELL_HEIGHT;
        const dpr = window.devicePixelRatio || 1;

        console.log(`Viewport:\t${innerWidth}x${innerHeight}`);
        console.log(`Grid:\t\t${cols}x${rows}`);
        console.log(`Canvas:\t\t${width}x${height}`);

        canvas.width = width * dpr;
        canvas.height = height * dpr;

        ctx.scale(dpr, dpr);

        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        ctx.font = `${fontSize} ${fontFamily}`;
        ctx.textBaseline = 'ideographic';

        for (let col = 0; col < cols - COL_OFFSET; col++) {
            for (let row = 0; row < rows - ROW_OFFSET; row++) {
                const boxX = col * CELL_WIDTH;
                const boxY = row * CELL_HEIGHT;

                ctx.strokeStyle = '#00000030';
                ctx.lineWidth = 0.5;
                ctx.strokeRect(boxX, boxY, CELL_WIDTH, CELL_HEIGHT);

                if (row > 0) continue;

                if (col < TEXT.length) {
                    ctx.fillStyle = '#000000';
                    ctx.fillText(TEXT[col], boxX, boxY + CELL_HEIGHT);
                }
            }
        }

        //

        if (!pageRef.current) return;

        pageRef.current.style.opacity = '1';
    }, []);

    return (
        <div ref={pageRef} className={styles.page} style={{ opacity: 0 }}>
            <div className={styles.renderer}>
                <div className={styles.text}>
                    {TEXT.split('').map((char, index) => {
                        return (
                            <div key={index} className={styles.char}>
                                {char === ' ' ? <>&nbsp;</> : char}
                            </div>
                        );
                    })}
                </div>
                <canvas ref={canvasRef} className={styles.canvas}></canvas>
            </div>
        </div>
    );
}
