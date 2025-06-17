'use client';

import { useState } from 'react';
import styles from './page.module.scss';

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
    const secondsLived = Math.floor((now.getTime() - born.getTime()) / 1000);

    const yearsLeft = expectedLifespan - age;
    const weeksLeft = Math.floor((estimatedDeath.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 7));
    const daysLeft = Math.floor((estimatedDeath.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    const hoursLeft = Math.floor((estimatedDeath.getTime() - now.getTime()) / (1000 * 60 * 60));
    const minutesLeft = Math.floor((estimatedDeath.getTime() - now.getTime()) / (1000 * 60));
    const secondsLeft = Math.floor((estimatedDeath.getTime() - now.getTime()) / 1000);

    return (
        <div className={styles.mori}>
            <header>
                <h1>Memento Mori</h1>
            </header>
            <div className={styles.toolbar}>
                {[
                    { label: 'Years', value: 1 },
                    { label: 'Weeks', value: 52 },
                    { label: 'Days', value: 365 },
                    { label: 'Hours', value: 365 * 24 },
                    { label: 'Minutes', value: 365 * 24 * 60 },
                    // { label: 'Seconds', value: 365 * 24 * 60 * 60 },
                ].map(({ label, value }) => (
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
                            // { label: 'seconds', value: secondsLived },
                        ].map(({ label, value }) => (
                            <li key={label}>
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
                            // { label: 'seconds', value: secondsLeft },
                        ].map(({ label, value }) => (
                            <li key={label}>
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
            <div className={styles.cards}>
                {Array.from({ length: expectedLifespan }, (_, i) => {
                    return (
                        <div key={i} className={`${styles.card} ${i < age ? styles.spent : styles.left}`}>
                            {formatNumberShort((i + 1) * selectedButton)}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
