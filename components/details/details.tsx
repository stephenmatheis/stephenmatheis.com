'use client';

import { useMemo } from 'react';
import { useOverlay } from '@/providers/overlay';
import type { Overlay } from '@/providers/overlay';
import { Legend } from '@/components/legend';
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
                <Legend
                    items={[
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
                    ]}
                />

                {/* Font */}
                <Legend
                    items={[
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
                    ]}
                />

                {/* Colors */}
                <Legend
                    items={[
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
                            alt: '',
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
                    ]}
                />

                {/* Bounding Boxes */}
                <Legend
                    items={[
                        {
                            key: 'page',
                            name: 'Page',
                            value: '',
                            alt: '',
                        },
                        {
                            key: 'left',
                            name: 'Left Column',
                            value: '',
                            alt: '',
                        },
                        {
                            key: 'right',
                            name: 'Right Column',
                            value: '',
                            alt: '',
                        },
                    ]}
                />

                {/* User Interface */}
                <Legend
                    items={[
                        {
                            key: 'tabs',
                            name: 'Navigation',
                            value: '',
                            alt: '',
                        },
                        {
                            key: 'numbers',
                            name: 'Numbers',
                            value: '',
                            alt: '',
                        },
                        {
                            key: 'statusBar',
                            name: 'Status Bar',
                            value: '',
                            alt: '',
                        },
                    ]}
                />

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
