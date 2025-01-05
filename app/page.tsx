import { CSSProperties } from 'react';
import classNames from 'classnames';
import styles from './page.module.scss';

const PAGE_SIZE = 300;

function Stars({ count }: { count: number }) {
    return (
        <div className={styles.stars}>
            {Array.from({ length: count }).map((_, i) => (
                <Star key={i} />
            ))}
        </div>
    );
}

function Star({ color = '' }: { color?: string }) {
    const animationDuration = 5 + Math.random() * 5;
    const startTop = Math.random() * PAGE_SIZE;
    const startLeft = Math.random() * 100;
    const negativeDelay =
        -1 * animationDuration * (Math.random() * (startTop / PAGE_SIZE));

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

function Nebula() {
    return (
        <div className={styles.nebula}>
            {Array.from({ length: 3 }).map((_, i) => {
                const x = Math.random() * 100; // Random position
                const y = Math.random() * 100;
                const size = 30 + Math.random() * 50; // Random size
                const color = `rgba(${Math.random() * 255}, ${
                    Math.random() * 255
                }, ${Math.random() * 255}, 0.2)`;

                return (
                    <div
                        key={i}
                        className={styles.cloud}
                        style={{
                            top: `${y}%`,
                            left: `${x}%`,
                            width: `${size}vw`,
                            height: `${size}vw`,
                            background: `radial-gradient(circle, ${color}, transparent)`,
                        }}
                    />
                );
            })}
        </div>
    );
}

function Person() {
    return (
        <div className={styles.person}>
            <div className={styles.head} />
            <div className={styles.torso} />
            <div className={styles.arms}>
                <div className={classNames(styles.arm, styles.left)} />
                <div className={classNames(styles.arm, styles.right)} />
            </div>
            <div className={styles.legs}>
                <div className={classNames(styles.leg, styles.left)} />
                <div className={classNames(styles.leg, styles.right)} />
            </div>
        </div>
    );
}

function Planet() {
    return (
        <div className={styles.system}>
            <div className={styles.planet} />
            <div className={styles.moon} />
            <div className={styles.rings} />
        </div>
    );
}

export default function RootPage() {
    return (
        <div className={styles.home}>
            {/* Foreground */}
            <Stars count={100} />
            {/* Middle ground */}
            <Stars count={50} />
            {/* Background ground */}
            <Stars count={25} />
            {/* Planet */}
            <Planet />
        </div>
    );
}
