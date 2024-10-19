'use client';

import { useEffect, useRef } from 'react';
import styles from './scrolljacked.module.scss';

export function ScrollJacked() {
    const tendRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const tendElement = tendRef.current;

        if (!tendElement) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    document.documentElement.style.setProperty('--t', '100%');
                } else {
                    document.documentElement.style.setProperty('--t', '0%');
                }
            },
            {
                threshold: 0, // Trigger as soon as tend enters/exits the viewport
                rootMargin: '400px', // Adjust to get the timing you need
            }
        );

        observer.observe(tendElement);

        return () => observer.disconnect();
    }, []);

    return (
        <section className={styles.transition}>
            <div className={styles.sticky}>
                Scroll down and watch the magic!
            </div>
            <div className={styles.end} ref={tendRef} />
        </section>
    );
}
