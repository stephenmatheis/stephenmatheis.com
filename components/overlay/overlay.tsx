'use client';

import { useEffect, useMemo, useState } from 'react';
import { useOverlay } from '@/providers/overlay';
import type { Overlay } from '@/providers/overlay';
import styles from './overlay.module.scss';

export function Overlay() {
    const [viewport, setViewport] = useState({ width: 0, height: 0 });
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const { overlays, setOverlays } = useOverlay();
    const isAllOn = useMemo(() => Object.values(overlays).every(({ isOn }) => isOn), [overlays]);

    useEffect(() => {
        function updateMousePosition(event: PointerEvent) {
            setMousePosition({
                x: event.clientX,
                y: event.clientY,
            });
        }

        function onResize() {
            setViewport({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('resize', onResize);

        onResize();

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('resize', onResize);
        };
    }, []);

    return (
        <>
            {/* Overlay */}
            <div className={styles.overlay}>
                {/* <Panel /> */}

                {/* Top Left */}
                <svg
                    className={styles['corner-left']}
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect x="4" width="28" height="1" fill="black" />
                    <rect x="3" y="1" width="1" height="1" fill="black" />
                    <rect x="2" y="1" width="1" height="1" fill="black" />
                    <rect x="1" y="2" width="1" height="1" fill="black" />
                    <rect x="1" y="3" width="1" height="1" fill="black" />
                    <rect y="4" width="1" height="28" fill="black" />
                </svg>

                {/* Bottom Right */}
                <svg
                    className={styles['corner-right']}
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect x="28" y="32" width="28" height="1" transform="rotate(180 28 32)" fill="black" />
                    <rect x="29" y="31" width="1" height="1" transform="rotate(180 29 31)" fill="black" />
                    <rect x="30" y="31" width="1" height="1" transform="rotate(180 30 31)" fill="black" />
                    <rect x="31" y="30" width="1" height="1" transform="rotate(180 31 30)" fill="black" />
                    <rect x="31" y="29" width="1" height="1" transform="rotate(180 31 29)" fill="black" />
                    <rect x="32" y="28" width="1" height="28" transform="rotate(180 32 28)" fill="black" />
                </svg>

                {/* Top Left */}

                {/* Top Right */}

                {/* Bottom Left */}
                <div className={styles.bottomleft}></div>

                {/* Bottom Right */}
                <div className={styles.bottomright}></div>
            </div>
        </>
    );
}
