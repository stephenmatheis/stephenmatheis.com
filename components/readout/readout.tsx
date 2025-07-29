'use client';

import { useEffect, useState } from 'react';
import styles from './readout.module.scss';

export function Readout() {
    const [viewport, setViewport] = useState({ width: 0, height: 0 });
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
        <div className={styles['readout-wrapper']}>
            <div className={styles.readout}>
                <div className={styles.block}>
                    <div className={styles.title}>Viewport</div>
                    <div className={styles.item}>
                        <span className={styles.name}>Width</span>
                        <span className={styles.value}>{viewport.width}px</span>
                    </div>
                    <div className={styles.item}>
                        <span className={styles.name}>Height</span>
                        <span className={styles.value}>{viewport.height}px</span>
                    </div>
                </div>
                <div className={styles.block}>
                    <div className={styles.title}>Pointer</div>
                    <div className={styles.item}>
                        <span className={styles.name}>X</span>
                        <span className={styles.value}>{mousePosition.x}px</span>
                    </div>
                    <div className={styles.item}>
                        <span className={styles.name}>Y</span>
                        <span className={styles.value}>{mousePosition.y}px</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
