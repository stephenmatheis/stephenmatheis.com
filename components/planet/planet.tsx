'use client';

import { CSSProperties, useEffect, useRef } from 'react';
import classNames from 'classnames';
import styles from './planet.module.scss';

export function Planet({
    top,
    left,
    right,
    bottom,
    size,
    color,
    moon = false,
    className = '',
    startMove = false,
    handleMove = () => {},
    handleEnter = () => {},
}: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    size: number | string;
    color: string;
    moon?: boolean;
    className?: string;
    startMove?: boolean;
    handleMove?: () => void;
    handleEnter?: () => void;
}) {
    const planetRef = useRef<HTMLDivElement>(null);

    function onScroll() {
        if (!planetRef.current) return;

        const maxScroll = 768;
        const minScale = 0.5;
        const maxScale = 1;

        const scrollY = Math.min(window.scrollY, maxScroll);
        const scaleFactor =
            maxScale - (scrollY / maxScroll) * (maxScale - minScale);

        planetRef.current.style.setProperty(
            '--scale-factor',
            scaleFactor.toString()
        );
    }

    useEffect(() => {
        document.addEventListener('scroll', onScroll);

        return () => {
            document.removeEventListener('scroll', onScroll);
        };
    }, [onScroll]);

    return (
        <div
            ref={planetRef}
            style={
                {
                    ...(top ? { top } : {}),
                    ...(left ? { left } : {}),
                    ...(right ? { right } : {}),
                    ...(bottom ? { bottom } : {}),
                    '--scale-factor': '1',
                    '--planet-size':
                        typeof size === 'number' ? `${size}px` : size,
                } as CSSProperties
            }
            className={classNames(styles.planet, styles[className], {
                [styles.shift]: startMove,
            })}
        >
            {moon && (
                <div className={styles.orbit}>
                    <div className={styles.moon}>
                        <div className={styles.graphic} />
                    </div>
                </div>
            )}
            <div
                className={classNames(styles.body, styles[color])}
                // onClick={() => {
                //     handleMove();

                //     setTimeout(() => {
                //         handleEnter();
                //     }, 2000);
                // }}
            />
        </div>
    );
}
