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

    function animateTo(name: room) {
        if (name === 'center') return goTo;
        return goTo === name ? 'end' : 'start';
    }

    function showWhen(direction: room) {
        if (goTo === 'center') return true;

        switch (direction) {
            case 'up':
                return 'down';
            case 'down':
                return 'up';
            case 'left':
                return 'right';
            case 'right':
                return 'left';
            default:
                return false;
        }
    }

    return (
        <div className={styles.page} onKeyDown={handleKeyDown}>
            {/* Rooms */}
            {(
                [
                    {
                        name: 'center',
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
                    },
                    {
                        name: 'up',
                        label: 'Up',
                        className: `${styles.room} ${styles.up}`,
                        initial: 'start',
                        variants: {
                            start: { translateX: 0, translateY: '-100dvh' },
                            end: { translateX: 0, translateY: 0 },
                        },
                    },
                    {
                        name: 'down',
                        label: 'Down',
                        className: `${styles.room} ${styles.down}`,
                        initial: 'start',
                        variants: {
                            start: { translateX: 0, translateY: '100dvh' },
                            end: { translateX: 0, translateY: 0 },
                        },
                    },
                    {
                        name: 'left',
                        label: 'Left',
                        className: `${styles.room} ${styles.left}`,
                        initial: 'start',
                        variants: {
                            start: { translateX: '-100dvw', translateY: 0 },
                            end: { translateX: 0, translateY: 0 },
                        },
                    },
                    {
                        name: 'right',
                        label: 'Right',
                        className: `${styles.room} ${styles.right}`,
                        initial: 'start',
                        variants: {
                            start: { translateX: '100dvw', translateY: 0 },
                            end: { translateX: 0, translateY: 0 },
                        },
                    },
                ] as const
            ).map(({ name, label, className, initial, variants }) => (
                <motion.div
                    key={name}
                    className={className}
                    initial={initial}
                    variants={variants}
                    animate={animateTo(name as room)}
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
                    },
                    {
                        direction: 'down',
                        className: `${styles.arrow} ${styles.down}`,
                        label: '▼',
                    },
                    {
                        direction: 'left',
                        className: `${styles.arrow} ${styles.left}`,
                        label: '◄',
                    },
                    {
                        direction: 'right',
                        className: `${styles.arrow} ${styles.right}`,
                        label: '►',
                    },
                ] as const
            ).map(({ direction, className, label }) => (
                <motion.button
                    key={direction}
                    className={className}
                    onClick={() => setDirection(direction)}
                    initial="visible"
                    variants={{
                        visible: { opacity: 1, scale: 1 },
                        hidden: { opacity: 0, scale: 0.5, pointerEvents: 'none' },
                    }}
                    animate={showWhen(direction) ? 'visible' : 'hidden'}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                    {label}
                </motion.button>
            ))}
        </div>
    );
}
