'use client';

import { useEffect, useState } from 'react';
import * as motion from 'motion/react-client';
import { useCursor } from '@/providers/cursor-provider';
import styles from './markup.module.scss';
import { EventInfo } from 'motion';

const wait = 1;
const duration = 0.5;
const delay = 0.5;
const fromFilter = 'brightness(0)';
const toFilter = 'brightness(1)';
const fromScale = 2;
const toScale = 1;

export function Markup() {
    const { setPosition } = useCursor();
    const [shouldMount, setShouldMount] = useState<boolean>(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShouldMount(true);
        }, wait * 1000);

        return () => clearTimeout(timer);
    }, []);

    function handleOnHoverStart(event: MouseEvent, info: EventInfo) {
        const rect = (event.target as HTMLElement)?.getBoundingClientRect();

        if (!rect) return;

        const { top, left, height, width } = rect;

        setPosition((prev) => ({
            ...prev,
            top,
            left,
            height,
            width,
            type: 'markup',
        }));
    }

    function handleOnHoverEnd() {
        setPosition((prev) => ({
            ...prev,
            top: 0,
            left: 0,
            height: 0,
            width: 0,
            type: 'normal',
        }));
    }

    if (!shouldMount) return null;

    return (
        <div className={styles.markup}>
            <main className={styles.content}>
                {/* Character Width */}
                <motion.div
                    className={styles.charWidth}
                    initial={{ y: 11, opacity: 0, scale: fromScale, filter: fromFilter }}
                    animate={{ y: 0, opacity: 1, scale: toScale, filter: toFilter }}
                    transition={{ ease: 'easeOut', duration, delay }}
                    onHoverStart={handleOnHoverStart}
                    onHoverEnd={handleOnHoverEnd}
                >
                    <svg width="7" height="2" viewBox="0 0 7 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect y="1" width="7" height="1" fill="currentColor" />
                        <rect width="1" height="1" fill="currentColor" />
                        <rect x="6" width="1" height="1" fill="currentColor" />
                    </svg>
                    <div className={styles.label}>7px</div>
                </motion.div>

                {/* Font Size */}
                <motion.div
                    className={styles.fontsize}
                    initial={{ x: 21, opacity: 0, scale: fromScale, filter: fromFilter }}
                    animate={{ x: 0, opacity: 1, scale: toScale, filter: toFilter }}
                    transition={{ ease: 'easeOut', duration, delay }}
                    onHoverStart={handleOnHoverStart}
                    onHoverEnd={handleOnHoverEnd}
                >
                    <svg width="2" height="11" viewBox="0 0 2 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1" width="1" height="11" fill="currentColor" />
                        <rect width="1" height="1" fill="currentColor" />
                        <rect y="10" width="1" height="1" fill="currentColor" />
                    </svg>
                    <div className={styles.label}>11px</div>
                </motion.div>

                {/* Line Height */}
                <motion.div
                    className={styles.lineheight}
                    initial={{ opacity: 0, scale: fromScale, filter: fromFilter }}
                    animate={{ opacity: 1, scale: toScale, filter: toFilter }}
                    transition={{ ease: 'easeOut', duration, delay }}
                    onHoverStart={handleOnHoverStart}
                    onHoverEnd={handleOnHoverEnd}
                >
                    <svg width="3" height="16.5" viewBox="0 0 3 16.5" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0" y="0" width="1" height="1" fill="currentColor" />
                        <rect x="2" y="0" width="1" height="1" fill="currentColor" />
                        <line x1="1.5" y1="0" x2="1.5" y2="16.5" stroke="currentColor" strokeWidth="1" />
                        <rect x="0" y="15.5" width="1" height="1" fill="currentColor" />
                        <rect x="2" y="15.5" width="1" height="1" fill="currentColor" />
                    </svg>
                    <div className={styles.label}>16.5px</div>
                </motion.div>

                {/* Left Column Width */}
                <motion.div
                    className={styles.leftwidth}
                    onHoverStart={handleOnHoverStart}
                    onHoverEnd={handleOnHoverEnd}
                >
                    <svg width="392" height="7" viewBox="0 0 392 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Left */}
                        <motion.line
                            x1="168"
                            y1="3.5"
                            x2="0"
                            y2="3.5"
                            stroke="currentColor"
                            strokeWidth={1}
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ ease: 'easeOut', duration, delay: (duration + delay) / 1.25 }}
                        />

                        {/* Right */}
                        <motion.line
                            x1="224"
                            y1="3.5"
                            x2="392"
                            y2="3.5"
                            stroke="currentColor"
                            strokeWidth={1}
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ ease: 'easeOut', duration, delay: (duration + delay) / 1.25 }}
                        />

                        {/* Top Left */}
                        <motion.rect
                            x="3"
                            y="0"
                            width="1"
                            height="1"
                            fill="currentColor"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ ease: 'linear', duration: 0, delay: duration + delay + 0.3 }}
                        />
                        <motion.rect
                            x="2"
                            y="1"
                            width="1"
                            height="1"
                            fill="currentColor"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ ease: 'linear', duration: 0, delay: duration + delay + 0.2 }}
                        />
                        <motion.rect
                            x="1"
                            y="2"
                            width="1"
                            height="1"
                            fill="currentColor"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ ease: 'linear', duration: 0, delay: duration + delay + 0.1 }}
                        />

                        {/* Bottom Left */}
                        <motion.rect
                            x="1"
                            y="4"
                            width="1"
                            height="1"
                            fill="currentColor"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ ease: 'linear', duration: 0, delay: duration + delay + 0.1 }}
                        />
                        <motion.rect
                            x="2"
                            y="5"
                            width="1"
                            height="1"
                            fill="currentColor"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ ease: 'linear', duration: 0, delay: duration + delay + 0.2 }}
                        />
                        <motion.rect
                            x="3"
                            y="6"
                            width="1"
                            height="1"
                            fill="currentColor"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ ease: 'linear', duration: 0, delay: duration + delay + 0.3 }}
                        />

                        {/* Top Right */}
                        <motion.rect
                            x="388"
                            y="0"
                            width="1"
                            height="1"
                            fill="currentColor"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ ease: 'linear', duration: 0, delay: duration + delay + 0.3 }}
                        />
                        <motion.rect
                            x="389"
                            y="1"
                            width="1"
                            height="1"
                            fill="currentColor"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ ease: 'linear', duration: 0, delay: duration + delay + 0.2 }}
                        />
                        <motion.rect
                            x="390"
                            y="2"
                            width="1"
                            height="1"
                            fill="currentColor"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ ease: 'linear', duration: 0, delay: duration + delay + 0.1 }}
                        />

                        {/* Bottom Right */}
                        <motion.rect
                            x="390"
                            y="4"
                            width="1"
                            height="1"
                            fill="currentColor"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ ease: 'linear', duration: 0, delay: duration + delay + 0.1 }}
                        />
                        <motion.rect
                            x="389"
                            y="5"
                            width="1"
                            height="1"
                            fill="currentColor"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ ease: 'linear', duration: 0, delay: duration + delay + 0.2 }}
                        />
                        <motion.rect
                            x="388"
                            y="6"
                            width="1"
                            height="1"
                            fill="currentColor"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ ease: 'linear', duration: 0, delay: duration + delay + 0.3 }}
                        />
                    </svg>
                    <motion.div
                        className={styles.label}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ ease: 'easeOut', duration, delay: duration + delay + 0.4 }}
                    >
                        56ch
                    </motion.div>
                </motion.div>

                {/* Gap */}
                <motion.div
                    className={styles.gap}
                    initial={{ opacity: 0, scale: fromScale, filter: fromFilter }}
                    animate={{ opacity: 1, scale: toScale, filter: toFilter }}
                    transition={{ ease: 'easeOut', duration, delay }}
                    onHoverStart={handleOnHoverStart}
                    onHoverEnd={handleOnHoverEnd}
                >
                    <svg width="28" height="3" viewBox="0 0 28 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1H27V0H28V3H27V2H1V3H0V0H1V1Z" fill="currentColor" />
                    </svg>
                    <div className={styles.label}>4ch</div>
                </motion.div>

                {/* Right Column Width */}
                <motion.div
                    className={styles.rightwidth}
                    initial={{ opacity: 0, scale: fromScale, filter: fromFilter }}
                    animate={{ opacity: 1, scale: toScale, filter: toFilter }}
                    transition={{ ease: 'easeOut', duration, delay }}
                    onHoverStart={handleOnHoverStart}
                    onHoverEnd={handleOnHoverEnd}
                >
                    <svg width="245" height="7" viewBox="0 0 245 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Left */}
                        <motion.line
                            x1="84.5"
                            y1="3.5"
                            x2="0"
                            y2="3.5"
                            stroke="currentColor"
                            strokeWidth={1}
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ ease: 'easeOut', duration, delay: (duration + delay) / 1.25 }}
                        />

                        {/* Right */}
                        <motion.line
                            x1="160.5"
                            y1="3.5"
                            x2="392"
                            y2="3.5"
                            stroke="currentColor"
                            strokeWidth={1}
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ ease: 'easeOut', duration, delay: (duration + delay) / 1.25 }}
                        />

                        {/* Top Left */}
                        <motion.rect
                            x="3"
                            y="0"
                            width="1"
                            height="1"
                            fill="currentColor"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ ease: 'linear', duration: 0, delay: duration + delay + 0.3 }}
                        />
                        <motion.rect
                            x="2"
                            y="1"
                            width="1"
                            height="1"
                            fill="currentColor"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ ease: 'linear', duration: 0, delay: duration + delay + 0.2 }}
                        />
                        <motion.rect
                            x="1"
                            y="2"
                            width="1"
                            height="1"
                            fill="currentColor"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ ease: 'linear', duration: 0, delay: duration + delay + 0.1 }}
                        />

                        {/* Bottom Left */}
                        <motion.rect
                            x="1"
                            y="4"
                            width="1"
                            height="1"
                            fill="currentColor"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ ease: 'linear', duration: 0, delay: duration + delay + 0.1 }}
                        />
                        <motion.rect
                            x="2"
                            y="5"
                            width="1"
                            height="1"
                            fill="currentColor"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ ease: 'linear', duration: 0, delay: duration + delay + 0.2 }}
                        />
                        <motion.rect
                            x="3"
                            y="6"
                            width="1"
                            height="1"
                            fill="currentColor"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ ease: 'linear', duration: 0, delay: duration + delay + 0.3 }}
                        />

                        {/* Top Right */}
                        <motion.rect
                            x="241"
                            y="0"
                            width="1"
                            height="1"
                            fill="currentColor"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ ease: 'linear', duration: 0, delay: duration + delay + 0.3 }}
                        />
                        <motion.rect
                            x="242"
                            y="1"
                            width="1"
                            height="1"
                            fill="currentColor"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ ease: 'linear', duration: 0, delay: duration + delay + 0.2 }}
                        />
                        <motion.rect
                            x="243"
                            y="2"
                            width="1"
                            height="1"
                            fill="currentColor"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ ease: 'linear', duration: 0, delay: duration + delay + 0.1 }}
                        />

                        {/* Bottom Right */}
                        <motion.rect
                            x="243"
                            y="4"
                            width="1"
                            height="1"
                            fill="currentColor"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ ease: 'linear', duration: 0, delay: duration + delay + 0.1 }}
                        />
                        <motion.rect
                            x="242"
                            y="5"
                            width="1"
                            height="1"
                            fill="currentColor"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ ease: 'linear', duration: 0, delay: duration + delay + 0.2 }}
                        />
                        <motion.rect
                            x="241"
                            y="6"
                            width="1"
                            height="1"
                            fill="currentColor"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ ease: 'linear', duration: 0, delay: duration + delay + 0.3 }}
                        />
                    </svg>
                    <motion.div
                        className={styles.label}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ ease: 'easeOut', duration, delay: duration + delay + 0.4 }}
                    >
                        35ch
                    </motion.div>
                </motion.div>

                <motion.div className={styles.left} onHoverStart={handleOnHoverStart} onHoverEnd={handleOnHoverEnd} />
                <motion.div className={styles.right} onHoverStart={handleOnHoverStart} onHoverEnd={handleOnHoverEnd} />

                {/* Content Height */}
                <motion.div
                    className={styles.contentheight}
                    initial={{ opacity: 0, scale: fromScale * 0.625, filter: fromFilter }}
                    animate={{ opacity: 1, scale: toScale, filter: toFilter }}
                    transition={{ ease: 'easeOut', duration, delay }}
                    onHoverStart={handleOnHoverStart}
                    onHoverEnd={handleOnHoverEnd}
                >
                    <svg width="7" height="957" viewBox="0 0 7 957" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Top */}
                        <motion.line
                            x1="3.5"
                            y1="450.5"
                            x2="3.5"
                            y2="0"
                            stroke="currentColor"
                            strokeWidth={1}
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ ease: 'easeOut', duration, delay: (duration + delay) / 1.25 }}
                        />

                        {/* Bottom */}
                        <motion.line
                            x1="3.5"
                            y1="506.6"
                            x2="3.5"
                            y2="957"
                            stroke="currentColor"
                            strokeWidth={1}
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ ease: 'easeOut', duration, delay: (duration + delay) / 1.25 }}
                        />

                        {/* Top Left */}
                        <motion.rect
                            x="2"
                            y="1"
                            width="1"
                            height="1"
                            fill="currentColor"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ ease: 'linear', duration: 0, delay: duration + delay + 0.3 }}
                        />
                        <motion.rect
                            x="1"
                            y="2"
                            width="1"
                            height="1"
                            fill="currentColor"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ ease: 'linear', duration: 0, delay: duration + delay + 0.2 }}
                        />
                        <motion.rect
                            x="0"
                            y="3"
                            width="1"
                            height="1"
                            fill="currentColor"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ ease: 'linear', duration: 0, delay: duration + delay + 0.1 }}
                        />

                        {/* Top Right */}
                        <motion.rect
                            x="4"
                            y="1"
                            width="1"
                            height="1"
                            fill="currentColor"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ ease: 'linear', duration: 0, delay: duration + delay + 0.1 }}
                        />
                        <motion.rect
                            x="5"
                            y="2"
                            width="1"
                            height="1"
                            fill="currentColor"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ ease: 'linear', duration: 0, delay: duration + delay + 0.2 }}
                        />
                        <motion.rect
                            x="6"
                            y="3"
                            width="1"
                            height="1"
                            fill="currentColor"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ ease: 'linear', duration: 0, delay: duration + delay + 0.3 }}
                        />

                        {/* Bottom left */}
                        <motion.rect
                            x="0"
                            y="953"
                            width="1"
                            height="1"
                            fill="currentColor"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ ease: 'linear', duration: 0, delay: duration + delay + 0.3 }}
                        />
                        <motion.rect
                            x="1"
                            y="954"
                            width="1"
                            height="1"
                            fill="currentColor"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ ease: 'linear', duration: 0, delay: duration + delay + 0.2 }}
                        />
                        <motion.rect
                            x="2"
                            y="955"
                            width="1"
                            height="1"
                            fill="currentColor"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ ease: 'linear', duration: 0, delay: duration + delay + 0.1 }}
                        />

                        {/* Bottom Right */}
                        <motion.rect
                            x="4"
                            y="955"
                            width="1"
                            height="1"
                            fill="currentColor"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ ease: 'linear', duration: 0, delay: duration + delay + 0.1 }}
                        />
                        <motion.rect
                            x="5"
                            y="954"
                            width="1"
                            height="1"
                            fill="currentColor"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ ease: 'linear', duration: 0, delay: duration + delay + 0.2 }}
                        />
                        <motion.rect
                            x="6"
                            y="953"
                            width="1"
                            height="1"
                            fill="currentColor"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ ease: 'linear', duration: 0, delay: duration + delay + 0.3 }}
                        />
                    </svg>
                    <motion.div
                        className={styles.label}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ ease: 'easeOut', duration, delay: duration + delay + 0.4 }}
                    >
                        58
                        <br />
                        lines
                    </motion.div>
                </motion.div>
            </main>

            {/* Padding Top */}
            <motion.div
                className={styles.paddingtop}
                initial={{ opacity: 0, scale: fromScale, filter: fromFilter }}
                animate={{ opacity: 1, scale: toScale, filter: toFilter }}
                transition={{ ease: 'easeOut', duration, delay }}
                onHoverStart={handleOnHoverStart}
                onHoverEnd={handleOnHoverEnd}
            >
                <svg width="3" height="50" viewBox="0 0 3 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 0V1H2V48.5H3V49.5H0V48.5H1V1H0V0H3Z" fill="currentColor" />
                </svg>
                <div className={styles.label}>3 lines</div>
            </motion.div>

            {/* Page Height */}
            <motion.div
                className={styles.pageheight}
                initial={{ opacity: 0, scale: fromScale * 0.625, filter: fromFilter }}
                animate={{ opacity: 1, scale: toScale, filter: toFilter }}
                transition={{ ease: 'easeOut', duration, delay }}
                onHoverStart={handleOnHoverStart}
                onHoverEnd={handleOnHoverEnd}
            >
                <svg width="14" height="1056" viewBox="0 0 14 1056" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.5 1048.5H6.5V0H7.5V1048.5Z" fill="currentColor" />
                    <path d="M5.5 0L6.5 0V1H5.5V0Z" fill="currentColor" />
                    <path d="M7.5 0L8.5 0V1H7.5V0Z" fill="currentColor" />
                    <path d="M5.5 1055H6.5V1056H5.5V1055Z" fill="currentColor" />
                    <path d="M7.5 1055H8.5V1056H7.5V1055Z" fill="currentColor" />
                    <path d="M6.5 1049.5H7.5V1056H6.5V1049.5Z" fill="currentColor" />
                </svg>

                <div className={styles.label}>
                    11
                    <br />
                    in
                </div>
            </motion.div>

            {/* Page Width */}
            <motion.div
                className={styles.pagewidth}
                initial={{ opacity: 0, scale: fromScale * 0.625, filter: fromFilter }}
                animate={{ opacity: 1, scale: toScale, filter: toFilter }}
                transition={{ ease: 'easeOut', duration, delay }}
                onHoverStart={handleOnHoverStart}
                onHoverEnd={handleOnHoverEnd}
            >
                <svg width="816" height="14" viewBox="0 0 816 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 7.5V6.5H808.5V7.5H0Z" fill="currentColor" />
                    <path d="M0 7.5H1V8.5H0V7.5Z" fill="currentColor" />
                    <path d="M0 5.5H1V6.5H0V5.5Z" fill="currentColor" />
                    <path d="M815 5.5H816V6.5H815V5.5Z" fill="currentColor" />
                    <path d="M809.5 6.5H816V7.5H809.5V6.5Z" fill="currentColor" />
                    <path d="M815 7.5H816V8.5H815V7.5Z" fill="currentColor" />
                </svg>
                <div className={styles.label}>8.5in</div>
            </motion.div>
        </div>
    );
}
