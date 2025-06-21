'use client';

import { useState, KeyboardEvent } from 'react';
import * as motion from 'motion/react-client';
import styles from './page.module.scss';

type room = 'center' | 'up' | 'down' | 'left' | 'right';

export default function UIPage() {
    const [goTo, setGoTo] = useState<room>('center');

    function handleKeyDown(event: KeyboardEvent) {
        if (event.key === 'ArrowUp') {
            setGoTo((prev) => (prev === 'center' ? 'up' : 'center'));
        } else if (event.key === 'ArrowDown') {
            setGoTo((prev) => (prev === 'center' ? 'down' : 'center'));
        } else if (event.key === 'ArrowLeft') {
            setGoTo((prev) => (prev === 'center' ? 'left' : 'center'));
        } else if (event.key === 'ArrowRight') {
            setGoTo((prev) => (prev === 'center' ? 'right' : 'center'));
        }
    }

    function setDirection(direction: room) {
        if (goTo === direction) return;

        setGoTo((prev) => (prev === 'center' ? direction : 'center'));
    }

    return (
        <div className={styles.page} onKeyDown={handleKeyDown}>
            {/* Rooms */}
            {(
                [
                    {
                        key: 'center',
                        label: 'Center',
                        className: `${styles.room} ${styles.center}`,
                        initial: 'center',
                        variants: {
                            center: { translateX: 0, translateY: 0 },
                            up: { translateX: 0, translateY: '100dvh' },
                            down: { translateX: 0, translateY: '-100dvh' },
                            left: { translateX: '100dvw', translateY: 0 },
                            right: { translateX: '-100dvw', translateY: 0 },
                        },
                        animate: (goTo: room) => goTo,
                    },
                    {
                        key: 'up',
                        label: 'Up',
                        className: `${styles.room} ${styles.center}`,
                        initial: 'start',
                        variants: {
                            start: { translateX: 0, translateY: '-100dvh' },
                            end: { translateX: 0, translateY: 0 },
                        },
                        animate: (goTo: room) => (goTo === 'up' ? 'end' : 'start'),
                    },
                    {
                        key: 'down',
                        label: 'Down',
                        className: `${styles.room} ${styles.center}`,
                        initial: 'start',
                        variants: {
                            start: { translateX: 0, translateY: '100dvh' },
                            end: { translateX: 0, translateY: 0 },
                        },
                        animate: (goTo: room) => (goTo === 'down' ? 'end' : 'start'),
                    },
                    {
                        key: 'left',
                        label: 'Left',
                        className: `${styles.room} ${styles.center}`,
                        initial: 'start',
                        variants: {
                            start: { translateX: '-100dvw', translateY: 0 },
                            end: { translateX: 0, translateY: 0 },
                        },
                        animate: (goTo: room) => (goTo === 'left' ? 'end' : 'start'),
                    },
                    {
                        key: 'right',
                        label: 'Right',
                        className: `${styles.room} ${styles.center}`,
                        initial: 'start',
                        variants: {
                            start: { translateX: '100dvw', translateY: 0 },
                            end: { translateX: 0, translateY: 0 },
                        },
                        animate: (goTo: room) => (goTo === 'right' ? 'end' : 'start'),
                    },
                ] as const
            ).map(({ key, label, className, initial, variants, animate }) => (
                <motion.div
                    key={key}
                    className={className}
                    initial={initial}
                    variants={variants}
                    animate={animate(goTo)}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                    {label}
                </motion.div>
            ))}

            {/* Arrows */}
            {(
                [
                    {
                        direction: 'up',
                        className: `${styles.arrow} ${styles.up}`,
                        label: '▲',
                        showWhen: (goTo: room) => goTo === 'center' || goTo === 'down',
                    },
                    {
                        direction: 'down',
                        className: `${styles.arrow} ${styles.down}`,
                        label: '▼',
                        showWhen: (goTo: room) => goTo === 'center' || goTo === 'up',
                    },
                    {
                        direction: 'left',
                        className: `${styles.arrow} ${styles.left}`,
                        label: '◄',
                        showWhen: (goTo: room) => goTo === 'center' || goTo === 'right',
                    },
                    {
                        direction: 'right',
                        className: `${styles.arrow} ${styles.right}`,
                        label: '►',
                        showWhen: (goTo: room) => goTo === 'center' || goTo === 'left',
                    },
                ] as const
            ).map(({ direction, className, label, showWhen }) => (
                <motion.button
                    key={direction}
                    className={className}
                    onClick={() => setDirection(direction)}
                    initial="visible"
                    variants={{
                        visible: { opacity: 1, scale: 1 },
                        hidden: { opacity: 0, scale: 0.5, pointerEvents: 'none' },
                    }}
                    animate={showWhen(goTo) ? 'visible' : 'hidden'}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                    {label}
                </motion.button>
            ))}
        </div>
    );
}
