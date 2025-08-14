'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import * as motion from 'motion/react-client';
import { useCursor } from '@/providers/cursor-provider';
import styles from './cursor.module.scss';

// TODO: Don't allow mouse movement until boot

export function Cursor() {
    const pathname = usePathname();
    const { position, setPosition } = useCursor();
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setPosition((prev) => ({
            ...prev,
            top: 0,
            left: 0,
            height: 0,
            width: 0,
            type: 'normal',
        }));
    }, [pathname, setPosition]);

    useEffect(() => {
        function hideCustomCursor() {
            console.log('remove custom cursor');
            document.documentElement.classList.add('cursor-loaded');
        }

        document.addEventListener('pointermove', hideCustomCursor, { once: true });

        return () => {
            document.removeEventListener('pointermove', hideCustomCursor);
        };
    }, []);

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
                        height: position.height + 4,
                        width: position.width + 14,
                        borderRadius: 4,
                        top: (position.height + 4) / -2,
                        left: (position.width + 14) / -2,
                        backgroundColor: 'var(--accent-background)',
                        transition: { type: 'spring', stiffness: 300, damping: 15 },
                    },
                    path: {
                        height: position.height + 4,
                        width: position.width + 14,
                        borderRadius: 4,
                        top: (position.height + 4) / -2,
                        left: (position.width + 14) / -2,
                        backgroundColor: 'var(--accent-background)',
                        transition: { type: 'spring', stiffness: 300, damping: 15 },
                    },
                    button: {
                        height: position.height + 14,
                        width: position.width + 14,
                        borderRadius: 4,
                        top: (position.height + 14) / -2,
                        left: (position.width + 14) / -2,
                        backgroundColor: 'var(--accent-background)',
                        transition: { type: 'spring', stiffness: 300, damping: 15 },
                    },
                    line: {
                        height: position.height + 4,
                        width: 644 + 28 + 42,
                        borderRadius: 4,
                        top: (position.height + 4) / -2,
                        // left: (position.width + 7) / -2,
                        left: -21,
                        backgroundColor: 'var(--accent-background)',
                        transition: { type: 'spring', stiffness: 300, damping: 15 },
                    },
                    markup: {
                        height: position.height + 4,
                        width: position.width + 7,
                        borderRadius: 4,
                        top: (position.height + 4) / -2,
                        left: (position.width + 7) / -2,
                        backgroundColor: 'var(--accent-background)',
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
