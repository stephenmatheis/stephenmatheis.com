'use client';

import { useEffect, useMemo, useState } from 'react';
import { useOverlay } from '@/providers/overlay';
import type { Overlay } from '@/providers/overlay';
import styles from './overlay.module.scss';

function CardTwo({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.card_two}>
            <svg width="32" height="64" viewBox="0 0 32 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M32 64H2V63H31V2H32V64ZM2 63H1V62H2V63ZM30 0V1H1V62H0V0H30ZM31 2H30V1H31V2Z" fill="black" />
            </svg>
            {children}
        </div>
    );
}

function Card({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.card}>
            <svg width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M48 252H229V248H233V252H237V256H40V252H44V248H48V252Z" fill="currentColor" />
                <path d="M40 252H36V248H40V252Z" fill="currentColor" />
                <path d="M241 252H237V248H241V252Z" fill="currentColor" />
                <path d="M36 248H32V244H36V248Z" fill="currentColor" />
                <path d="M44 248H40V244H44V248Z" fill="currentColor" />
                <path d="M237 248H233V244H237V248Z" fill="currentColor" />
                <path d="M249 248H241V244H237V240H241V8H249V248Z" fill="currentColor" />
                <path d="M32 244H28V240H32V244Z" fill="currentColor" />
                <path d="M40 244H36V240H40V244Z" fill="currentColor" />
                <path d="M28 240H24V236H28V240Z" fill="currentColor" />
                <path d="M36 240H32V236H36V240Z" fill="currentColor" />
                <path d="M256 240H253V0H256V240Z" fill="currentColor" />
                <path d="M24 236H20V232H24V236Z" fill="currentColor" />
                <path d="M32 236H28V232H32V236Z" fill="currentColor" />
                <path d="M20 232H16V228H20V232Z" fill="currentColor" />
                <path d="M28 232H24V228H28V232Z" fill="currentColor" />
                <path d="M16 220H20V224H16V228H8V16H16V220Z" fill="currentColor" />
                <path d="M24 228H20V224H24V228Z" fill="currentColor" />
                <path d="M4 220H0V8H4V220Z" fill="currentColor" />
                <path d="M24 52H20V44H24V52Z" fill="currentColor" />
                <path d="M237 44H233V40H237V44Z" fill="currentColor" />
                <path d="M24 40H20V36H24V40Z" fill="currentColor" />
                <path d="M237 36H225V28H237V36Z" fill="currentColor" />
                <path d="M32 28H20V24H32V28Z" fill="currentColor" />
                <path d="M237 24H225V20H237V24Z" fill="currentColor" />
                <path d="M32 12H28V20H20V16H24V8H32V12Z" fill="currentColor" />
                <path d="M40 16H36V8H40V16Z" fill="currentColor" />
                <path d="M48 16H44V8H48V16Z" fill="currentColor" />
                <path d="M237 16H229V12H225V8H237V16Z" fill="currentColor" />
                <path d="M20 8H16V12H8V4H16V0H20V8Z" fill="currentColor" />
                <path d="M56 12H52V8H56V12Z" fill="currentColor" />
                <path d="M188 8H180V4H176V0H188V8Z" fill="currentColor" />
                <path d="M148 4H28V0H148V4Z" fill="currentColor" />
                <path d="M168 4H156V0H168V4Z" fill="currentColor" />
                <path d="M216 4H196V0H216V4Z" fill="currentColor" />
                <path d="M249 4H224V0H249V4Z" fill="currentColor" />
            </svg>
            {children}
        </div>
    );
}

