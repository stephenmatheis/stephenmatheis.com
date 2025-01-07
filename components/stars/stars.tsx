import { CSSProperties } from 'react';
import classNames from 'classnames';
import styles from './stars.module.scss';

export function Stars({
    count,
    color = '',
    baseDelay = 10,
    load = false,
}: {
    count: number;
    color?: string;
    baseDelay?: number;
    load?: boolean;
}) {
    return (
        <div className={classNames(styles.stars, { [styles.load]: load })}>
            {Array.from({ length: count }).map((_, i) => (
                <Star key={i} color={color} baseDelay={baseDelay} />
            ))}
        </div>
    );
}

function Star({
    color = '',
    baseDelay,
}: {
    color?: string;
    baseDelay: number;
}) {
    const pageSize = 100;
    const animationDuration = baseDelay + Math.random() * 5;
    const startTop = Math.random() * pageSize;
    const startLeft = Math.random() * pageSize;
    const size = Math.random() * 1.5 + 1;
    const negativeDelay =
        -1 * animationDuration * (Math.random() * (startTop / pageSize));
    const twinkleDuration = 2 + Math.random();
    const twinkleDelay = -1 * Math.random() * twinkleDuration;

    return (
        <div
            className={classNames(styles.star, styles[color])}
            style={
                {
                    '--start-top': `${startTop}vh`,
                    '--start-left': `${startLeft}vw`,
                    '--size': `${size}px`,
                    '--animation-duration': `${animationDuration}s`,
                    '--animation-delay': `${negativeDelay}s`,
                    '--twinkle-duration': `${twinkleDuration}s`,
                    '--twinkle-delay': `${twinkleDelay}s`,
                } as CSSProperties
            }
        />
    );
}
