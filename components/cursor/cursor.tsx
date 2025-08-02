'use client';

import { useEffect, useRef } from 'react';
import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-client';
import { useCursor } from '@/providers/cursor';
import styles from './cursor.module.scss';

export function Cursor() {
    const { position } = useCursor();
    const ref = useRef<HTMLDivElement>(null);
    const shadowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function onMove(event: PointerEvent) {
            if (event.pointerType === 'touch') {
                console.log('touch event');

                return;
            }

            let x = event.clientX;
            let y = event.clientY;

            let shadow = shadowRef.current;

            if (!shadow) return;

            shadow.style.transform = `translate(${x}px, ${y}px)`;

            // NOTE: original cursor
            let cursor = ref.current;

            if (!cursor) return;

            // cursor.style.transform = `translate(${x}px, ${y}px)`;

            // console.log(x - position.left);
            const { left, width } = position;
            const right = left + width;
            console.log(left, width, right);

            // cursor.style.transform = `translate(${x + (x - position.left)}px, ${y}px)`;

            // cursor.style.transform = `translate(${x - (left > 0 ? x - left - width / 2 : 0)}px, ${y}px)`;
            // cursor.style.transform = `translate(${
            //     x - (position.left > 0 ? x - position.left - position.width / 2 : 0)
            // }px, ${y - (position.top > 0 ? y - position.top - position.height / 2 : 0)}px)`;
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
    }, [position]);

    return (
        <>
            {/* NOTE: original morphing cursor */}
            {/* <motion.div
                ref={ref}
                className={styles.cursor}
                variants={{
                    normal: {
                        height: 16,
                        width: 16,
                        borderRadius: 8,
                        top: -8,
                        left: -8,
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        // transition: { type: 'spring', stiffness: 300, damping: 25 },
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
                    link: {
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
                        width: position.width + 28,
                        borderRadius: 4,
                        top: position.height / -2,
                        left: (position.width + 28) / -2,
                        backgroundColor: 'rgba(255, 0, 0, 0.1)',
                        transition: { type: 'spring', stiffness: 200, damping: 12 },
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
                }}
                initial="normal"
                animate={position.type}
            /> */}

            {/* DEV: new animation */}
            {/* <AnimatePresence> */}
            {/* {position.type !== 'normal'  && ( */}
            <motion.div
                ref={ref}
                className={styles.cursor}
                variants={{
                    hidden: {
                        height: 16,
                        width: 16,
                        borderRadius: 8,
                        top: -8,
                        left: -8,
                        opacity: 1,
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        transition: { type: 'spring', stiffness: 300, damping: 15 },
                    },
                    button: {
                        height: position.height,
                        width: position.width + 14,
                        borderRadius: 4,
                        // top: position.height / -2,
                        // left: (position.width + 14) / -2,
                        top: -8,
                        left: -8,
                        opacity: 1,
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        transition: { type: 'spring', stiffness: 300, damping: 15 },
                    },
                    OFF: {
                        height: position.height,
                        width: position.width + 14,
                        borderRadius: 4,
                        // top: position.height / -2,
                        // left: (position.width + 14) / -2,
                        top: 0,
                        left: -7,
                        y: position.top,
                        x: position.left,
                        opacity: 1,
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        transition: { type: 'spring', stiffness: 300, damping: 15 },
                    },
                }}
                initial="hidden"
                animate={position.type}
                // initial="hidden"
                // exit="hidden"
            />
            {/* )} */}
            {/* </AnimatePresence> */}

            {/* DEV: new tiny cursor */}
            <motion.div
                ref={shadowRef}
                className={styles.shadow}
                variants={{
                    hidden: {
                        opacity: 0,
                        transition: { type: 'spring', stiffness: 300, damping: 15 },
                    },
                    visible: {
                        opacity: 1,
                        transition: { type: 'spring', stiffness: 300, damping: 15 },
                    },
                }}
                initial="hidden"
                animate="visible"
            />
        </>
    );
}
