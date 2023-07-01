'use client';

import {
    Dispatch,
    Fragment,
    SetStateAction,
    useCallback,
    useMemo,
    useState,
} from 'react';
import { Comment } from '@/components/comment';
import { Toggle } from '@/components/toggle';
import variables from '@/styles/exports.module.scss';
import styles from './controls.module.scss';

// FIXME: move to types
type Variable = {
    name: string;
    value: string;
};

type Variables = {
    color: string;
    variables: Variable[];
};

type ControlProps = {
    label: string;
    key: string;
    options: string[];
    variables?: Variables[];
    defaultOption: string;
    addDataAttr?: boolean | undefined;
    addCssVariable?: boolean | undefined;
    vertical?: boolean | undefined;
    onUpdate?: Dispatch<SetStateAction<string>> | undefined;
    props?: {};
};

const colors = ['Primary', 'Secondary', 'Tertiary', 'Accent'];

function getVariables({ name, values, mode }) {
    return {
        color: name,
        variables: [
            {
                name: 'meta-theme',
                value:
                    values['background-color'] || mode === 'dark'
                        ? variables.defaultDarkMetaTheme
                        : variables.defaultLightMetaTheme,
            },
        ],
    };
}

function getMap(str: string) {
    const [color, values] = str.split(' - ');
    const names = values
        .split(',')
        .filter((x) => x)
        .map((name) => {
            const [key, value] = name.split(' > ');
            return `"${key}": "${value}"`;
        });

    return {
        name: color.trim(),
        values: JSON.parse(`{ ${names.join(', ')} }`),
    };
}

function Color({ name }: { name: string }) {
    return (
        <div
            className={[styles['color-block'], styles[name.toLowerCase()]].join(
                ' '
            )}
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
    const darkMap = variables.Dark.split('|').map(getMap);
    const darkOptions = darkMap.map(({ name }) => name);
    const darkVariables = darkMap.map(({ name, values }) =>
        getVariables({ name, values, mode: 'dark' })
    );

    const lightMap = variables.Dark.split('|').map(getMap);
    const lightOptions = lightMap.map(({ name }) => name);
    const lightVariables = lightMap.map(({ name, values }) =>
        getVariables({ name, values, mode: 'light' })
    );

    // console.log(lightVariables);

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
                variables: lightVariables,
                defaultOption: variables.default,
                addDataAttr: true,
                vertical: true,
                onUpdate: setLight,
                props: {
                    ['data-mode']: 'light',
                    [`data-light-theme`]: light,
                },
            },
            {
                label: 'Dark Theme',
                key: 'dark-theme',
                options: darkOptions,
                variables: darkVariables,
                defaultOption: variables.default,
                addDataAttr: true,
                vertical: true,
                onUpdate: setDark,
                props: {
                    ['data-mode']: 'dark',
                    [`data-dark-theme`]: dark,
                },
            },
            {
                label: 'Font Family',
                key: 'font-family',
                options: ['Monospace', 'Retro', 'Sans Serif', 'Serif'],
                defaultOption: 'Monospace',
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
            <div className={styles.controls}>
                <Comment text={'Settings'} />
                <div className={styles.spacer} />
                {controls.map(
                    ({
                        label,
                        key,
                        options,
                        variables,
                        defaultOption,
                        addDataAttr,
                        addCssVariable,
                        vertical,
                        onUpdate,
                        props,
                    }) => {
                        return (
                            <Fragment key={label}>
                                <div className={styles.label}>{label}</div>
                                {vertical ? (
                                    <div className={styles.group} {...props}>
                                        <Toggle
                                            options={options}
                                            defaultOption={defaultOption}
                                            localStorageKey={key}
                                            shouldResize={shouldResize}
                                            resize={resize}
                                            variables={variables}
                                            addDataAttr={addDataAttr}
                                            addCssVariable={addCssVariable}
                                            vertical={vertical}
                                            onUpdate={onUpdate}
                                        />
                                        <div
                                            className={[
                                                styles.colors,
                                                styles[key],
                                            ].join(' ')}
                                        >
                                            {colors.map((name) => {
                                                return (
                                                    <div
                                                        key={name}
                                                        className={
                                                            styles[
                                                                'color-group'
                                                            ]
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                styles[
                                                                    'color-label'
                                                                ]
                                                            }
                                                        >
                                                            {name}
                                                        </div>
                                                        <Color
                                                            key={name}
                                                            name={name}
                                                        />
                                                    </div>
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
