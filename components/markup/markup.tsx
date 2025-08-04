'use client';

import * as motion from 'motion/react-client';
import { useCursor } from '@/providers/cursor-provider';
import styles from './markup.module.scss';
import { EventInfo } from 'motion';

export function Markup() {
    const { setPosition } = useCursor();

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

    return (
        <div className={styles.markup}>
            <main className={styles.content}>
                {/* Character Width */}
                <motion.div
                    className={styles.charWidth}
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
                <motion.div className={styles.fontsize} onHoverStart={handleOnHoverStart} onHoverEnd={handleOnHoverEnd}>
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
                        <path
                            d="M4 7H3V6H4V7ZM389 7H388V6H389V7ZM3 6H2V5H3V6ZM390 6H389V5H390V6ZM2 3H390V2H391V3H392V4H391V5H390V4H2V5H1V4H0V3H1V2H2V3ZM3 2H2V1H3V2ZM390 2H389V1H390V2ZM4 1H3V0H4V1ZM389 1H388V0H389V1Z"
                            fill="currentColor"
                        />
                    </svg>
                    <div className={styles.label}>56ch</div>
                </motion.div>

                {/* Gap */}
                <motion.div className={styles.gap} onHoverStart={handleOnHoverStart} onHoverEnd={handleOnHoverEnd}>
                    <svg width="28" height="3" viewBox="0 0 28 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1H27V0H28V3H27V2H1V3H0V0H1V1Z" fill="currentColor" />
                    </svg>
                    <div className={styles.label}>4ch</div>
                </motion.div>

                {/* Right Column Width */}
                <motion.div
                    className={styles.rightwidth}
                    onHoverStart={handleOnHoverStart}
                    onHoverEnd={handleOnHoverEnd}
                >
                    <svg width="245" height="7" viewBox="0 0 245 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M4 7H3V6H4V7ZM242 7H241V6H242V7ZM3 6H2V5H3V6ZM243 6H242V5H243V6ZM2 3H243V2H244V3H245V4H244V5H243V4H2V5H1V4H0V3H1V2H2V3ZM3 2H2V1H3V2ZM243 2H242V1H243V2ZM4 1H3V0H4V1ZM242 1H241V0H242V1Z"
                            fill="currentColor"
                        />
                    </svg>
                    <div className={styles.label}>35ch</div>
                </motion.div>

                <motion.div className={styles.left} onHoverStart={handleOnHoverStart} onHoverEnd={handleOnHoverEnd} />
                <motion.div className={styles.right} onHoverStart={handleOnHoverStart} onHoverEnd={handleOnHoverEnd} />

                {/* Content Height */}
                <motion.div
                    className={styles.contentheight}
                    onHoverStart={handleOnHoverStart}
                    onHoverEnd={handleOnHoverEnd}
                >
                    <svg width="7" height="957" viewBox="0 0 7 957" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 1H5V2H4V955H5V956H4V957H3V956H2V955H3V2H2V1H3V0H4V1Z" fill="currentColor" />
                        <path d="M2 955H1V954H2V955Z" fill="currentColor" />
                        <path d="M6 955H5V954H6V955Z" fill="currentColor" />
                        <path d="M1 954H0V953H1V954Z" fill="currentColor" />
                        <path d="M7 954H6V953H7V954Z" fill="currentColor" />
                        <path d="M1 4H0V3H1V4Z" fill="currentColor" />
                        <path d="M7 4H6V3H7V4Z" fill="currentColor" />
                        <path d="M2 3H1V2H2V3Z" fill="currentColor" />
                        <path d="M6 3H5V2H6V3Z" fill="currentColor" />
                    </svg>
                    <div className={styles.label}>
                        58
                        <br />
                        lines
                    </div>
                </motion.div>
            </main>

            {/* Padding Top */}
            <motion.div className={styles.paddingtop} onHoverStart={handleOnHoverStart} onHoverEnd={handleOnHoverEnd}>
                <svg width="3" height="50" viewBox="0 0 3 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 0V1H2V48.5H3V49.5H0V48.5H1V1H0V0H3Z" fill="currentColor" />
                </svg>
                <div className={styles.label}>3 lines</div>
            </motion.div>

            {/* Page Height */}
            <motion.div className={styles.pageheight} onHoverStart={handleOnHoverStart} onHoverEnd={handleOnHoverEnd}>
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
            <motion.div className={styles.pagewidth} onHoverStart={handleOnHoverStart} onHoverEnd={handleOnHoverEnd}>
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
