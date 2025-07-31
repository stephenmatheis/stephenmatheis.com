'use client';

import * as motion from 'motion/react-client';
import { useOverlay } from '@/providers/overlay';
import type { Overlay } from '@/providers/overlay';
import { useCursor } from '@/providers/cursor';
import styles from './legend.module.scss';

type Item = {
    key: string;
    name: string;
    value: string;
    alt: string;
};

type LegendProps = {
    items: Item[];
};

export function Legend({ items }: LegendProps) {
    const { overlays, setOverlays } = useOverlay();
    const { setGrow, setWidth, setLeft } = useCursor();

    return (
        <div className={styles.legend}>
            <div className={styles.title}>Page</div>
            {items.map(({ key, name, value, alt }) => (
                <motion.button
                    key={key}
                    className={`${styles.item}${
                        overlays[key as keyof Overlay].isHovered || overlays[key as keyof Overlay].isOn
                            ? ` ${styles.on}`
                            : ''
                    }`}
                    onClick={() => {
                        setOverlays((prev) => ({
                            ...prev,
                            [key]: {
                                ...prev[key as keyof Overlay],
                                isOn: !prev[key as keyof Overlay].isOn,
                            },
                        }));
                    }}
                    onPointerOver={(event: React.PointerEvent) => {
                        if (event.pointerType === 'touch') return;

                        setOverlays((prev) => {
                            return {
                                ...prev,
                                [key]: {
                                    ...prev[key as keyof Overlay],
                                    isHovered: true,
                                },
                            };
                        });
                    }}
                    onPointerLeave={(event: React.PointerEvent) => {
                        if (event.pointerType === 'touch') return;

                        setOverlays((prev) => {
                            return {
                                ...prev,
                                [key]: {
                                    ...prev[key as keyof Overlay],
                                    isHovered: false,
                                },
                            };
                        });
                    }}
                    onHoverStart={(event) => {
                        const rect = (event.target as HTMLElement)?.getBoundingClientRect();

                        if (!rect) return;

                        const { width, left } = rect;

                        setWidth(width);
                        setLeft(left);
                        setGrow('item');
                    }}
                    onHoverEnd={() => {
                        setLeft(0);
                        setWidth(0);
                        setGrow('normal');
                    }}
                >
                    <span className={styles.name}>{name}</span>
                    <span className={styles.value}>{value}</span>
                    <span className={styles.alt}>{alt}</span>
                </motion.button>
            ))}
            <br />
        </div>
    );
}
