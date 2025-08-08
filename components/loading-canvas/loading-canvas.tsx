'use client';

import { useEffect, useRef, useState } from 'react';

import styles from './loading-canvas.module.scss';

type Letter = {
    x: number;
    y: number;
    delay: number;
};

const wait = 0.25;

export function LoadingCanvas() {
    const [mounted, setMounted] = useState<boolean>(false);
    const patternRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setTimeout(() => {
            setMounted(true);
        }, wait);
    }, []);

    useEffect(() => {
        if (!patternRef.current) return;

        const cols = 95;
        const rows = 58;
        const width = 7;
        const height = 14;

        const canvas = patternRef.current.querySelector('#canvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        const devicePixelRatio = window.devicePixelRatio || 1;

        const canvasWidth = 665;
        const canvasHeight = 957;

        canvas.width = canvasWidth * devicePixelRatio;
        canvas.height = canvasHeight * devicePixelRatio;
        canvas.style.width = `${canvasWidth}px`;
        canvas.style.height = `${canvasHeight}px`;

        if (!ctx) return;

        ctx.scale(devicePixelRatio, devicePixelRatio);

        const letters: Letter[] = [];

        if (!ctx) return;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const letter = {
                    x: col * width,
                    y: row * height,
                    delay: (Math.random() + Math.random()) * 500 + wait,
                };

                letters.push(letter);
            }
        }

        let start: number;

        function animate(timestamp: number) {
            if (!ctx) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (start === undefined) {
                start = timestamp;
            }

            const progress = timestamp - start;

            letters.forEach(({ x, y, delay }, index) => {
                let opacity = progress < delay ? 1 : 0;

                ctx.fillStyle = `rgba(255,255,255,${opacity})`;
                ctx.fillRect(x, y, width, height);
            });

            requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);
    }, []);

    return (
        <div ref={patternRef} className={styles['loading-canvas']}>
            <canvas id="canvas" width={665} height={957} />
            {!mounted && <div className={styles.backdrop} />}
        </div>
    );
}
