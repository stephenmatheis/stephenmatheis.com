import { CSSProperties } from 'react';
import classNames from 'classnames';
import styles from './planet.module.scss';

export function Planet({
    top,
    left,
    right,
    bottom,
    color,
    size,
    className = '',
}: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    color: string;
    size: number | string;
    className?: string;
}) {
    return (
        <div
            style={
                {
                    ...(top ? { top } : {}),
                    ...(left ? { left } : {}),
                    ...(right ? { right } : {}),
                    ...(bottom ? { bottom } : {}),
                    color,
                    '--planet-size':
                        typeof size === 'number' ? `${size}px` : size,
                } as CSSProperties
            }
            className={classNames(styles.plane, styles[className])}
        >
            <div className={classNames(styles.main, styles[color])} />
        </div>
    );
}
