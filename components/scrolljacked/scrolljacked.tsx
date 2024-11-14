'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './scrolljacked.module.scss';
import Image from 'next/image';
import cybertruck from '../../public/cybertruck/Cybertruck_95.jpg';

export function ScrollJacked() {
    const tendRef = useRef<HTMLDivElement | null>(null);
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const tendElement = tendRef.current;

            if (!tendElement) return;

            const { top } = tendElement.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            const visibleRatio = Math.min(
                Math.max((windowHeight - top) / windowHeight, 0),
                1
            );

            setOpacity(visibleRatio);

            document.documentElement.style.setProperty(
                '--opacity',
                visibleRatio.toString()
            );
        };

        window.addEventListener('scroll', handleScroll);

        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className={styles.transition}>
            <div className={styles.sticky} style={{ opacity }}>
                <Image src={cybertruck} alt="cybertruck" />
            </div>
            <div className={styles.end} ref={tendRef} />
        </section>
    );
}
