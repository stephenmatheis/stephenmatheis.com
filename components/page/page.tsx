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
                    <svg width="6" height="50" viewBox="0 0 6 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 0V2H4V47.5H6V49.5H0V47.5H2V2H0V0H6Z" fill="currentColor" />
                    </svg>
                    <div className={styles.label}>3 lines</div>
                </div>

                {/* Page Padding */}
                <div className={styles.paddingbottom}>
                    <svg width="6" height="50" viewBox="0 0 6 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 0V2H4V47.5H6V49.5H0V47.5H2V2H0V0H6Z" fill="currentColor" />
                    </svg>
                    <div className={styles.label}>3 lines</div>
                </div>

                {/* Lines */}
                <div className={styles.lines}>
                    <svg width="18" height="958" viewBox="0 0 18 958" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10 2.50209H12V4.50418H10V953.496H12V955.498H10V957.5H8V955.498H6V953.496H8V4.50418H6V2.50209H8V0.5H10V2.50209Z"
                            fill="currentColor"
                        />
                        <path d="M6 953.496H4V951.494H6V953.496Z" fill="currentColor" />
                        <path d="M14 953.496H12V951.494H14V953.496Z" fill="currentColor" />
                        <path d="M4 951.494H2V949.492H4V951.494Z" fill="currentColor" />
                        <path d="M16 951.494H14V949.492H16V951.494Z" fill="currentColor" />
                        <path d="M2 949.492H0V947.49H2V949.492Z" fill="currentColor" />
                        <path d="M18 949.492H16V947.49H18V949.492Z" fill="currentColor" />
                        <path d="M2 10.5105H0V8.50837H2V10.5105Z" fill="currentColor" />
                        <path d="M18 10.5105H16V8.50837H18V10.5105Z" fill="currentColor" />
                        <path d="M4 8.50837H2V6.50628H4V8.50837Z" fill="currentColor" />
                        <path d="M16 8.50837H14V6.50628H16V8.50837Z" fill="currentColor" />
                        <path d="M6 6.50628H4V4.50418H6V6.50628Z" fill="currentColor" />
                        <path d="M14 6.50628H12V4.50418H14V6.50628Z" fill="currentColor" />
                    </svg>
                    <div className={styles.label}>58 lines</div>
                </div>

                {/* Page Height */}
                <div className={styles.pageheight}>
                    <svg width="18" height="1056" viewBox="0 0 18 1056" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 1056H0V1054H6V1056Z" fill="currentColor" />
                        <path d="M10 1054H6V1052H10V1054Z" fill="currentColor" />
                        <path d="M12 1052H10V1050H12V1052Z" fill="currentColor" />
                        <path d="M14 1050H12V1046H14V1050Z" fill="currentColor" />
                        <path d="M16 1046H14V1040H16V1046Z" fill="currentColor" />
                        <path d="M18 1040H16V16H18V1040Z" fill="currentColor" />
                        <path d="M16 16H14V10H16V16Z" fill="currentColor" />
                        <path d="M14 10H12V6H14V10Z" fill="currentColor" />
                        <path d="M12 6H10V4H12V6Z" fill="currentColor" />
                        <path d="M10 4H6V2H10V4Z" fill="currentColor" />
                        <path d="M6 2H0V0H6V2Z" fill="currentColor" />
                    </svg>
                    <div className={styles.label}>11in</div>
                </div>

                {/* Page Width */}
                <div className={styles.pagewidth}>
                    <svg width="816" height="18" viewBox="0 0 816 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.28882e-05 6V0H1.54548V6H2.28882e-05Z" fill="currentColor" />
                        <path d="M1.54548 10V6H3.09093V10H1.54548Z" fill="currentColor" />
                        <path d="M3.09093 12V10H4.63639V12H3.09093Z" fill="currentColor" />
                        <path d="M4.63639 14V12H7.7273V14H4.63639Z" fill="currentColor" />
                        <path d="M7.7273 16V14H12.3637V16H7.7273Z" fill="currentColor" />
                        <path d="M12.3637 18V16H803.636V18H12.3637Z" fill="currentColor" />
                        <path d="M803.636 16V14H808.273V16H803.636Z" fill="currentColor" />
                        <path d="M808.273 14V12H811.364V14H808.273Z" fill="currentColor" />
                        <path d="M811.364 12V10H812.909V12H811.364Z" fill="currentColor" />
                        <path d="M812.909 10V6H814.455V10H812.909Z" fill="currentColor" />
                        <path d="M814.455 6V0H816V6H814.455Z" fill="currentColor" />
                    </svg>
                    <div className={styles.label}>8.5in</div>
                </div>
            </div>
        </>
    );
}
