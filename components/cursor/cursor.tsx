'use client';

import { useEffect, useRef } from 'react';
import * as motion from 'motion/react-client';
import { useCursor } from '@/providers/cursor';
import styles from './cursor.module.scss';

export function Cursor() {
    const { left, width, grow } = useCursor();
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function onMove(event: PointerEvent) {
            if (event.pointerType === 'touch') {
                console.log('touch event');

                return;
            }

            let x = event.clientX;
            let y = event.clientY;
            let cursor = ref.current;

            if (!cursor) return;

            // console.log('x:', x, 'left:', left);

            cursor.style.transform = `translate(${x - (left > 0 ? x - left - width / 2 : 0)}px, ${y}px)`;

            // if (left > 0) {
            //     cursor.style.transition =
            //         'transform 281ms linear(0.00, -0.0298, 0.0324, 0.153, 0.306, 0.468, 0.624, 0.763, 0.880, 0.971, 1.04, 1.08, 1.10, 1.11, 1.11, 1.10, 1.08, 1.07, 1.05, 1.03, 1.02, 1.01, 0.998, 0.993, 0.989, 0.988, 0.988, 0.989, 0.990, 0.992, 0.994, 0.996, 0.997, 0.999, 1.00, 1.00)';
            // } else {
            //     cursor.style.transition = 'none';
            // }
        }

        function onLeave() {
            let cursor = ref.current;

            if (!cursor) return;

            cursor.style.opacity = '0';
        }

        function onEnter() {
            let cursor = ref.current;

            if (!cursor) return;

            cursor.style.opacity = '1';
        }

        document.addEventListener(
            'pointermove',
            () => {
                console.log('remove custom cursor');
                document.documentElement.classList.add('cursor-loaded');
            },
            { once: true }
        );

        document.addEventListener('pointermove', onMove);
        document.addEventListener('pointerleave', onLeave);
        document.addEventListener('pointerenter', onEnter);

        return () => {
            document.removeEventListener('pointermove', onMove);
            document.removeEventListener('pointerleave', onLeave);
            document.removeEventListener('pointerenter', onEnter);
        };
    }, [left, width]);

    return (
        <motion.div
            ref={ref}
            className={styles.cursor}
            variants={{
                normal: {
                    height: 16,
                    width: 16,
                    borderRadius: 8,
                    left: -8,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    transition: { type: 'spring', stiffness: 300, damping: 25 },
                },
                link: {
                    height: 16,
                    width: width + 14,
                    borderRadius: 4,
                    left: (width + 14) / -2,
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    transition: { type: 'spring', stiffness: 300, damping: 15 },
                },
                item: {
                    height: 16,
                    width: width + 28,
                    borderRadius: 4,
                    left: (width + 28) / -2,
                    // left: -8,
                    backgroundColor: 'rgba(255, 0, 0, 0.075)',
                    transition: { type: 'spring', stiffness: 200, damping: 12 },
                },
            }}
            initial="normal"
            animate={grow}
            // transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        />
    );
}
