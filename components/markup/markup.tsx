'use client';

import { useOverlay } from '@/providers/overlay';
import styles from './markup.module.scss';

export function Markup() {
    const { overlays } = useOverlay();

    return (
        <div className={`${styles.markup}${overlays.page.isOn || overlays.page.isHovered ? ` ${styles.on}` : ''}`}>
            <main className={styles.content}>
                {/* Character Width */}
                <div
                    className={`${styles.charWidth}${
                        overlays.charWidth.isOn || overlays.charWidth.isHovered ? ` ${styles.on}` : ''
                    }`}
                >
                    <svg width="7" height="2" viewBox="0 0 7 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect y="1" width="7" height="1" fill="currentColor" />
                        <rect width="1" height="1" fill="currentColor" />
                        <rect x="6" width="1" height="1" fill="currentColor" />
                    </svg>
                    <div className={styles.label}>7px</div>
                </div>

                {/* Font Size */}
                <div
                    className={`${styles.fontsize}${
                        overlays.fontSize.isOn || overlays.fontSize.isHovered ? ` ${styles.on}` : ''
                    }`}
                >
                    <svg width="2" height="11" viewBox="0 0 2 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1" width="1" height="11" fill="currentColor" />
                        <rect width="1" height="1" fill="currentColor" />
                        <rect y="10" width="1" height="1" fill="currentColor" />
                    </svg>
                    <div className={styles.label}>11px</div>
                </div>

                {/* Line Height */}
                <div
                    className={`${styles.lineheight}${
                        overlays.lineHeight.isOn || overlays.lineHeight.isHovered ? ` ${styles.on}` : ''
                    }`}
                >
                    <svg width="3" height="16.5" viewBox="0 0 3 16.5" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0" y="0" width="1" height="1" fill="currentColor" />
                        <rect x="2" y="0" width="1" height="1" fill="currentColor" />
                        <line x1="1.5" y1="0" x2="1.5" y2="16.5" stroke="currentColor" strokeWidth="1" />
                        <rect x="0" y="15.5" width="1" height="1" fill="currentColor" />
                        <rect x="2" y="15.5" width="1" height="1" fill="currentColor" />
                    </svg>
                    <div className={styles.label}>16.5px</div>
                </div>

                {/* Left Column Width */}
                <div
                    className={`${styles.leftwidth}${
                        overlays.leftWidth.isOn || overlays.leftWidth.isHovered ? ` ${styles.on}` : ''
                    }`}
                >
                    <svg width="392" height="7" viewBox="0 0 392 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M4 7H3V6H4V7ZM389 7H388V6H389V7ZM3 6H2V5H3V6ZM390 6H389V5H390V6ZM2 3H390V2H391V3H392V4H391V5H390V4H2V5H1V4H0V3H1V2H2V3ZM3 2H2V1H3V2ZM390 2H389V1H390V2ZM4 1H3V0H4V1ZM389 1H388V0H389V1Z"
                            fill="currentColor"
                        />
                    </svg>
                    <div className={styles.label}>56ch</div>
                </div>

                {/* Gap */}
                <div className={`${styles.gap}${overlays.gap.isOn || overlays.gap.isHovered ? ` ${styles.on}` : ''}`}>
                    <svg width="28" height="3" viewBox="0 0 28 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1H27V0H28V3H27V2H1V3H0V0H1V1Z" fill="currentColor" />
                    </svg>
                    <div className={styles.label}>4ch</div>
                </div>

                {/* Right Column Width */}
                <div
                    className={`${styles.rightwidth}${
                        overlays.rightWidth.isOn || overlays.rightWidth.isHovered ? ` ${styles.on}` : ''
                    }`}
                >
                    <svg width="245" height="7" viewBox="0 0 245 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M4 7H3V6H4V7ZM242 7H241V6H242V7ZM3 6H2V5H3V6ZM243 6H242V5H243V6ZM2 3H243V2H244V3H245V4H244V5H243V4H2V5H1V4H0V3H1V2H2V3ZM3 2H2V1H3V2ZM243 2H242V1H243V2ZM4 1H3V0H4V1ZM242 1H241V0H242V1Z"
                            fill="currentColor"
                        />
                    </svg>
                    <div className={styles.label}>35ch</div>
                </div>

                <div
                    className={`${styles.left}${overlays.left.isOn || overlays.left.isHovered ? ` ${styles.on}` : ''}`}
                />
                <div
                    className={`${styles.right}${
                        overlays.right.isOn || overlays.right.isHovered ? ` ${styles.on}` : ''
                    }`}
                />
            </main>

            {/* Page Padding */}
            <div
                className={`${styles.paddingbottom}${
                    overlays.paddingBottom.isOn || overlays.paddingBottom.isHovered ? ` ${styles.on}` : ''
                }`}
            >
                <svg width="3" height="50" viewBox="0 0 3 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 0V1H2V48.5H3V49.5H0V48.5H1V1H0V0H3Z" fill="currentColor" />
                </svg>
                <div className={styles.label}>3 lines</div>
            </div>

            {/* Page Padding */}
            <div
                className={`${styles.paddingtop}${
                    overlays.paddingTop.isOn || overlays.paddingTop.isHovered ? ` ${styles.on}` : ''
                }`}
            >
                <svg width="3" height="50" viewBox="0 0 3 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 0V1H2V48.5H3V49.5H0V48.5H1V1H0V0H3Z" fill="currentColor" />
                </svg>
                <div className={styles.label}>3 lines</div>
            </div>

            {/* Content Height */}
            <div
                className={`${styles.contentheight}${
                    overlays.contentHeight.isOn || overlays.contentHeight.isHovered ? ` ${styles.on}` : ''
                }`}
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
                <div className={styles.label}>58 lines</div>
            </div>

            {/* Content Width */}
            <div
                className={`${styles.contentwidth}${
                    overlays.contentWidth.isOn || overlays.contentWidth.isHovered ? ` ${styles.on}` : ''
                }`}
            >
                <svg width="665" height="7" viewBox="0 0 665 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M4 7H3V6H4V7ZM662 7H661V6H662V7ZM3 6H2V5H3V6ZM663 6H662V5H663V6ZM2 3H663V2H664V3H665V4H664V5H663V4H2V5H1V4H0V3H1V2H2V3ZM3 2H2V1H3V2ZM663 2H662V1H663V2ZM4 1H3V0H4V1ZM662 1H661V0H662V1Z"
                        fill="currentColor"
                    />
                </svg>
                <div className={styles.label}>95ch</div>
            </div>

            {/* Page Height */}
            <div
                className={`${styles.pageheight}${
                    overlays.pageHeight.isOn || overlays.pageHeight.isHovered ? ` ${styles.on}` : ''
                }`}
            >
                <svg width="9" height="1056" viewBox="0 0 9 1056" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 1056H0V1055H3V1056Z" fill="currentColor" />
                    <path d="M5 1055H3V1054H5V1055Z" fill="currentColor" />
                    <path d="M6 1054H5V1053H6V1054Z" fill="currentColor" />
                    <path d="M7 1053H6V1051H7V1053Z" fill="currentColor" />
                    <path d="M8 1051H7V1048H8V1051Z" fill="currentColor" />
                    <path d="M9 1048H8V8H9V1048Z" fill="currentColor" />
                    <path d="M8 8H7V5H8V8Z" fill="currentColor" />
                    <path d="M7 5H6V3H7V5Z" fill="currentColor" />
                    <path d="M6 3H5V2H6V3Z" fill="currentColor" />
                    <path d="M5 2H3V1H5V2Z" fill="currentColor" />
                    <path d="M3 1H0V0H3V1Z" fill="currentColor" />
                </svg>
                <div className={styles.label}>11in</div>
            </div>

            {/* Page Width */}
            <div
                className={`${styles.pagewidth}${
                    overlays.pageWidth.isOn || overlays.pageWidth.isHovered ? ` ${styles.on}` : ''
                }`}
            >
                <svg width="816" height="9" viewBox="0 0 816 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M808 9H8V8H808V9Z" fill="currentColor" />
                    <path d="M8 8H5V7H8V8Z" fill="currentColor" />
                    <path d="M811 7V8H808V7H811Z" fill="currentColor" />
                    <path d="M5 7H3V6H5V7Z" fill="currentColor" />
                    <path d="M813 7H811V6H813V7Z" fill="currentColor" />
                    <path d="M3 6H2V5H3V6Z" fill="currentColor" />
                    <path d="M814 6H813V5H814V6Z" fill="currentColor" />
                    <path d="M2 5H1V3H2V5Z" fill="currentColor" />
                    <path d="M815 5H814V3H815V5Z" fill="currentColor" />
                    <path d="M1 3H0V0H1V3Z" fill="currentColor" />
                    <path d="M816 3H815V0H816V3Z" fill="currentColor" />
                </svg>

                <div className={styles.label}>8.5in</div>
            </div>
        </div>
    );
}
