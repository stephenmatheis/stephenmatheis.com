'use client';

import { CSSProperties } from 'react';
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
    return (
        <div
            style={
                {
                    ...(top ? { top } : {}),
                    ...(left ? { left } : {}),
                    ...(right ? { right } : {}),
                    ...(bottom ? { bottom } : {}),
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
                onClick={() => {
                    handleMove();

                    setTimeout(() => {
                        handleEnter();
                    }, 2000);
                }}
            />
        </div>
    );
}
