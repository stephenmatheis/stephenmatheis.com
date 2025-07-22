'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.scss';

export function Page({ children }) {
    const [viewport, setViewport] = useState({ width: 0, height: 0 });
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        function updateMousePosition(event) {
            setMousePosition({
                x: event.clientX,
                y: event.clientY,
            });
        }

        function onResize() {
            setViewport({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('resize', onResize);

        onResize();

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('resize', onResize);
        };
    }, []);

    return (
        <>
            <div className={styles.overlay}>
                {/* Legend */}
                <div className={styles.legend}>
                    <div className={styles.title}>Legend</div>
                    <div className={styles.item}>
                        <span className={styles.name}>Page Width</span>
                        <span className={styles.value}>8.5in</span>
                        <span className={styles.alt}> 816px</span>
                    </div>
                    <div className={styles.item}>
                        <span className={styles.name}>Page Height</span>
                        <span className={styles.value}>11in</span>
                        <span className={styles.alt}> 1056px</span>
                    </div>
                    <div className={styles.item}>
                        <span className={styles.name}>Font Size</span>
                        <span className={styles.value}>11px</span>
                    </div>
                    <div className={styles.item}>
                        <span className={styles.name}>Line Height</span>
                        <span className={styles.value}>16.5px</span>
                    </div>
                    <div className={styles.item}>
                        <span className={styles.name}>Character Width</span>
                        <span className={styles.value}>7px</span>
                    </div>
                    <div className={styles.item}>
                        <span className={styles.name}>Lines</span>
                        <span className={styles.value}>64</span>
                    </div>
                    <div className={styles.item}>
                        <span className={styles.name}>Padding Top</span>
                        <span className={styles.value}>3 Lines</span>
                    </div>
                    <div className={styles.item}>
                        <span className={styles.name}>Padding Bottom</span>
                        <span className={styles.value}>3 Lines</span>
                    </div>
                    <div className={styles.item}>
                        <span className={styles.name}>Content height</span>
                        <span className={styles.value}>58 lines</span>
                    </div>
                    <div className={styles.item}>
                        <span className={styles.name}>Content Width</span>
                        <span className={styles.value}>FIXME:</span>
                    </div>
                </div>
                {/* Controls */}
                <div className={styles.controls}>
                    {/* Viewport */}
                    <div className={styles.viewport}>
                        <div className={styles.title}>Viewport</div>
                        <div className={styles.item}>
                            <span className={styles.name}>Width</span>
                            <span className={styles.value}>{viewport.width}px</span>
                        </div>
                        <div className={styles.item}>
                            <span className={styles.name}>Height</span>
                            <span className={styles.value}>{viewport.height}px</span>
                        </div>
                    </div>
                    {/* Mouse Position */}
                    <div className={styles.pointer}>
                        <div className={styles.title}>Pointer</div>
                        <div className={styles.item}>
                            <span className={styles.name}>X</span>
                            <span className={styles.value}>{mousePosition.x}px</span>
                        </div>
                        <div className={styles.item}>
                            <span className={styles.name}>Y</span>
                            <span className={styles.value}>{mousePosition.y}px</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.page}>
                {children}

                {/* Page Padding */}
                <div className={styles.paddingtop}>
                    <svg width="3" height="50" viewBox="0 0 3 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 0V1H2V48.5H3V49.5H0V48.5H1V1H0V0H3Z" fill="currentColor" />
                    </svg>
                    <div className={styles.label}>3 lines</div>
                </div>

                {/* Page Padding */}
                <div className={styles.paddingbottom}>
                    <svg width="3" height="50" viewBox="0 0 3 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 0V1H2V48.5H3V49.5H0V48.5H1V1H0V0H3Z" fill="currentColor" />
                    </svg>
                    <div className={styles.label}>3 lines</div>
                </div>

                {/* Lines */}
                <div className={styles.lines}>
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

                {/* Page Height */}
                <div className={styles.pageheight}>
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
                <div className={styles.pagewidth}>
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
        </>
    );
}
