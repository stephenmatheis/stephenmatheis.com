'use client';

import { CSSProperties, useEffect, useRef } from 'react';
import styles from './cursor.module.scss';

const LINE_WIDTH = 88;
const OFFSET = LINE_WIDTH / 2;

export function Cursor() {
    const top = useRef<HTMLDivElement>(null);
    const left = useRef<HTMLDivElement>(null);
    const bottom = useRef<HTMLDivElement>(null);
    const right = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function onMove(event: PointerEvent) {
            let x = event.clientX;
            let y = event.clientY;

            if (!top.current) return;

            top.current.style.transform = `translateX(${x - OFFSET}px)`;
            top.current.style.height = `calc(${y - OFFSET}px)`;

            if (!bottom.current) return;

            bottom.current.style.transform = `translate(${event.clientX - OFFSET}px,0)`;
            bottom.current.style.height = `calc(100dvh - ${y + OFFSET}px)`;

            if (!left.current) return;

            left.current.style.transform = `translateY(${event.clientY - OFFSET}px)`;
            left.current.style.width = `calc(${event.clientX - OFFSET}px)`;

            if (!right.current) return;

            right.current.style.transform = `translateY(${event.clientY - OFFSET}px)`;
            right.current.style.width = `calc(100vw - ${event.clientX + OFFSET}px)`;
        }

        function onLeave() {
            if (!top.current) return;

            top.current.style.backgroundColor = 'gray';

            if (!bottom.current) return;

            bottom.current.style.backgroundColor = 'gray';

            if (!left.current) return;

            left.current.style.backgroundColor = 'gray';

            if (!right.current) return;

            right.current.style.backgroundColor = 'gray';
        }

        function onEnter() {
            if (!top.current) return;

            top.current.style.backgroundColor = 'orange';

            if (!bottom.current) return;

            bottom.current.style.backgroundColor = 'orange';

            if (!left.current) return;

            left.current.style.backgroundColor = 'orange';

            if (!right.current) return;

            right.current.style.backgroundColor = 'orange';
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
        // document.addEventListener('pointerleave', onLeave);
        // document.addEventListener('pointerenter', onEnter);

        return () => {
            document.removeEventListener('pointermove', onMove);
            document.removeEventListener('keydown', onKeydown);
            // document.removeEventListener('pointerleave', onLeave);
            // document.removeEventListener('pointerenter', onEnter);
        };
    }, []);

    return (
        <div className={styles.cursor} style={{ '--line-width': `${LINE_WIDTH}px` } as CSSProperties}>
            <div ref={top} className={styles.top} />
            <div ref={bottom} className={styles.bottom} />
            <div ref={left} className={styles.left} />
            <div ref={right} className={styles.right} />
        </div>
    );
}
