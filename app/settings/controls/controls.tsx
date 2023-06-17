'use client';

import { Fragment, useCallback, useMemo, useState } from 'react';
import { Comment } from '@/components/comment';
import { Toggle } from '@/components/toggle';
import styles from './controls.module.scss';

type ControlProps = {
    label: string;
    key: string;
    options: string[];
    defaultOption: string;
    addDataAttr?: boolean;
    addCssVariable?: boolean;
    vertical?: boolean;
};

const colors = ['Primary', 'Secondary', 'Tertiary', 'Accent'];

function Color({ name }: { name: string }) {
    return (
        <div className={styles[name.toLowerCase()]}>
            <div>
                <div>{name}</div>
                <div className={styles.hex}>#xxxxxxx</div>
            </div>
        </div>
    );
}

export function Controls({}) {
    const [shouldResize, setShouldResize] = useState(false);
    const controls = useMemo((): ControlProps[] => {
        return [
            {
                label: 'Mode',
                key: 'prefers-color-scheme',
                options: ['Light', 'Dark'],
                defaultOption: 'Light',
                addDataAttr: true,
            },
            {
                label: 'Light Theme',
                key: 'light-theme',
                options: ['Green', 'Blue', 'Red', 'Monochrome'],
                defaultOption: 'Green',
                addDataAttr: true,
                vertical: true,
            },
            {
                label: 'Dark Theme',
                key: 'dark-theme',
                options: ['Green', 'Blue', 'Red', 'Monochrome'],
                defaultOption: 'Green',
                addDataAttr: true,
                vertical: true,
            },
            {
                label: 'Font Family',
                key: 'font-family',
                options: ['Monospace', 'Sans Serif', 'Serif'],
                defaultOption: 'Monospace',
                addDataAttr: true,
            },
            {
                label: 'Font Size',
                key: 'font-size',
                options: ['12px', '16px', '20px'],
                defaultOption: '12px',
                addCssVariable: true,
            },
        ];
    }, []);
    const resize = useCallback(() => {
        setShouldResize(true);

        // Reset state
        setTimeout(() => {
            setShouldResize(false);
        }, 0);
    }, []);

    return (
        <>
            <div className={styles.controls}>
                <Comment text={'Settings'} />
                <div />
                {controls.map(
                    ({
                        label,
                        key,
                        options,
                        defaultOption,
                        addDataAttr,
                        addCssVariable,
                        vertical,
                    }) => {
                        return (
                            <Fragment key={label}>
                                <div className={styles.label}>{label}</div>
                                {vertical ? (
                                    <div className={styles.group}>
                                        <Toggle
                                            options={options}
                                            defaultOption={defaultOption}
                                            localStorageKey={key}
                                            shouldResize={shouldResize}
                                            resize={resize}
                                            addDataAttr={addDataAttr}
                                            addCssVariable={addCssVariable}
                                            vertical={vertical}
                                        />
                                        <div className={styles.colors}>
                                            {colors.map((name) => {
                                                return (
                                                    <Color
                                                        key={name}
                                                        name={name}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                ) : (
                                    <Toggle
                                        options={options}
                                        defaultOption={defaultOption}
                                        localStorageKey={key}
                                        shouldResize={shouldResize}
                                        resize={resize}
                                        addDataAttr={addDataAttr}
                                        addCssVariable={addCssVariable}
                                        vertical={vertical}
                                    />
                                )}
                            </Fragment>
                        );
                    }
                )}
            </div>
            <div className={styles['reset-btn-ctr']}>
                <button
                    className={styles.reset}
                    onClick={() => {
                        for (let control of controls) {
                            const {
                                key,
                                defaultOption,
                                addDataAttr,
                                addCssVariable,
                            } = control;

                            localStorage.setItem(key, defaultOption);

                            if (addDataAttr) {
                                document.documentElement.setAttribute(
                                    `data-${key}`,
                                    defaultOption
                                );
                            }

                            if (addCssVariable) {
                                document.documentElement.style.setProperty(
                                    `--${key}`,
                                    defaultOption
                                );
                            }
                        }

                        resize();
                    }}
                >
                    Restore defaults
                </button>
            </div>
        </>
    );
}