function BackSlash() {
    return (
        <svg width="245" height="14" viewBox="0 0 245 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="245" height="14" fill="url(#pattern0_119_1098)" />
            <defs>
                <pattern
                    id="pattern0_119_1098"
                    patternUnits="userSpaceOnUse"
                    viewBox="1 -27 7 14"
                    width="2.8571428571428572%"
                    height="100%"
                    patternContentUnits="objectBoundingBox"
                >
                    <path
                        d="M7 -13H8V-15H7V-13ZM6 -15H7V-17H6V-15ZM5 -17H6V-19H5V-17ZM4 -19H5V-21H4V-19ZM3 -21H4V-23H3V-21ZM2 -23H3V-25H2V-23ZM1 -25H2V-27H1V-25Z"
                        fill="currentColor"
                    />
                </pattern>
            </defs>
        </svg>
    );
}

function ForwardSlash() {
    return (
        <svg width="245" height="14" viewBox="0 0 245 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="245" height="14" fill="url(#pattern0_119_1050)" />
            <defs>
                <pattern
                    id="pattern0_119_1050"
                    patternUnits="userSpaceOnUse"
                    viewBox="0 -51 7 14"
                    width="2.8571428571428572%"
                    height="100%"
                    patternContentUnits="objectBoundingBox"
                >
                    <path
                        d="M1 -37H0V-39H1V-37ZM2 -39H1V-41H2V-39ZM3 -41H2V-43H3V-41ZM4 -43H3V-45H4V-43ZM5 -45H4V-47H5V-45ZM6 -47H5V-49H6V-47ZM7 -49H6V-51H7V-49Z"
                        fill="currentColor"
                    />
                </pattern>
            </defs>
        </svg>
    );
}

function DownSlash() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="100%">
            <defs>
                <pattern id="down-slash" patternUnits="userSpaceOnUse" width="14px" height="7px">
                    <path d="M14 6V7H12V6H14Z" fill="currentColor" />
                    <path d="M12 6H10V5H12V6Z" fill="currentColor" />
                    <path d="M10 5H8V4H10V5Z" fill="currentColor" />
                    <path d="M8 4H6V3H8V4Z" fill="currentColor" />
                    <path d="M6 3H4V2H6V3Z" fill="currentColor" />
                    <path d="M4 2H2V1H4V2Z" fill="currentColor" />
                    <path d="M2 1H0V0H2V1Z" fill="currentColor" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#down-slash)" />
        </svg>
    );
}

function UpSlash() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="100%">
            <defs>
                <pattern id="up-slash" patternUnits="userSpaceOnUse" width="14px" height="7px">
                    <path d="M2 7H0V6H2V7Z" fill="currentColor" />
                    <path d="M4 6H2V5H4V6Z" fill="currentColor" />
                    <path d="M6 5H4V4H6V5Z" fill="currentColor" />
                    <path d="M8 4H6V3H8V4Z" fill="currentColor" />
                    <path d="M10 3H8V2H10V3Z" fill="currentColor" />
                    <path d="M12 2H10V1H12V2Z" fill="currentColor" />
                    <path d="M14 1H12V0H14V1Z" fill="currentColor" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#up-slash)" />
        </svg>
    );
}

