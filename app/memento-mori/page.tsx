'use client';

import { useRef, useState, useEffect } from 'react';
import styles from './page.module.scss';

const born = new Date('1988-04-13T00:00:00Z');
const now = new Date();
const age = Math.floor((now.getTime() - born.getTime()) / (1000 * 60 * 60 * 24 * 365.25));
const expectedLifespan = 80;
const estimatedDeath = new Date(born);
estimatedDeath.setFullYear(born.getFullYear() + expectedLifespan);

const weeksLived = Math.floor((now.getTime() - born.getTime()) / (1000 * 60 * 60 * 24 * 7));
const daysLived = Math.floor((now.getTime() - born.getTime()) / (1000 * 60 * 60 * 24));
const hoursLived = Math.floor((now.getTime() - born.getTime()) / (1000 * 60 * 60));
const minutesLived = Math.floor((now.getTime() - born.getTime()) / (1000 * 60));
const yearsLeft = expectedLifespan - age;
const weeksLeft = Math.floor((estimatedDeath.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 7));
const daysLeft = Math.floor((estimatedDeath.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
const hoursLeft = Math.floor((estimatedDeath.getTime() - now.getTime()) / (1000 * 60 * 60));
const minutesLeft = Math.floor((estimatedDeath.getTime() - now.getTime()) / (1000 * 60));

const spacing = 8;

const options = [
    { label: 'Years', value: 1 },
    { label: 'Weeks', value: 52 },
    { label: 'Days', value: 365 },
    { label: 'Hours', value: 365 * 24 },
];

const columnsByUnit: Record<number, number> = {
    1: 10,
    52: 52,
    365: 365,
    [365 * 24]: 24,
};

function formatNumber(num: number): string {
    return num.toLocaleString('en-US', { maximumFractionDigits: 0 });
}

function formatNumberShort(num: number): string {
    const formatted = num.toLocaleString('en-US', { maximumFractionDigits: 0 });

    switch (true) {
        case num >= 1_000_000_000:
            return (num / 1_000_000_000).toFixed(0) + 'B';
        case num >= 1_000_000:
            return (num / 1_000_000).toFixed(0) + 'M';
        case num >= 1_000:
            return (num / 1_000).toFixed(0) + 'K';
        default:
            return formatted;
    }
}

function getPercentage(part: number, total: number): string {
    return ((part / total) * 100).toFixed(2) + '%';
}

function Percentage({ part, total }: { part: number; total: number }) {
    return <span className={styles.percentage}>{getPercentage(part, total)}</span>;
}

function DataPoint({ label, value }: { label: string; value: number }) {
    return (
        <>
            {formatNumber(value)} {label}
        </>
    );
}

export default function MementoMoriPage() {
    const [selectedButton, setSelectedButton] = useState<number>(1);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const scaleRef = useRef(1);
    const offsetRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;

        let isDragging = false;
        let lastX = 0;
        let lastY = 0;

        function resize() {
            canvas.width = canvas.parentElement!.clientWidth;
            canvas.height = canvas.parentElement!.clientHeight;

            draw();
        }

        function draw() {
            const canvas = canvasRef.current!;
            const ctx = canvas.getContext('2d')!;
            const { width, height } = canvas;
            const scale = scaleRef.current;
            const { x: offsetX, y: offsetY } = offsetRef.current;

            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.clearRect(0, 0, width, height);
            ctx.translate(offsetX, offsetY);
            ctx.scale(scale, scale);

            const totalSquares = expectedLifespan * selectedButton;
            const spentSquares = age * selectedButton;
            const columns = columnsByUnit[selectedButton];
            const cellSize = width / columns;

            for (let i = 0; i < totalSquares; i++) {
                const col = i % columns;
                const row = Math.floor(i / columns);
                const x = col * cellSize;
                const y = row * cellSize;

                ctx.fillStyle = i < spentSquares ? '#aaaaaa' : '#dddddd';
                ctx.fillRect(x + spacing, y + spacing, cellSize - spacing * 2, cellSize - spacing * 2);
                
                // ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color');
                // ctx.font = `16.5px ${getComputedStyle(document.body).getPropertyValue('--font-mono')}`;
                // ctx.textAlign = 'center';
                // ctx.textBaseline = 'middle';
                // ctx.fillText((i + 1).toString(), x + cellSize / 2, y + cellSize / 2);
            }
        }

        function onWheel(e: WheelEvent) {
            e.preventDefault();

            // Zoom toward cursor
            const zoomFactor = 1.1;
            const { offsetX: x, offsetY: y, deltaY } = e;
            const prevScale = scaleRef.current;
            const newScale = prevScale * (deltaY < 0 ? zoomFactor : 1 / zoomFactor);

            // adjust offsets so that zoom is centered under cursor
            const rect = canvas.getBoundingClientRect();
            const cx = x - rect.left - offsetRef.current.x;
            const cy = y - rect.top - offsetRef.current.y;

            offsetRef.current.x -= (newScale / prevScale - 1) * cx;
            offsetRef.current.y -= (newScale / prevScale - 1) * cy;
            scaleRef.current = newScale;

            requestAnimationFrame(draw);
        }

        function onMouseDown(e: MouseEvent) {
            isDragging = true;
            lastX = e.clientX;
            lastY = e.clientY;
        }

        function onMouseMove(e: MouseEvent) {
            if (!isDragging) return;

            const dx = e.clientX - lastX;
            const dy = e.clientY - lastY;

            lastX = e.clientX;
            lastY = e.clientY;

            offsetRef.current.x += dx;
            offsetRef.current.y += dy;

            requestAnimationFrame(draw);
        }

        function onMouseUp() {
            isDragging = false;
        }

        window.addEventListener('resize', resize);

        canvas.addEventListener('wheel', onWheel, { passive: false });
        canvas.addEventListener('mousedown', onMouseDown);

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);

        resize();

        return () => {
            window.removeEventListener('resize', resize);

            canvas.removeEventListener('wheel', onWheel);
            canvas.removeEventListener('mousedown', onMouseDown);

            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, [selectedButton]);

    return (
        <div className={styles.mori}>
            <header>
                <h1>Memento Mori</h1>
            </header>
            <div className={styles.toolbar}>
                {options.map(({ label, value }) => (
                    <button
                        key={label}
                        className={selectedButton === value ? styles.selected : ''}
                        onClick={() => setSelectedButton(value)}
                    >
                        <span>|</span>
                        {label}
                        <span>|</span>
                    </button>
                ))}
            </div>
            <div className={styles.data}>
                <div>
                    <p>
                        <strong>Born:</strong> {born.toDateString()}
                    </p>
                    {age > 0 ? (
                        <p>
                            <strong>Age:</strong> {age} years
                        </p>
                    ) : (
                        <p>
                            <strong>Age:</strong> Less than a year
                        </p>
                    )}
                    <p>
                        <strong>Lifespan:</strong> About {expectedLifespan} years
                    </p>
                    <p>
                        <strong>Death:</strong> Maybe {estimatedDeath.toDateString()}
                    </p>
                    <p>
                        <strong>Today:</strong> {now.toDateString()}
                    </p>
                    <p>
                        <strong>Time Left:</strong>
                        {Math.max(0, expectedLifespan - age)} years
                    </p>
                </div>
                <div>
                    <p>
                        <strong>Time spent:</strong> (<Percentage part={age} total={expectedLifespan} />)
                    </p>
                    <ul>
                        {[
                            { label: 'Years', value: age },
                            { label: 'weeks', value: weeksLived },
                            { label: 'days', value: daysLived },
                            { label: 'hours', value: hoursLived },
                            { label: 'minutes', value: minutesLived },
                        ].map(({ label, value }) => (
                            <li key={label} suppressHydrationWarning>
                                <DataPoint label={label} value={value} />
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <p>
                        <strong>Time left:</strong> (
                        <Percentage part={expectedLifespan - age} total={expectedLifespan} />)
                    </p>
                    <ul>
                        {[
                            { label: 'Years', value: yearsLeft },
                            { label: 'weeks', value: weeksLeft },
                            { label: 'days', value: daysLeft },
                            { label: 'hours', value: hoursLeft },
                            { label: 'minutes', value: minutesLeft },
                        ].map(({ label, value }) => (
                            <li key={label} suppressHydrationWarning>
                                <DataPoint label={label} value={value} />
                            </li>
                        ))}
                    </ul>
                </div>
                <p>
                    <strong>
                        <em>Remember, thou art mortal.</em>
                    </strong>
                </p>
            </div>
            <div id={styles.canvas}>
                <canvas ref={canvasRef} />
            </div>
        </div>
    );
}
