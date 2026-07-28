'use client';

import { useEffect, useRef } from 'react';
import styles from './Reticle.module.scss';

const EASE = 0.18;

type ReticleProps = {
    accent?: string;
};

// A second, lagged cursor rather than a replacement for the real one —
// swapping the OS cursor for a custom one is a common FUI move but it
// costs the user their actual pointer feedback. This trails behind it
// instead (position lerped toward the real cursor every frame), so it
// reads as a targeting ring riding along rather than a hijacked cursor.
export function Reticle({ accent }: ReticleProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (window.matchMedia('(pointer: coarse)').matches) return;

        const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        const target = { ...pos };
        let frame: number;

        function handleMove(event: MouseEvent) {
            target.x = event.clientX;
            target.y = event.clientY;
        }

        function loop() {
            pos.x += (target.x - pos.x) * EASE;
            pos.y += (target.y - pos.y) * EASE;
            ref.current?.style.setProperty('transform', `translate(${pos.x}px, ${pos.y}px)`);
            frame = requestAnimationFrame(loop);
        }

        window.addEventListener('mousemove', handleMove);
        frame = requestAnimationFrame(loop);

        return () => {
            window.removeEventListener('mousemove', handleMove);
            cancelAnimationFrame(frame);
        };
    }, []);

    return (
        <div ref={ref} className={styles.reticle} style={{ '--accent': accent } as React.CSSProperties}>
            <span className={styles.ring} />
            <span className={styles.dot} />
        </div>
    );
}
