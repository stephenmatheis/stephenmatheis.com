'use client';

import { useEffect, useState, useRef } from 'react';
import * as motion from 'motion/react-client';
import styles from './page.module.scss';

type Note = {
    id: string;
    content: string;
};

type actions = 'reset' | 'center' | 'up' | 'down' | 'left' | 'right';

const variants = {
    reset: { translateX: 0, translateY: 0, transition: { duration: 0 } },
    center: { translateX: 0, translateY: 0 },
    up: { translateX: 0, translateY: '100dvh' },
    down: { translateX: 0, translateY: '-100dvh' },
    left: { translateX: '100dvw', translateY: 0 },
    right: { translateX: '-100dvw', translateY: 0 },
};
const transition = { type: 'spring', stiffness: 150, damping: 15 };

function getOppositeDirection(direction: actions): actions {
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
            return 'center';
    }
}

function getNextPosition(currentPos: string, direction: actions): string {
    const [x, y] = currentPos.split(',').map(Number);

    switch (direction) {
        case 'up':
            return `${x},${y + 1}`;
        case 'down':
            return `${x},${y - 1}`;
        case 'left':
            return `${x - 1},${y}`;
        case 'right':
            return `${x + 1},${y}`;
        default:
            return currentPos;
    }
}

export default function UIPage() {
    const [action, setAction] = useState<actions>('center');
    const [pos, setPos] = useState<string>('0,0');
    const [notes, setNotes] = useState<Note[]>([]);
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

    useEffect(() => {
        if (action !== 'reset') return;

        setAction('center');
        noteRef.current?.focus();
    }, [action]);

    return (
        <>
            <motion.div
                ref={pageRef}
                className={styles.page}
                variants={variants}
                initial="center"
                animate={action}
                transition={transition}
            >
                {/* Note field */}
                <textarea
                    ref={noteRef}
                    className={styles.note}
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
            </motion.div>

            {/* Animate to next note */}
            {action !== 'center' && (
                <motion.div
                    ref={pageRef}
                    className={`${styles.page} ${styles.target}`}
                    variants={variants}
                    initial={getOppositeDirection(action)}
                    animate="center"
                    transition={transition}
                    onAnimationComplete={() => {
                        setPos((prev) => getNextPosition(prev, action));
                        setAction('reset');
                    }}
                >
                    <textarea
                        className={styles.note}
                        autoFocus
                        // TODO:
                        defaultValue={notes.find((note) => note.id === getNextPosition(pos, action))?.content || ''}
                    />
                </motion.div>
            )}

            {/* Status bar */}
            <div className={styles.statusbar}>
                <div className={styles.left}>
                    <button className={styles.crossbar}>✧</button>
                </div>

                <div className={styles.right}>
                    <span>Position: {pos}</span> <span>Notes: {notes.length}</span>
                </div>
            </div>

            {/* Actions */}
            {[
                { direction: 'up', label: '↑' },
                { direction: 'down', label: '↓' },
                { direction: 'right', label: '→' },
                { direction: 'left', label: '←' },
            ].map(({ direction, label }) => (
                <button
                    key={direction}
                    className={`${styles.arrow} ${styles[direction]}`}
                    onClick={() => {
                        setAction(direction as actions);
                    }}
                >
                    {label}
                </button>
            ))}
        </>
    );
}