export function Overlay() {
    const [viewport, setViewport] = useState({ width: 0, height: 0 });
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const { overlays, setOverlays } = useOverlay();
    const isAllOn = useMemo(() => Object.values(overlays).every((value) => value), [overlays]);

    useEffect(() => {
        function updateMousePosition(event: PointerEvent) {
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
                {/* Top Left */}
                <div className={styles.topleftarm}>
                    <ForwardSlash />
                </div>

                {/* Top Right Arm */}
                <div className={styles.toprightarm}>
                    <BackSlash />
                </div>

                {/* Left Arm */}
                {/* <div className={styles.leftarm}>
                    <UpSlash />
                </div> */}

                {/* Right Arm */}
                {/* <div className={styles.rightarm}>
                    <DownSlash />
                </div> */}

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
                        <span className={styles.name}>Content Width</span>
                        <span className={styles.value}>95ch</span>
                        <span className={styles.alt}>665px</span>
                    </div>
                    <div className={styles.item}>
                        <span className={styles.name}>Left Column</span>
                        <span className={styles.value}>56ch</span>
                        <span className={styles.alt}>392px</span>
                    </div>
                    <div className={styles.item}>
                        <span className={styles.name}>Right Column</span>
                        <span className={styles.value}>35ch</span>
                        <span className={styles.alt}>245px</span>
                    </div>
                    <div className={styles.item}>
                        <span className={styles.name}>Gap</span>
                        <span className={styles.value}>4ch</span>
                        <span className={styles.alt}>28px</span>
                    </div>
                    <div className={styles.item}>
                        <span className={styles.name}>Font Size</span>
                        <span className={styles.value}>11px</span>
                        <span className={styles.alt}>1rem</span>
                    </div>
                    <div className={styles.item}>
                        <span className={styles.name}>Line Height</span>
                        <span className={styles.value}>16.5px</span>
                        <span className={styles.alt}>1.5rem</span>
                    </div>
                    <div className={styles.item}>
                        <span className={styles.name}>Character Width</span>
                        <span className={styles.value}>7px</span>
                        <span className={styles.alt}>1ch</span>
                    </div>
                    <div className={styles.item}>
                        <span className={styles.name}>Padding Top</span>
                        <span className={styles.value}>3 Lines</span>
                        <span className={styles.alt}>49.5px</span>
                    </div>
                    <div className={styles.item}>
                        <span className={styles.name}>Padding Bottom</span>
                        <span className={styles.value}>3 Lines</span>
                        <span className={styles.alt}>49.5px</span>
                    </div>
                    <div className={styles.item}>
                        <span className={styles.name}>Content height</span>
                        <span className={styles.value}>58 lines</span>
                        <span className={styles.alt}>957px</span>
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
                    {/* Pointer */}
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
                    {/* Toggles */}
                    <div className={styles.toggles}>
                        <div className={styles.title}>Toggle Overlays</div>
                        {Object.entries(overlays).map(([key, value]) => (
                            <button
                                key={key}
                                className={`${styles.item}${value ? ` ${styles.on}` : ''}`}
                                onClick={() =>
                                    setOverlays((prev) => ({
                                        ...prev,
                                        [key]: !prev[key as keyof typeof overlays],
                                    }))
                                }
                            >
                                <span className={styles.name}>
                                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                                </span>
                                <span className={styles.value}>{value ? 'ON' : 'OFF'}</span>
                            </button>
                        ))}
                        <button
                            className={`${styles.item}${isAllOn ? ` ${styles.on}` : ''}`}
                            onClick={() =>
                                setOverlays((prev) => {
                                    return Object.fromEntries(
                                        Object.entries(prev).map(([key, _]) => {
                                            return [key, isAllOn ? false : true];
                                        })
                                    ) as Overlay;
                                })
                            }
                        >
                            <span className={styles.name}>All</span>
                            <span className={styles.value}>
                                {Object.values(overlays).every((value) => value) ? 'ON' : 'OFF'}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Bottom Left */}
                <div className={styles.bottomleft}>
                    <CardTwo>Test</CardTwo>
                    <br />
                    <br />
                    <Card>Test</Card>
                </div>

                {/* Bottom Right */}
                <div className={styles.bottomright}></div>
            </div>
            <div className={`${styles.page}${overlays.page ? ` ${styles.on}` : ''}`}>
                <main className={styles.content}>
                    {/* Character Width */}
                    <div className={`${styles.charWidth}${overlays.charWidth ? ` ${styles.on}` : ''}`}>
                        <svg width="7" height="2" viewBox="0 0 7 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect y="1" width="7" height="1" fill="currentColor" />
                            <rect width="1" height="1" fill="currentColor" />
                            <rect x="6" width="1" height="1" fill="currentColor" />
                        </svg>
                        <div className={styles.label}>7px</div>
                    </div>

                    {/* Font Size */}
                    <div className={`${styles.fontsize}${overlays.fontSize ? ` ${styles.on}` : ''}`}>
                        <svg width="2" height="11" viewBox="0 0 2 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="1" width="1" height="11" fill="currentColor" />
                            <rect width="1" height="1" fill="currentColor" />
                            <rect y="10" width="1" height="1" fill="currentColor" />
                        </svg>
                        <div className={styles.label}>11px</div>
                    </div>

                    {/* Line Height */}
                    <div className={`${styles.lineheight}${overlays.lineHeight ? ` ${styles.on}` : ''}`}>
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
                    <div className={`${styles.leftwidth}${overlays.leftWidth ? ` ${styles.on}` : ''}`}>
                        <svg width="392" height="7" viewBox="0 0 392 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M4 7H3V6H4V7ZM389 7H388V6H389V7ZM3 6H2V5H3V6ZM390 6H389V5H390V6ZM2 3H390V2H391V3H392V4H391V5H390V4H2V5H1V4H0V3H1V2H2V3ZM3 2H2V1H3V2ZM390 2H389V1H390V2ZM4 1H3V0H4V1ZM389 1H388V0H389V1Z"
                                fill="currentColor"
                            />
                        </svg>
                        <div className={styles.label}>56ch</div>
                    </div>

                    {/* Gap */}
                    <div className={styles.gap}>
                        <svg width="28" height="3" viewBox="0 0 28 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1H27V0H28V3H27V2H1V3H0V0H1V1Z" fill="currentColor" />
                        </svg>
                        <div className={styles.label}>4ch</div>
                    </div>

                    {/* Right Column Width */}
                    <div className={`${styles.rightwidth}${overlays.rightWidth ? ` ${styles.on}` : ''}`}>
                        <svg width="245" height="7" viewBox="0 0 245 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M4 7H3V6H4V7ZM242 7H241V6H242V7ZM3 6H2V5H3V6ZM243 6H242V5H243V6ZM2 3H243V2H244V3H245V4H244V5H243V4H2V5H1V4H0V3H1V2H2V3ZM3 2H2V1H3V2ZM243 2H242V1H243V2ZM4 1H3V0H4V1ZM242 1H241V0H242V1Z"
                                fill="currentColor"
                            />
                        </svg>
                        <div className={styles.label}>35ch</div>
                    </div>

                    <div className={`${styles.left}${overlays.left ? ` ${styles.on}` : ''}`} />
                    <div className={`${styles.right}${overlays.right ? ` ${styles.on}` : ''}`} />
                </main>

                {/* Page Padding */}
                <div className={`${styles.paddingbottom}${overlays.paddingBottom ? ` ${styles.on}` : ''}`}>
                    <svg width="3" height="50" viewBox="0 0 3 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 0V1H2V48.5H3V49.5H0V48.5H1V1H0V0H3Z" fill="currentColor" />
                    </svg>
                    <div className={styles.label}>3 lines</div>
                </div>

                {/* Page Padding */}
                <div className={`${styles.paddingtop}${overlays.paddingTop ? ` ${styles.on}` : ''}`}>
                    <svg width="3" height="50" viewBox="0 0 3 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 0V1H2V48.5H3V49.5H0V48.5H1V1H0V0H3Z" fill="currentColor" />
                    </svg>
                    <div className={styles.label}>3 lines</div>
                </div>

                {/* Content Height */}
                <div className={`${styles.contentheight}${overlays.contentHeight ? ` ${styles.on}` : ''}`}>
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
                <div className={`${styles.contentwidth}${overlays.contentWidth ? ` ${styles.on}` : ''}`}>
                    <svg width="665" height="7" viewBox="0 0 665 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M4 7H3V6H4V7ZM662 7H661V6H662V7ZM3 6H2V5H3V6ZM663 6H662V5H663V6ZM2 3H663V2H664V3H665V4H664V5H663V4H2V5H1V4H0V3H1V2H2V3ZM3 2H2V1H3V2ZM663 2H662V1H663V2ZM4 1H3V0H4V1ZM662 1H661V0H662V1Z"
                            fill="currentColor"
                        />
                    </svg>
                    <div className={styles.label}>95ch</div>
                </div>

                {/* Page Height */}
                <div className={`${styles.pageheight}${overlays.pageHeight ? ` ${styles.on}` : ''}`}>
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
                <div className={`${styles.pagewidth}${overlays.pageWidth ? ` ${styles.on}` : ''}`}>
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
