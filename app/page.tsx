'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.scss';
import { Title } from '@/components/title';

type CountdownProps = {
    initialHours: number;
    initialMinutes: number;
    initialSeconds: number;
};

function Countdown({
    initialHours,
    initialMinutes,
    initialSeconds,
}: CountdownProps) {
    const [timeLeft, setTimeLeft] = useState({
        hours: initialHours,
        minutes: initialMinutes,
        seconds: initialSeconds,
    });

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeLeft((prev) => {
                if (
                    prev.hours === 0 &&
                    prev.minutes === 0 &&
                    prev.seconds === 0
                ) {
                    clearInterval(intervalId);
                    return prev;
                }

                let { hours, minutes, seconds } = prev;

                if (seconds > 0) {
                    seconds -= 1;
                } else {
                    seconds = 59;
                    if (minutes > 0) {
                        minutes -= 1;
                    } else if (hours > 0) {
                        hours -= 1;
                        minutes = 59;
                    }
                }

                return { hours, minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="countdown">
            {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </div>
    );
}

function Progress() {
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        let count = 0;

        const startTimeout = setTimeout(() => {
            const intervalId = setInterval(() => {
                if (count >= 100) {
                    clearInterval(intervalId);
                    return;
                }

                count += 1;
                setProgress(count);
            }, 15);

            return () => clearInterval(intervalId);
        }, 1650);

        return () => clearTimeout(startTimeout);
    }, []);

    return (
        <div className={styles.progress}>
            <svg width="720" height="196" viewBox="0 0 720 196" fill="none">
                <path
                    d="M0 98.8313L298.014 0L720 59.2988L693.58 192.86L29.3764 196L7.57506 176.973L0 98.8313Z"
                    fill="var(--smoke)"
                />
                <path
                    d="M91.0854 76.8483L298.568 6.83508L456.166 28.4487L460.416 57.082L91.0854 76.8483Z"
                    fill="var(--black)"
                />
            </svg>

            <div className={styles.bar}>
                <div className={styles.indicator}>
                    <div
                        className={styles.filled}
                        style={{ width: `${progress}%` }}
                    />
                    <div className={styles.percent}>
                        {'$'}
                        {progress}%
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function HomePage() {
    const targetDate = new Date('2024-11-15T09:00:00-05:00').getTime();
    const now = new Date().getTime();
    const diffInMilliseconds = targetDate - now;
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    const initialHours = Math.floor(diffInSeconds / 3600);
    const initialMinutes = Math.floor((diffInSeconds % 3600) / 60);
    const initialSeconds = diffInSeconds % 60;
    // const [showProgress, setShowProgress] = useState<boolean>(false);

    // useEffect(() => {
    //     setTimeout(() => {
    //         setShowProgress(true);
    //     }, 3000);
    // }, []);

    return (
        <div className={styles.page}>
            <header>
                <div className="maxwidth">
                    <div className={styles.heading}>
                        <Title />
                        <Countdown
                            initialHours={initialHours}
                            initialMinutes={initialMinutes}
                            initialSeconds={initialSeconds}
                        />
                        {/* {showProgress && <Progress />} */}
                        <Progress />
                        {/* Verses */}
                        <div style={{ fontSize: 16, color: 'var(--cement)' }}>
                            <div style={{ marginBottom: 44 }}>
                                <div>
                                    Ask and it will be given to you; seek and
                                    you will find; knock and the door will be
                                    opened to you.
                                </div>
                            </div>
                            <div>
                                Therefore I tell you, all that you ask for in
                                prayer, believe that you will receive it and it
                                shall be yours.
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}
