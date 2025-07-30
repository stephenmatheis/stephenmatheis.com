'use client';

import { CSSProperties, useEffect, useRef, useState } from 'react';
import * as motion from 'motion/react-client';
import styles from './cursor.module.scss';

const LINE_WIDTH = 1;
const OFFSET = LINE_WIDTH / 2;
const START_Y = 16.5 * 4;
const START_X = 7 * 10;
const STIFFNESS = 200;
const DAMPING = 25;

export function Cursor() {
    const top = useRef<HTMLDivElement>(null);
    const left = useRef<HTMLDivElement>(null);
    const bottom = useRef<HTMLDivElement>(null);
    const right = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (loading) return;

        function onMove(event: PointerEvent) {
            let x = event.clientX;
            let y = event.clientY;

            if (!top.current) return;

            top.current.style.transform = `translateX(${x - OFFSET}px)`;
            top.current.style.height = `calc(${y - OFFSET}px)`;

            if (!bottom.current) return;

            bottom.current.style.transform = `translateX(${event.clientX - OFFSET}px)`;
            bottom.current.style.height = `calc(100dvh - ${y + OFFSET}px)`;

            if (!left.current) return;

            left.current.style.transform = `translateY(${event.clientY - OFFSET}px)`;
            left.current.style.width = `calc(${x - OFFSET}px)`;

            if (!right.current) return;

            right.current.style.transform = `translateY(${event.clientY - OFFSET}px)`;
            right.current.style.width = `calc(100vw - ${x + OFFSET}px)`;
        }

        function onLeave() {
            console.log('leave');

            // if (!top.current) return;

            // top.current.style.backgroundColor = 'gray';

            // if (!bottom.current) return;

            // bottom.current.style.backgroundColor = 'gray';

            // if (!left.current) return;

            // left.current.style.backgroundColor = 'gray';

            // if (!right.current) return;

            // right.current.style.backgroundColor = 'gray';
        }

        function onEnter() {
            console.log('enter');

            // if (!top.current) return;

            // top.current.style.backgroundColor = 'orange';

            // if (!bottom.current) return;

            // bottom.current.style.backgroundColor = 'orange';

            // if (!left.current) return;

            // left.current.style.backgroundColor = 'orange';

            // if (!right.current) return;

            // right.current.style.backgroundColor = 'orange';
        }

        function onKeydown(event: KeyboardEvent) {
            if (event.key === 'p' && event.shiftKey && event.metaKey) {
                event.preventDefault();

                alert('hi');
                return;
            }
        }

        document.addEventListener('pointermove', onMove);
        document.addEventListener('keydown', onKeydown);
        document.addEventListener('pointerleave', onLeave);
        document.addEventListener('pointerenter', onEnter);

        return () => {
            document.removeEventListener('pointermove', onMove);
            document.removeEventListener('keydown', onKeydown);
            document.removeEventListener('pointerleave', onLeave);
            document.removeEventListener('pointerenter', onEnter);
        };
    }, [loading]);

    return (
        <div className={styles.cursor} style={{ '--line-width': `${LINE_WIDTH}px` } as CSSProperties}>
            <motion.div
                ref={top}
                className={styles.top}
                style={{ transform: `translateX(${START_X - OFFSET}px)` }}
                initial={{ height: 0 }}
                animate={{ height: `calc(${START_Y - OFFSET}px)` }}
                transition={{ type: 'spring', stiffness: STIFFNESS, damping: DAMPING }}
            />
            <motion.div
                ref={bottom}
                className={styles.bottom}
                style={{ transform: `translateX(${START_X - OFFSET}px)` }}
                initial={{ height: 0 }}
                animate={{ height: `calc(100dvh - ${START_Y + OFFSET}px)` }}
                transition={{ type: 'spring', stiffness: STIFFNESS, damping: DAMPING }}
            />
            <motion.div
                ref={left}
                className={styles.left}
                style={{ transform: `translateY(${START_Y - OFFSET}px)` }}
                initial={{ width: 0 }}
                animate={{ width: `calc(${START_X - OFFSET}px)` }}
                transition={{ type: 'spring', stiffness: STIFFNESS, damping: DAMPING }}
            />
            <motion.div
                ref={right}
                className={styles.right}
                style={{ transform: `translateY(${START_Y - OFFSET}px)` }}
                initial={{ width: 0 }}
                animate={{ width: `calc(100vw - ${START_X + OFFSET}px)` }}
                transition={{ type: 'spring', stiffness: STIFFNESS, damping: DAMPING }}
                onAnimationComplete={() => setLoading(false)}
            />
        </div>
    );
}
