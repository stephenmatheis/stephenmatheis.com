'use client';

import { useEffect, useState, useRef } from 'react';
import * as motion from 'motion/react-client';
import styles from './page.module.scss';

type Note = {
    id: string;
    content: string;
};

type directions =
    | 'reset'
    | 'center'
    | 'up'
    | 'down'
    | 'left'
    | 'right'
    | 'upleft'
    | 'upright'
    | 'downleft'
    | 'downright';

const variants = {
    reset: { translateX: 0, translateY: 0, transition: { duration: 0 } },
    center: { translateX: 0, translateY: 0 },
    up: { translateX: 0, translateY: 'calc(100dvh - 44px)' },
    upleft: { translateX: 'calc(100dvw - 44px)', translateY: 'calc(100dvh - 44px)' },
    upright: { translateX: 'calc(-100dvw + 44px)', translateY: 'calc(100dvh - 44px)' },
    down: { translateX: 0, translateY: 'calc(-100dvh + 44px)' },
    downleft: { translateX: 'calc(100dvw - 44px)', translateY: 'calc(-100dvh + 44px)' },
    downright: { translateX: 'calc(-100dvw + 44px)', translateY: 'calc(-100dvh + 44px)' },
    left: { translateX: 'calc(100dvw - 44px)', translateY: 0 },
    right: { translateX: 'calc(-100dvw + 44px)', translateY: 0 },
};
const animatingVariants = {
    center: { translateX: 0, translateY: 0 },
    up: { translateX: 0, translateY: 'calc(-100dvh + 44px)' },
    // upleft: { translateX: 'calc(100dvw - 44px)', translateY: 'calc(100dvh - 44px)' },
    // upright: { translateX: 'calc(-100dvw + 44px)', translateY: 'calc(100dvh - 44px)' },
    // down: { translateX: 0, translateY: 'calc(-100dvh + 44px)' },
    // downleft: { translateX: 'calc(100dvw - 44px)', translateY: 'calc(-100dvh + 44px)' },
    // downright: { translateX: 'calc(-100dvw + 44px)', translateY: 'calc(-100dvh + 44px)' },
    // left: { translateX: 'calc(100dvw - 44px)', translateY: 0 },
    // right: { translateX: 'calc(-100dvw + 44px)', translateY: 0 },
};
// const transition = { type: 'spring', stiffness: 150, damping: 15 };
const transition = { ease: 'linear', duration: 2 };

export default function UIPage() {
    const [direction, setDirection] = useState<directions>('center');
    const [pos, setPos] = useState<string>('0,0');
    const [notes, setNotes] = useState<Note[]>([]);
    const [animating, setAnimating] = useState(false);
    const pageRef = useRef<HTMLDivElement | null>(null);
    const noteRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        const savedNotes = localStorage.getItem('notes');

        if (savedNotes) {
            const parsedNotes: Note[] = JSON.parse(savedNotes);

            setNotes(parsedNotes);
        } else {
            console.log('No notes found in localStorage, starting with an empty array.');
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);

    return (
        <div className={styles.app}>
            <motion.div
                ref={pageRef}
                className={styles.page}
                variants={variants}
                initial="center"
                animate={direction}
                transition={transition}
            >
                {[
                    { direction: 'upleft', label: '↖' },
                    { direction: 'up', label: '↑' },
                    { direction: 'upright', label: '↗' },
                    { direction: 'left', label: '←' },
                ].map(({ direction, label }) => (
                    <button
                        key={direction}
                        className={`${styles.move} ${styles[direction]}`}
                        onClick={() => {
                            setAnimating(true);
                            setDirection(direction as directions);
                        }}
                    >
                        {!animating && label}
                    </button>
                ))}
                <div className={styles.note}>
                    <textarea
                        ref={noteRef}
                        autoFocus
                        // placeholder="new note"
                        value={notes.find((note) => note.id === pos)?.content || ''}
                        onChange={(event) => {
                            setNotes((prev) => {
                                const note = prev.find((note) => note.id === pos);

                                console.log('Note changed:', event.target.value);

                                if (!note) {
                                    console.log('Adding new note at position:', pos);
                                    return [...prev, { id: pos, content: event.target.value }];
                                }

                                console.log('Updating note at position:', pos);

                                return prev.map((note) =>
                                    note.id === pos ? { ...note, content: event.target.value } : note
                                );
                            });
                        }}
                    />
                </div>
                {[
                    { direction: 'right', label: '→' },
                    { direction: 'downleft', label: '↙' },
                    { direction: 'down', label: '↓' },
                    { direction: 'downright', label: '↘' },
                ].map(({ direction, label }) => (
                    <button
                        key={direction}
                        className={`${styles.move} ${styles[direction]}`}
                        onClick={() => {
                            setAnimating(true);
                            setDirection(direction as directions);
                        }}
                    >
                        {!animating && label}
                    </button>
                ))}
            </motion.div>

            {/* Show while animating to next card */}
            {animating && (
                <motion.div
                    className={`${styles.page} ${styles.animating}`}
                    variants={animatingVariants}
                    initial={direction}
                    // initial={getOppositeDirection('down')}
                    animate="center"
                    transition={transition}
                    onAnimationComplete={() => {
                        // console.log('#2 animation completed for direction:', direction);
                        // setTimeout(() => {
                        //     console.log('#2 resetting direction to center');
                        //     setDirection('reset');
                        //     setAnimating(false);
                        // }, 1000);
                        // DEV:
                        // const [x, y] = pos.split(',').map(Number);
                        // const newPos = `${x + (direction === 'right' ? 1 : direction === 'left' ? -1 : 0)},${
                        //     y + (direction === 'down' ? 1 : direction === 'up' ? -1 : 0)
                        // }`;
                        // setPos(newPos);
                        // console.log('New position:', newPos);
                        // if (noteRef.current) {
                        //     const currentNote = notes.find((note) => note.id === newPos);
                        //     if (currentNote) {
                        //         noteRef.current.value = currentNote.content;
                        //         console.log('Loaded note for position:', newPos);
                        //     }
                        // }
                    }}
                >
                    {[
                        { direction: 'upleft', label: '' },
                        { direction: 'up', label: '' },
                        { direction: 'upright', label: '' },
                        { direction: 'left', label: '' },
                    ].map(({ direction, label }) => (
                        <div key={direction} className={`${styles.move} ${styles[direction]}`}>
                            {label}
                        </div>
                    ))}
                    <div className={styles.note} />
                    <div key={direction} className={`${styles.move} ${styles.right}`} />
                </motion.div>
            )}
        </div>
    );
}
