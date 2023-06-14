'use client';

import {
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import classNames from 'classnames';
import styles from './toggle.module.scss';

type Props = {
    options: string[];
    localStorageKey: string;
    defaultOption?: string | undefined;
    addDataAttr?: boolean;
    addCssVariable?: boolean;
    shouldResize: boolean;
    setShouldResize: Dispatch<SetStateAction<boolean>>;
};

export function Toggle({
    options,
    localStorageKey,
    defaultOption,
    addDataAttr = false,
    addCssVariable = false,
    shouldResize,
    setShouldResize,
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

        const { width } = ref.current.children[0].getBoundingClientRect();

        ref.current.style.setProperty('--indicator-width', `${width}px`);
    }, []);

    useEffect(() => {
        if (shouldResize) {
            setWidth();
        }
    }, [setWidth, shouldResize]);

    useEffect(() => {
        const localMode = localStorage.getItem(localStorageKey);

        if (localMode) {
            setSelectedValue(localMode);
        } else {
            setSelectedValue(defaultOption || options[0]);
        }

        if (!ref.current) {
            return;
        }

        setWidth();
    }, [setSelectedValue, options, localStorageKey, defaultOption, setWidth]);

    // 3px

    return (
        <button
            ref={ref}
            onClick={(event: any) => {
                setSelectedValue(event.target.dataset.option);

                // Set indicator width
                setShouldResize(true);

                // Reset state
                setTimeout(() => {
                    setShouldResize(false);
                }, 0);
            }}
            className={classNames(styles.toggle, {
                [styles.hidden]: selectedOption === '',
            })}
            aria-label={`Activate ${selectedOption} mode`}
            title={`Activate ${selectedOption} mode`}
            style={{
                gridTemplateColumns: `repeat(${options.length}, 1fr)`,
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
