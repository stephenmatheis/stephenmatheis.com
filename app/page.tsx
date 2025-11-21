'use client';

import { useEffect, useState } from 'react';
import * as motion from 'motion/react-client';
import { useMotionValueEvent, useScroll, useTransform } from 'motion/react';
import { Sheet } from '@/components/sheet';
import styles from './page.module.scss';

export default function AboutPage() {
    const { scrollY } = useScroll();
    const backgroundPositionY = useTransform(() => scrollY.get() * 0.1);
    const [scrollDirection, setScrollDirection] = useState('down');

    useMotionValueEvent(scrollY, 'change', (current) => {
        const previous = scrollY.getPrevious();
        const diff = previous !== undefined ? current - previous : 0;

        setScrollDirection(diff > 0 ? 'down' : 'up');
    });

    useEffect(() => {
        console.log(scrollDirection);
    }, [scrollDirection]);

    return (
        <div className={styles.page}>
            <div className={styles.background}>
                <div className={styles.floor}>
                    <motion.div style={{ backgroundPositionY }} className={styles.grid} />
                </div>
            </div>
            <div className={styles.objects}>
                <Sheet scrollY={scrollY} />
            </div>
        </div>
    );
}
