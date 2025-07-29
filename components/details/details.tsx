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
                        onMouseOver={() => {
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
                        onMouseLeave={() => {
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

                {/* Font */}
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
                        onMouseOver={() => {
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
                        onMouseLeave={() => {
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
                <br />

                {/* Colors */}
                <div className={styles.title}>Colors</div>
                {[
                    {
                        key: 'backgroundColor',
                        name: 'Background Color',
                        value: '#fefefe',
                        alt: '--background-color',
                    },
                    {
                        key: 'color',
                        name: 'Color',
                        value: '#787878',
                        alt: '--background-color',
                    },
                    {
                        key: 'muted',
                        name: 'Muted',
                        value: '#a5a5a5',
                        alt: '--muted',
                    },
                    {
                        key: 'light',
                        name: 'Light',
                        value: '#bbbbbb',
                        alt: '--light',
                    },
                    {
                        key: 'lighter',
                        name: 'Lighter',
                        value: '#dddddd',
                        alt: '--lighter',
                    },
                    {
                        key: 'lightest',
                        name: 'Lightest',
                        value: '#e0e0e0',
                        alt: '--lightest',
                    },
                    {
                        key: 'accent',
                        name: 'Accent',
                        value: '#ff0000',
                        alt: '--accent',
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
                        onMouseOver={() => {
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
                        onMouseLeave={() => {
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

                {/* User Interface */}
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
                        onMouseOver={() => {
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
                        onMouseLeave={() => {
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

                {/* Bounding Boxes */}
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
                        onMouseOver={() => {
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
                        onMouseLeave={() => {
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
