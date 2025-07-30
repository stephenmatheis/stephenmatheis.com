'use client';

import { useEffect, useRef } from 'react';
import * as motion from 'motion/react-client';
import { useCursor } from '@/providers/cursor';
import styles from './cursor.module.scss';

export function Cursor() {
    const { width, grow } = useCursor();
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function onMove(event: PointerEvent) {
            let x = event.clientX;
            let y = event.clientY;
            let cursor = ref.current;

            if (!cursor) return;

            cursor.style.transform = `translate(${x}px, ${y}px)`;
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
    }, []);

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
                },
                link: {
                    height: 16,
                    width: width + 14,
                    borderRadius: 4,
                    left: (width + 14) / -2,
                    backgroundColor: 'rgba(0, 0, 0, 0.15)',
                },
            }}
            initial="normal"
            animate={grow ? 'link' : 'normal'}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        />
    );
}
