
'use client';

import { useEffect, useState } from 'react';
import styles from './Time.module.scss';

export function Time() {
    const [time, setTime] = useState<string>('00:00');

    useEffect(() => {
        let timeoutId: NodeJS.Timeout | null = null;
        let intervalId: NodeJS.Timeout | null = null;

        function updateTime() {
            const now = new Date();
            const HH_MM = now.toLocaleTimeString('en-us', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            });

            setTime(HH_MM);
        }

        updateTime();

        const msIntoCurrentMinute = Date.now() % 60000;
        const msToNextMinute = 60000 - msIntoCurrentMinute;

        timeoutId = setTimeout(() => {
            updateTime();

            intervalId = setInterval(updateTime, 60000);
        }, msToNextMinute);

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
            if (intervalId) clearInterval(intervalId);
        };
    }, []);

    return (
        <div className={styles.time}>
            <svg width="16" height="16" viewBox="0 0 16 16" strokeLinejoin="round">
                <path
                    d="M14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM8.75 4.75V4H7.25V4.75V7.875C7.25 8.18976 7.39819 8.48615 7.65 8.675L9.55 10.1L10.15 10.55L11.05 9.35L10.45 8.9L8.75 7.625V4.75Z"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    fill="currentColor"
                />
            </svg>
            <span>{time}</span>
        </div>
    );
}
