'use client';

import { useRef, useState, WheelEvent } from 'react';
import styles from './page.module.scss';

const DOORS = 3;

export default function RootPage() {
    const leftDoors = useRef<(HTMLDivElement | null)[]>([]);
    const rightDoors = useRef<(HTMLDivElement | null)[]>([]);
    const [door, setDoor] = useState<number>(0);
    const [transformX, setTransformX] = useState<number>(0);

    function handleWheel(event: WheelEvent) {
        if (leftDoors.current.length === 0) return;
        if (rightDoors.current.length === 0) return;

        if (event.deltaY > 0) {
            // console.log('Scrolled down');

            setTransformX((prev) =>
                prev + 5 > window.innerWidth / 2
                    ? window.innerWidth / 2
                    : prev + 5
            );

            if (door === DOORS - 1) return;

            if (transformX === window.innerWidth / 2) {
                setDoor((prev) =>
                    prev + 1 > DOORS - 1 ? DOORS - 1 : prev + 1
                );
                setTransformX(0);

                return;
            }
        } else {
            // console.log('Scrolled up');

            setTransformX((prev) => (prev - 5 < 0 ? 0 : prev - 5));

            if (door === 0) return;

            if (transformX >= 0 && transformX <= 5) {
                console.log('reset');
                setDoor((prev) => (prev - 1 < 0 ? 0 : prev - 1));
                setTransformX(window.innerWidth / 2);
            }
        }
    }

    return (
        <div className={styles.doors} onWheel={handleWheel}>
            <div className={styles.left}>
                {[...Array(DOORS)].map((_, index) => (
                    <div
                        ref={(el) => {
                            leftDoors.current[index] = el;
                        }}
                        key={index}
                        className={styles.door}
                        style={{
                            zIndex: DOORS - index,
                            transform: `translateX(${
                                door === index
                                    ? transformX * -1
                                    : door > index
                                    ? (window.innerWidth / 2) * -1
                                    : 0
                            }px)`,
                        }}
                    />
                ))}
            </div>
            <div className={styles.right}>
                {[...Array(DOORS)].map((_, index) => (
                    <div
                        ref={(el) => {
                            rightDoors.current[index] = el;
                        }}
                        key={index}
                        className={styles.door}
                        style={{
                            zIndex: DOORS - index,
                            transform: `translateX(${
                                door === index
                                    ? transformX
                                    : door > index
                                    ? window.innerWidth / 2
                                    : 0
                            }px)`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
