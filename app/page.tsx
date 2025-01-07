import { CSSProperties } from 'react';
import classNames from 'classnames';
import styles from './page.module.scss';
import { Stars } from '@/components/stars';

function System() {
    return (
        <div className={styles.system}>
            <div className={styles.planet} />
            {/* <div className={styles.moons}>
                <div className={styles.moon} />
            </div> */}
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

function Planet({
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

export default function RootPage() {
    return (
        <div className={styles.home}>
            <Stars count={100} load />
            <Stars count={100} />
            <Stars count={50} color="gray" baseDelay={20} />
            <Stars count={25} color="dark" baseDelay={30} />
            <Planet color="green" className="rise" size={'80vw'} />
            {/* <PlanetWithOrbit /> */}
            {/* <PlanetWithRings /> */}
            {/* <SmallPlanet top="0vh" left="0vw" color="tan" size={100} /> */}
            {/* <SmallPlanet top="00vh" right="0vw" color="purple" size={50} /> */}
        </div>
    );
}
