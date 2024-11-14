'use client';

import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import styles from './title.module.scss';

const replacements: { [key: string]: string } = {
    E: '3ΣΞ€Ǝ',
    A: 'Λ',
    R: '2₹',
    T: '7',
    U: 'Ʉ',
    ' ': '_',
    O: '0',
    N: 'Ɲ',
};
const originalTitle = 'MANIFESTING';
const originalSpace = ' ';
const originalSubTitle = 'DREAMS';

function replaceCharacters(text: string, replacementPattern: number[]): string {
    const numReplacements: number =
        replacementPattern[
            Math.floor(Math.random() * replacementPattern.length)
        ];
    const chars: string[] = text.split('');
    const shuffledIndices: number[] = Array.from(
        Array(chars.length).keys()
    ).sort(() => Math.random() - 0.5);

    for (let i = 0; i < numReplacements; i++) {
        const index = shuffledIndices[i];
        const char = chars[index];
        const replacementChars = replacements[char] || char;
        const randomIndex: number = Math.floor(
            Math.random() * replacementChars.length
        );
        chars[index] = replacementChars[randomIndex];
    }

    return chars.join('');
}

export function Title() {
    const [title, setTitle] = useState(originalTitle);
    const [space, setSpace] = useState(originalSpace);
    const [subTitle, setSubTitle] = useState(originalSubTitle);

    useEffect(() => {
        let titleTimeout: NodeJS.Timeout = updateText(
            originalTitle,
            [0, 0, 0, 1, 1, 2, 2, 2, 3],
            setTitle,
            [2, 3, 4, 4, 5, 5, 5, 6, 6]
        );
        let spaceTimeout: NodeJS.Timeout = updateText(
            originalSpace,
            [0, 1, 1],
            setSpace
        );
        let subTitleTimeout: NodeJS.Timeout = updateText(
            originalSubTitle,
            [0, 0, 0, 1, 1, 2, 2],
            setSubTitle,
            [1, 1, 2, 2, 3, 3]
        );

        function updateText(
            originalText: string,
            replacePattern: number[],
            setter: Dispatch<SetStateAction<string>>,
            flashPattern?: number[]
        ) {
            setter(replaceCharacters(originalText, replacePattern));

            if (flashPattern && shouldFlash()) {
                const delay = getDelay();
                const replacedText = replaceCharacters(
                    originalText,
                    flashPattern
                );

                flashText(originalText, replacedText, setter, delay);

                return setTimeout(
                    updateText,
                    delay + 30 * 4,
                    originalText,
                    replacePattern,
                    setter,
                    flashPattern
                );
            } else {
                return setTimeout(
                    updateText,
                    getDelay(),
                    originalText,
                    replacePattern,
                    setter,
                    flashPattern
                );
            }
        }

        function getDelay() {
            return Math.floor(Math.random() * 1600) + 400;
        }

        function shouldFlash() {
            return Math.random() < 0.1;
        }

        function flashText(
            originalText: string,
            replacedText: string,
            setter: Dispatch<SetStateAction<string>>,
            delay: number,
            iterations = 4
        ) {
            for (let i = 0; i < iterations; i++) {
                setTimeout(
                    () => setter(i % 2 === 0 ? originalText : replacedText),
                    delay + i * 30
                );
            }
        }

        return () => {
            clearTimeout(titleTimeout);
            clearTimeout(spaceTimeout);
            clearTimeout(subTitleTimeout);
        };
    }, []);

    return (
        <div className={styles.title}>
            <h1>
                <span>{title}</span>
                <span className={styles.spacer}>{space}</span>
                <br className={styles.break} />
                <span>{subTitle}</span>
                {/* <span className={styles.version}>v36</span> */}
            </h1>
        </div>
    );
}
