'use client';

import { Fragment, ReactNode, useCallback, useMemo, useState } from 'react';
import { Comment } from '@/components/comment';
import { Toggle } from '@/components/toggle';
import variables from '@/styles/exports.module.scss';
import styles from './controls.module.scss';
import { getDarkThemeNames, getLightThemeNames, getThemes } from '@/lib/themes';

type ControlProps = {
    label: string;
    key: string;
    options: string[];
    defaultOption: string;
    addDataAttr?: boolean | undefined;
    addCssVariable?: boolean | undefined;
    vertical?: boolean | undefined;
    onUpdate?: (option: string) => void;
    props?: {};
};

const colors = [
    'Primary',
    'Secondary',
    'Tertiary',
    'Accent',
    'Background-Color',
    'Text Color',
];
const themes = getThemes();
const darkOptions = getDarkThemeNames();
const lightOptions = getLightThemeNames();

function setMetaTheme(value: string, mode: string) {
    let currentMode = localStorage.getItem('prefers-color-scheme');

    if (currentMode === 'System') {
        if (
            window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches
        ) {
            currentMode = 'Dark';
        } else {
            currentMode = 'Light';
        }
    }

    if (document && currentMode === mode) {
        const backgroundColor =
            themes[mode].find(({ name }) => name === value).values[
                'background-color'
            ] ||
            (mode === 'Light'
                ? variables.defaultLightMetaTheme
                : variables.defaultDarkMetaTheme);

        // Set local storage
        localStorage.setItem('meta-theme', backgroundColor);

        // Update meta tag
        document
            .querySelector('meta[name="theme-color"]')
            ?.setAttribute('content', backgroundColor);
    }
}

function ColorGroup({ localStorageKey }): ReactNode {
    return (
        <div
            className={[styles.colors, styles[localStorageKey]].join(' ')}
            data-colors
        >
            {colors.map((name) => {
                return (
                    <div
                        key={name}
                        className={styles['color-group']}
                        data-color-group
                    >
                        <div
                            className={[
                                styles['color-label'],
                                styles[name.toLowerCase().replace('text ', '')],
                            ].join(' ')}
                            data-color-label
                        >
                            {name.replaceAll('-', ' ')}
                        </div>
                        <Color key={name} name={name} />
                    </div>
                );
            })}
        </div>
    );
}

function Color({ name }: { name: string }) {
    return (
        <div
            className={[
                styles['color-block'],
                styles[name.toLowerCase().replace('text ', '')],
            ].join(' ')}
            data-color-block
        >
            <div className={styles['color-text']}>
                <div className={styles.hex}>
                    <div className={styles.placeholder}>#000000</div>
                </div>
            </div>
        </div>
    );
}

export function Controls({}) {
    const [light, setLight] = useState('');
    const [dark, setDark] = useState('');
    const [shouldResize, setShouldResize] = useState(false);
    const controls = useMemo((): ControlProps[] => {
        return [
            {
                label: 'Mode',
                key: 'prefers-color-scheme',
                options: ['System', 'Light', 'Dark'],
                defaultOption: 'Dark',
                addDataAttr: true,
            },
            {
                label: 'Light Theme',
                key: 'light-theme',
                options: lightOptions,
                defaultOption: variables.default,
                addDataAttr: true,
                vertical: true,
                onUpdate(option) {
                    setMetaTheme(option, 'Light');
                    setLight(option);
                },
                props: {
                    ['data-mode']: 'light',
                    [`data-light-theme`]: light,
                },
            },
            {
                label: 'Dark Theme',
                key: 'dark-theme',
                options: darkOptions,
                defaultOption: variables.default,
                addDataAttr: true,
                vertical: true,
                onUpdate(option) {
                    setMetaTheme(option, 'Dark');
                    setDark(option);
                },
                props: {
                    ['data-mode']: 'dark',
                    [`data-dark-theme`]: dark,
                },
            },
            {
                label: 'Font Family',
                key: 'font-family',
                options: ['Monospace', 'Retro', 'Block', 'Sans Serif', 'Serif'],
                defaultOption: 'Monospace',
                vertical: true,
                addDataAttr: true,
            },
            {
                label: 'Font Size',
                key: 'font-size',
                options: ['12px', '16px', '20px'],
                defaultOption: '12px',
                addDataAttr: true,
            },
        ];
    }, [dark, light]);
    const resize = useCallback(() => {
        setShouldResize(true);

        // Reset state
        setTimeout(() => {
            setShouldResize(false);
        }, 0);
    }, []);

    return (
        <>
            <div className={styles.controls} data-controls>
                <Comment text={'Settings'} />
                <div className={styles.spacer} />
                {controls.map(
                    ({
                        label,
                        key,
                        options,
                        defaultOption,
                        addDataAttr,
                        addCssVariable,
                        vertical,
                        onUpdate,
                        props,
                    }) => {
                        return (
                            <Fragment key={label}>
                                <div className={styles.label} data-label>
                                    {label}
                                </div>
                                {vertical ? (
                                    <div
                                        className={styles.group}
                                        {...props}
                                        data-control-group
                                    >
                                        <Toggle
                                            options={options}
                                            defaultOption={defaultOption}
                                            localStorageKey={key}
                                            shouldResize={shouldResize}
                                            resize={resize}
                                            addDataAttr={addDataAttr}
                                            addCssVariable={addCssVariable}
                                            vertical={vertical}
                                            onUpdate={onUpdate}
                                        />
                                        {(key === 'light-theme' ||
                                            key === 'dark-theme') && (
                                            <ColorGroup localStorageKey={key} />
                                        )}
                                        {key === 'font-family' && (
                                            <div
                                                className={
                                                    styles['font-example']
                                                }
                                            >
                                                <div className={styles.content}>
                                                    <p>
                                                        "Negative. I'm a meat
                                                        popsicle."
                                                    </p>
                                                    <p className={styles.right}>
                                                        ~ Korben Dallas
                                                    </p>
                                                </div>
                                            </div>
                                        )}
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
