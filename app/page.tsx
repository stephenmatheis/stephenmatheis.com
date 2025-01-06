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
            <Stars count={200} />
            <Stars count={100} color="gray" />
            <Stars count={50} color="dark" />
            {/* <Planet />
            <PlanetWithOrbit /> */}
            <PlanetWithRings />
        </div>
    );
}
