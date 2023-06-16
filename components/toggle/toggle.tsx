'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './toggle.module.scss';

type Props = {
    options: string[];
    localStorageKey: string;
    defaultOption?: string | undefined;
    addDataAttr?: boolean;
    addCssVariable?: boolean;
    vertical?: boolean;
    shouldResize: boolean;
    resize: () => void;
};

export function Toggle({
    options,
    localStorageKey,
    defaultOption,
    addDataAttr = false,
    addCssVariable = false,
    vertical = false,
    shouldResize,
    resize,
}: Props) {
    const ref = useRef<HTMLButtonElement>(null);
    const [selectedOption, setSelectedOption] = useState('');
    const setSelectedValue = useCallback(
        (option: string) => {
            setSelectedOption(option);

            // Update local storage
            localStorage.setItem(localStorageKey, option);

            // Update html attr
            if (addDataAttr) {
                document.documentElement.setAttribute(
                    `data-${localStorageKey}`,
                    option
                );
            }

            if (addCssVariable) {
                // Update CSS Varaible
                document.documentElement.style.setProperty(
                    `--${localStorageKey}`,
                    option
                );
            }

            if (!ref.current) {
                return;
            }

            const index = options.indexOf(option).toString();

            ref.current.style.setProperty('--modifier', index);
        },
        [addCssVariable, addDataAttr, localStorageKey, options]
    );
    const setWidth = useCallback(() => {
        if (!ref.current) {
            return;
        }

        const { width, height } =
            ref.current.children[0].getBoundingClientRect();

        ref.current.style.setProperty('--indicator-height', `${height}px`);
        ref.current.style.setProperty('--indicator-width', `${width}px`);
    }, []);
    const updateValue = useCallback(() => {
        const localValue = localStorage.getItem(localStorageKey);

        if (localValue) {
            setSelectedValue(localValue);
        } else {
            setSelectedValue(defaultOption || options[0]);
        }
    }, [defaultOption, localStorageKey, options, setSelectedValue]);

    useEffect(() => {
        if (shouldResize) {
            updateValue();
            setWidth();
        }
    }, [setWidth, shouldResize, updateValue]);

    useEffect(() => {
        updateValue();

        if (!ref.current) {
            return;
        }

        setWidth();
    }, [setWidth, updateValue]);

    // 3px

    return (
        <button
            ref={ref}
            onClick={(event: any) => {
                setSelectedValue(event.target.dataset.option);
                resize();
            }}
            className={classNames(styles.toggle, {
                [styles.hidden]: selectedOption === '',
                [styles.vertical]: vertical,
            })}
            aria-label={`Activate ${selectedOption} mode`}
            title={`Activate ${selectedOption} mode`}
            style={{
                gridTemplateColumns: vertical
                    ? undefined
                    : `repeat(${options.length}, 1fr)`,
            }}
        >
            {options.map((option: string, index: number) => {
                return (
                    <span key={option} data-option={option}>
                        {option}
                    </span>
                );
            })}
            <span
                className={classNames(styles.indicator, {
                    [styles.hidden]: selectedOption === '',
                })}
                data-index={options.indexOf(selectedOption)}
            />
        </button>
    );
}
