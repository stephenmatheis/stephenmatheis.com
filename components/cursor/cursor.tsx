'use client';

import { useEffect, useRef } from 'react';
import * as motion from 'motion/react-client';
import { useCursor } from '@/providers/cursor-provider';
import styles from './cursor.module.scss';

export function Cursor() {
    const { position } = useCursor();
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

            cursor.style.transform = `translate(${
                x - (position.left > 0 ? x - position.left - position.width / 2 : 0)
            }px, ${y - (position.top > 0 ? y - position.top - position.height / 2 : 0)}px)`;
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

        function hideCustomCursor() {
            console.log('remove custom cursor');
            document.documentElement.classList.add('cursor-loaded');
        }

        document.addEventListener('pointermove', hideCustomCursor, { once: true });
        document.addEventListener('pointermove', onMove);
        document.addEventListener('pointerleave', onLeave);
        document.addEventListener('pointerenter', onEnter);

        return () => {
            document.removeEventListener('pointermove', onMove);
            document.removeEventListener('pointerleave', onLeave);
            document.removeEventListener('pointerenter', onEnter);
        };
    }, [position]);

    return (
        <>
            <motion.div
                ref={ref}
                className={styles.cursor}
                variants={{
                    normal: {
                        height: 16,
                        width: 16,
                        borderRadius: 8,
                        top: -8,
                        left: -8,
                        backgroundColor: 'rgba(0, 0, 0, .3)',
                        transition: { type: 'spring', stiffness: 300, damping: 15 },
                    },
                    link: {
                        height: position.height,
                        width: position.width + 14,
                        borderRadius: 4,
                        top: position.height / -2,
                        left: (position.width + 14) / -2,
                        backgroundColor: 'rgba(0, 0, 255, 0.1)',
                        transition: { type: 'spring', stiffness: 300, damping: 15 },
                    },
                    path: {
                        height: position.height,
                        width: position.width + 14,
                        borderRadius: 4,
                        top: position.height / -2,
                        left: (position.width + 14) / -2,
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        transition: { type: 'spring', stiffness: 300, damping: 15 },
                    },
                    item: {
                        height: position.height,
                        width: position.width + 14,
                        borderRadius: 4,
                        top: position.height / -2,
                        left: (position.width + 14) / -2,
                        backgroundColor: 'rgba(255, 0, 0, 0.1)',
                        transition: { type: 'spring', stiffness: 200, damping: 15 },
                    },
                    button: {
                        height: position.height,
                        width: position.width + 14,
                        borderRadius: 4,
                        top: position.height / -2,
                        left: (position.width + 14) / -2,
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        transition: { type: 'spring', stiffness: 300, damping: 15 },
                    },
                    markup: {
                        height: position.height + 8,
                        width: position.width + 14,
                        borderRadius: 4,
                        top: (position.height + 8) / -2,
                        left: (position.width + 14) / -2,
                        backgroundColor: 'rgba(255, 0, 0, 0.1)',
                        transition: { type: 'spring', stiffness: 300, damping: 15 },
                    },
                    tab: {
                        height: 32,
                        width: 24,
                        borderRadius: 4,
                        top: -16,
                        left: -12,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        transition: { type: 'spring', stiffness: 300, damping: 15 },
                    },
                    moving: {
                        height: 24,
                        width: 48,
                        borderRadius: 4,
                        top: -12,
                        left: -24,
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        transition: { type: 'spring', stiffness: 300, damping: 15 },
                    },
                }}
                initial="normal"
                animate={position.type}
            />
        </>
    );
}
