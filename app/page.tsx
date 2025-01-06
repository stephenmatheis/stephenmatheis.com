import { CSSProperties } from 'react';
import classNames from 'classnames';
import styles from './page.module.scss';

function Stars({ count, color = '' }: { count: number; color?: string }) {
    return (
        <div className={styles.stars}>
            {Array.from({ length: count }).map((_, i) => (
                <Star key={i} color={color} />
            ))}
        </div>
    );
}

function Star({ color = '' }: { color?: string }) {
    const pageSize = 300;
    const animationDuration = 10 + Math.random() * 5;
    const startTop = Math.random() * pageSize;
    const startLeft = Math.random() * 100;
    const negativeDelay =
        -1 * animationDuration * (Math.random() * (startTop / pageSize));

    console.log(animationDuration);

    return (
        <div
            className={classNames(styles.star, styles[color])}
            style={
                {
                    '--start-top': `${startTop}vh`,
                    '--start-left': `${startLeft}vw`,
                    '--animation-duration': `${animationDuration}s`,
                    '--animation-delay': `${negativeDelay}s`,
                    top: `var(--start-top)`,
                    left: `var(--start-left)`,
                } as CSSProperties
            }
        />
    );
}

function Planet() {
    return (
        <div className={styles.system}>
            <div className={styles.planet} />
            <div className={styles.moons}>
                <div className={styles.moon} />
            </div>
            <div className={styles.rings} />
        </div>
    );
}

function Station() {
    return (
        <div className={styles.satellites}>
            <div className={styles.orbit}>
                <div className={styles.satellite}>
                    <div className={styles.graphic} />
                </div>
            </div>
            <div className={styles.main} />
        </div>
    );
}

export default function RootPage() {
    return (
        <div className={styles.home}>
            {/* Foreground */}
            <Stars count={200} />
            {/* Middle ground */}
            <Stars count={100} color="gray" />
            {/* Background ground */}
            <Stars count={50} color="dark" />
            {/* Planet */}
            <Planet />
            {/* Station */}
            <Station />
        </div>
    );
}
