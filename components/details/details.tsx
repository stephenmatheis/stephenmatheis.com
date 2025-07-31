'use client';

import { useMemo } from 'react';
import { useOverlay } from '@/providers/overlay';
import type { Overlay } from '@/providers/overlay';
import styles from './details.module.scss';

type DetailsProps = {};

export function Details({}: DetailsProps) {
    const { overlays, setOverlays } = useOverlay();
    const isAllOn = useMemo(
        () => Object.values(overlays).every(({ isOn, isHovered }) => isOn || isHovered),
        [overlays]
    );

    return (
        <div className={styles['details-wrapper']}>
            <div className={styles.details}>
                {/* Page */}
                <div className={styles['page-details']}>
                    <div className={styles.title}>Page</div>
                    {[
                        {
                            key: 'pageWidth',
                            name: 'Page Width',
                            value: '8.5in',
                            alt: '816px',
                        },
                        {
                            key: 'pageHeight',
                            name: 'Page Height',
                            value: '11in',
                            alt: '1056px',
                        },
                        {
                            key: 'contentWidth',
                            name: 'Content Width',
                            value: '95ch',
                            alt: '665px',
                        },
                        {
                            key: 'contentHeight',
                            name: 'Content height',
                            value: '58 lines',
                            alt: '957px',
                        },
                        {
                            key: 'leftWidth',
                            name: 'Left Width',
                            value: '56ch',
                            alt: '392px',
                        },
                        {
                            key: 'rightWidth',
                            name: 'Right Column',
                            value: '35ch',
                            alt: '245px',
                        },
                        {
                            key: 'gap',
                            name: 'Gap',
                            value: '4ch',
                            alt: '28px',
                        },
                        {
                            key: 'paddingTop',
                            name: 'Padding Top',
                            value: '3 Lines',
                            alt: '49.5px',
                        },
                        {
                            key: 'paddingBottom',
                            name: 'Padding Bottom',
                            value: '3 Lines',
                            alt: '49.5px',
                        },
                    ].map(({ key, name, value, alt }) => (
                        <button
                            key={key}
                            className={`${styles.item}${
                                overlays[key as keyof Overlay].isHovered || overlays[key as keyof Overlay].isOn
                                    ? ` ${styles.on}`
                                    : ''
                            }`}
                            onClick={() => {
                                setOverlays((prev) => ({
                                    ...prev,
                                    [key]: {
                                        ...prev[key as keyof Overlay],
                                        isOn: !prev[key as keyof Overlay].isOn,
                                    },
                                }));
                            }}
                            onPointerOver={(event: React.PointerEvent) => {
                                if (event.pointerType === 'touch') return;

                                setOverlays((prev) => {
                                    return {
                                        ...prev,
                                        [key]: {
                                            ...prev[key as keyof Overlay],
                                            isHovered: true,
                                        },
                                    };
                                });
                            }}
                            onPointerLeave={(event: React.PointerEvent) => {
                                if (event.pointerType === 'touch') return;

                                setOverlays((prev) => {
                                    return {
                                        ...prev,
                                        [key]: {
                                            ...prev[key as keyof Overlay],
                                            isHovered: false,
                                        },
                                    };
                                });
                            }}
                        >
                            <span className={styles.name}>{name}</span>
                            <span className={styles.value}>{value}</span>
                            <span className={styles.alt}>{alt}</span>
                        </button>
                    ))}
                    <br />
                </div>

                {/* Font */}
                <div className={styles['font-details']}>
                    <div className={styles.title}>Text</div>
                    {[
                        {
                            key: 'fontFamily',
                            name: 'Font Family',
                            value: 'Departure Mono',
                            alt: 'v1.500',
                        },
                        {
                            key: 'fontSize',
                            name: 'Font Size',
                            value: '11px',
                            alt: '1rem',
                        },
                        {
                            key: 'lineHeight',
                            name: 'Line Height',
                            value: '16.5px',
                            alt: '1.5rem',
                        },
                        {
                            key: 'charWidth',
                            name: 'Character Width',
                            value: '7px',
                            alt: '1ch',
                        },
                    ].map(({ key, name, value, alt }) => (
                        <button
                            key={key}
                            className={`${styles.item}${
                                overlays[key as keyof Overlay].isHovered || overlays[key as keyof Overlay].isOn
                                    ? ` ${styles.on}`
                                    : ''
                            }`}
                            onClick={() => {
                                setOverlays((prev) => ({
                                    ...prev,
                                    [key]: {
                                        ...prev[key as keyof Overlay],
                                        isOn: !prev[key as keyof Overlay].isOn,
                                    },
                                }));
                            }}
                            onPointerOver={(event: React.PointerEvent) => {
                                if (event.pointerType === 'touch') return;

                                setOverlays((prev) => {
                                    return {
                                        ...prev,
                                        [key]: {
                                            ...prev[key as keyof Overlay],
                                            isHovered: true,
                                        },
                                    };
                                });
                            }}
                            onPointerLeave={(event: React.PointerEvent) => {
                                if (event.pointerType === 'touch') return;

                                setOverlays((prev) => {
                                    return {
                                        ...prev,
                                        [key]: {
                                            ...prev[key as keyof Overlay],
                                            isHovered: false,
                                        },
                                    };
                                });
                            }}
                        >
                            <span className={styles.name}>{name}</span>
                            <span className={styles.value}>{value}</span>
                            <span className={styles.alt}>{alt}</span>
                        </button>
                    ))}
                    <br />
                </div>

                {/* Colors */}
                <div className={styles['color-details']}>
                    <div className={styles.title}>Colors</div>
                    {[
                        {
                            key: 'backgroundColor',
                            name: '--background-color',
                            value: '#fefefe',
                            alt: '',
                        },
                        {
                            key: 'color',
                            name: '--background-color',
                            value: '#787878',
                            alt: '',
                        },
                        {
                            key: 'muted',
                            name: '--muted',
                            value: '#a5a5a5',
                            alt: 'x',
                        },
                        {
                            key: 'light',
                            name: '--light',
                            value: '#bbbbbb',
                            alt: '',
                        },
                        {
                            key: 'lighter',
                            name: '--lighter',
                            value: '#dddddd',
                            alt: '',
                        },
                        {
                            key: 'lightest',
                            name: '--lightest',
                            value: '#e0e0e0',
                            alt: '',
                        },
                        {
                            key: 'accent',
                            name: '--accent',
                            value: '#ff0000',
                            alt: '',
                        },
                    ].map(({ key, name, value, alt }) => (
                        <button
                            key={key}
                            className={`${styles.item}${
                                overlays[key as keyof Overlay].isHovered || overlays[key as keyof Overlay].isOn
                                    ? ` ${styles.on}`
                                    : ''
                            }`}
                            onClick={() => {
                                setOverlays((prev) => ({
                                    ...prev,
                                    [key]: {
                                        ...prev[key as keyof Overlay],
                                        isOn: !prev[key as keyof Overlay].isOn,
                                    },
                                }));
                            }}
                            onPointerOver={(event: React.PointerEvent) => {
                                if (event.pointerType === 'touch') return;

                                setOverlays((prev) => {
                                    return {
                                        ...prev,
                                        [key]: {
                                            ...prev[key as keyof Overlay],
                                            isHovered: true,
                                        },
                                    };
                                });
                            }}
                            onPointerLeave={(event: React.PointerEvent) => {
                                if (event.pointerType === 'touch') return;

                                setOverlays((prev) => {
                                    return {
                                        ...prev,
                                        [key]: {
                                            ...prev[key as keyof Overlay],
                                            isHovered: false,
                                        },
                                    };
                                });
                            }}
                        >
                            <span className={styles.name}>{name}</span>
                            <span className={styles.value}>{value}</span>
                            <span className={styles.alt}>{alt}</span>
                        </button>
                    ))}
                    <br />
                </div>

                {/* Bounding Boxes */}
                <div className={styles['box-details']}>
                    <div className={styles.title}>Bounding Boxes</div>
                    {[
                        {
                            key: 'page',
                            name: 'Page',
                        },
                        {
                            key: 'left',
                            name: 'Left Column',
                        },
                        {
                            key: 'right',
                            name: 'Right Column',
                        },
                    ].map(({ key, name }) => (
                        <button
                            key={key}
                            className={`${styles.item}${
                                overlays[key as keyof Overlay].isHovered || overlays[key as keyof Overlay].isOn
                                    ? ` ${styles.on}`
                                    : ''
                            }`}
                            onClick={() => {
                                setOverlays((prev) => ({
                                    ...prev,
                                    [key]: {
                                        ...prev[key as keyof Overlay],
                                        isOn: !prev[key as keyof Overlay].isOn,
                                    },
                                }));
                            }}
                            onPointerOver={(event: React.PointerEvent) => {
                                if (event.pointerType === 'touch') return;

                                setOverlays((prev) => {
                                    return {
                                        ...prev,
                                        [key]: {
                                            ...prev[key as keyof Overlay],
                                            isHovered: true,
                                        },
                                    };
                                });
                            }}
                            onPointerLeave={(event: React.PointerEvent) => {
                                if (event.pointerType === 'touch') return;

                                setOverlays((prev) => ({
                                    ...prev,
                                    [key]: {
                                        ...prev[key as keyof Overlay],
                                        isHovered: false,
                                    },
                                }));
                            }}
                        >
                            <span className={styles.name}>{name}</span>
                        </button>
                    ))}
                    <br />
                </div>

                {/* User Interface */}
                <div className={styles['ui-details']}>
                    <div className={styles.title}>User Interface</div>
                    {[
                        {
                            key: 'tabs',
                            name: 'Navigation',
                        },
                        {
                            key: 'numbers',
                            name: 'Numbers',
                        },
                        {
                            key: 'statusBar',
                            name: 'Status Bar',
                        },
                    ].map(({ key, name }) => (
                        <button
                            key={key}
                            className={`${styles.item}${
                                overlays[key as keyof Overlay].isHovered || overlays[key as keyof Overlay].isOn
                                    ? ` ${styles.on}`
                                    : ''
                            }`}
                            onClick={() => {
                                setOverlays((prev) => ({
                                    ...prev,
                                    [key]: {
                                        ...prev[key as keyof Overlay],
                                        isOn: !prev[key as keyof Overlay].isOn,
                                    },
                                }));
                            }}
                            onPointerOver={(event: React.PointerEvent) => {
                                if (event.pointerType === 'touch') return;

                                setOverlays((prev) => {
                                    return {
                                        ...prev,
                                        [key]: {
                                            ...prev[key as keyof Overlay],
                                            isHovered: true,
                                        },
                                    };
                                });
                            }}
                            onPointerLeave={(event: React.PointerEvent) => {
                                if (event.pointerType === 'touch') return;

                                setOverlays((prev) => ({
                                    ...prev,
                                    [key]: {
                                        ...prev[key as keyof Overlay],
                                        isHovered: false,
                                    },
                                }));
                            }}
                        >
                            <span className={styles.name}>{name}</span>
                        </button>
                    ))}
                    <br />
                </div>

                {/* All */}
                <button
                    className={`${styles.item}${isAllOn ? ` ${styles.on}` : ''}`}
                    onClick={() =>
                        setOverlays((prev) => {
                            return Object.fromEntries(
                                Object.entries(prev).map(([key, _]) => {
                                    return [key, isAllOn ? { ..._, isOn: false } : { ..._, isOn: true }];
                                })
                            ) as Overlay;
                        })
                    }
                    onMouseOver={() => {
                        setOverlays((prev) => {
                            return Object.fromEntries(
                                Object.entries(prev).map(([key, _]) => {
                                    return [key, { ..._, isHovered: true }];
                                })
                            ) as Overlay;
                        });
                    }}
                    onMouseLeave={() => {
                        setOverlays((prev) => {
                            return Object.fromEntries(
                                Object.entries(prev).map(([key, _]) => {
                                    return [key, { ..._, isHovered: false }];
                                })
                            ) as Overlay;
                        });
                    }}
                >
                    <span className={styles.name}>Display All</span>
                </button>
            </div>
        </div>
    );
}
