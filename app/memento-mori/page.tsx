'use client';

import { useRef, useState, useEffect } from 'react';
import styles from './page.module.scss';
import { Surface } from '@/components/surface';

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
            <Surface />
        </div>
    );
}
