'use client';

import { useState } from 'react';
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
    const { setPosition } = useCursor();
    const nameLength = getMaxLength(items, 'name');
    const valueLength = getMaxLength(items, 'value');
    const altLength = getMaxLength(items, 'alt');
    const [show, setShow] = useState<boolean>(false);

    return (
        <div className={styles.legend}>
            <motion.div
                className={styles.title}
                onHoverStart={(event) => {
                    const rect = (event.target as HTMLElement)?.getBoundingClientRect();

                    if (!rect) return;

                    const { top, left, height, width } = rect;

                    setPosition((prev) => ({
                        ...prev,
                        top,
                        left,
                        height,
                        width,
                        type: 'button',
                    }));
                }}
                onHoverEnd={() => {
                    setPosition((prev) => ({
                        ...prev,
                        top: 0,
                        left: 0,
                        height: 0,
                        width: 0,
                        type: 'normal',
                    }));
                }}
            >
                {title}
            </motion.div>
            {show &&
                items.map(({ key, name, value, alt }) => (
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

                            const { top, left, height, width } = rect;

                            setPosition((prev) => ({
                                ...prev,
                                top,
                                left,
                                height,
                                width,
                                type: 'item',
                            }));
                        }}
                        onHoverEnd={() => {
                            setPosition((prev) => ({
                                ...prev,
                                top: 0,
                                left: 0,
                                height: 0,
                                width: 0,
                                type: 'normal',
                            }));
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
