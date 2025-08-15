'use client';

import * as motion from 'motion/react-client';
import { useCursor } from '@/providers/cursor-provider';
import { usePage } from '@/providers/page-provider';
import styles from './page-controls.module.scss';

export function PageControls() {
    const { setPosition } = useCursor();
    const { page, setPage, setDirection } = usePage();

    function resetCursor() {
        setPosition((prev) => ({
            ...prev,
            top: 0,
            left: 0,
            height: 0,
            width: 0,
            type: 'normal',
        }));
    }

    return (
        <div className={styles['page-controls']}>
            {page > 1 && (
                <div className={styles.back}>
                    <motion.button
                        onClick={() => {
                            setPage((prev) => prev - 1);
                            setDirection('back');
                            resetCursor();
                        }}
                        onHoverStart={(event) => {
                            const rect = (event.target as HTMLElement).getBoundingClientRect();

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
                        onHoverEnd={() => resetCursor()}
                    >
                        ←┄
                    </motion.button>
                </div>
            )}
            <div className={styles.forward}>
                <motion.button
                    onClick={() => {
                        setPage((prev) => prev + 1);
                        setDirection('forward');
                    }}
                    onHoverStart={(event) => {
                        const rect = (event.target as HTMLElement).getBoundingClientRect();

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
                    onHoverEnd={() => resetCursor()}
                >
                    ┈→
                </motion.button>
            </div>
        </div>
    );
}
