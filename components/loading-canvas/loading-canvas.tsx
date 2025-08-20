'use client';

import { useEffect, useRef } from 'react';
import styles from './loading-canvas.module.scss';

type Letter = {
    x: number;
    y: number;
    delay: number;
};

type LoadingCanvasProps = {
    animationDirection?: 'enter' | 'exit';
};

export function LoadingCanvas({ animationDirection = 'enter' }: LoadingCanvasProps) {
    const patternRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!patternRef.current) return;

        let cols = 108;
        let rows = 71;
        let width = 7;
        let height = 14;
        let canvasWidth = 756;
        let canvasHeight = 994;

        if (window.innerHeight < 1056) {
            console.log('Orientation: Landscape');

            cols = 146;
            rows = 56;
            width = 7;
            height = 14;
            canvasWidth = 1022;
            canvasHeight = 784;
        } else {
            console.log('Orientation: Portrait');
        }

        const canvas = patternRef.current.querySelector('#canvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        const devicePixelRatio = window.devicePixelRatio || 1;

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
                    delay: (Math.random() + Math.random()) * 500,
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
            const fromValue = animationDirection === 'enter' ? 1 : 0;
            const toValue = animationDirection === 'enter' ? 0 : 1;
            const completed = [
                ...new Set(
                    letters.map(({ x, y, delay }) => {
                        const opacity = progress < delay ? fromValue : toValue;

                        ctx.fillStyle = `rgba(255,255,255,${opacity})`;
                        ctx.fillRect(x, y, width, height);

                        return opacity;
                    })
                ),
            ];

            if (completed[0] === toValue) {
                console.log('animation complete. set direction to null. set can update to false.');
            }

            requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);
    }, [animationDirection]);

    return (
        <div ref={patternRef} className={styles['loading-canvas']}>
            <canvas id="canvas" />
        </div>
    );
}
