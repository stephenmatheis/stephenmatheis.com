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
    title: string;
    items: Item[];
};

function getMaxLength(items: Item[], key: string): number {
    return Math.max(...items.map((item) => item[key].length));
}

export function Legend({ title, items }: LegendProps) {
    const { overlays, setOverlays } = useOverlay();
    const { setGrow, setWidth, setLeft } = useCursor();
    const nameLength = getMaxLength(items, 'name');
    const valueLength = getMaxLength(items, 'value');
    const altLength = getMaxLength(items, 'alt');

    return (
        <div className={styles.legend}>
            <div className={styles.title}>{title}</div>
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
                    <span style={{ width: `${nameLength}ch` }} className={styles.name}>
                        {name}
                    </span>
                    {value && (
                        <span style={{ width: `${valueLength}ch` }} className={styles.value}>
                            {value}
                        </span>
                    )}
                    {alt && (
                        <span style={{ width: `${altLength}ch` }} className={styles.alt}>
                            {alt}
                        </span>
                    )}
                </motion.button>
            ))}
        </div>
    );
}
