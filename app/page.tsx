import { CSSProperties } from 'react';
import classNames from 'classnames';
import styles from './page.module.scss';

function Stars({
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

function PlanetWithOrbit() {
    return (
        <div className={classNames(styles.plane, styles.right)}>
            <div className={styles.orbit}>
                <div className={styles.moon}>
                    <div className={styles.graphic} />
                </div>
            </div>
            <div className={classNames(styles.main, styles.red)} />
        </div>
    );
}

function PlanetWithRings() {
    return (
        <div className={classNames(styles.plane, styles.rings, styles.left)}>
            <div className={classNames(styles.ring, styles.one)} />
            <div className={classNames(styles.ring, styles.two)} />
            <div className={classNames(styles.ring, styles.three)} />
            <div className={classNames(styles.main, styles.blue)} />
        </div>
    );
}

export default function RootPage() {
    return (
        <div className={styles.home}>
            <Stars count={100} load />
            <Stars count={100} />
            <Stars count={50} color="gray" baseDelay={20} />
            <Stars count={25} color="dark" baseDelay={30} />
            <Planet />
            <PlanetWithOrbit />
            <PlanetWithRings />
        </div>
    );
}
