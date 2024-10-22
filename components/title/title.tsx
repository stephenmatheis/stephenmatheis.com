'use client';

import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import styles from './title.module.scss';

// Define alternate characters for certain letters
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
const originalTitle = 'DEPARTURE';
const originalSpace = ' ';
const originalSubTitle = 'MONO';

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
        let titleTimeout: NodeJS.Timeout;
        let spaceTimeout: NodeJS.Timeout;
        let subTitleTimeout: NodeJS.Timeout;

        updateTitle();
        updateSpace();
        updateSubTitle();

        function updateTitle() {
            setTitle(
                replaceCharacters(originalTitle, [0, 0, 0, 1, 1, 2, 2, 2, 3])
            );

            if (shouldFlash()) {
                const delay = getDelay();
                const replacedTitle = replaceCharacters(
                    originalTitle,
                    [2, 3, 4, 4, 5, 5, 5, 6, 6]
                );

                flashText(originalTitle, replacedTitle, setTitle, delay);

                titleTimeout = setTimeout(updateTitle, delay + 30 * 4);
            } else {
                titleTimeout = setTimeout(updateTitle, getDelay());
            }
        }

        function updateSpace() {
            setSpace(replaceCharacters(originalSpace, [0, 1, 1]));

            spaceTimeout = setTimeout(updateSpace, getDelay());
        }

        function updateSubTitle() {
            setSubTitle(
                replaceCharacters(originalSubTitle, [0, 0, 0, 1, 1, 2, 2])
            );

            if (shouldFlash()) {
                const delay = getDelay();
                const replacedTitle = replaceCharacters(
                    originalTitle,
                    [1, 1, 2, 2, 3, 3]
                );

                flashText(originalTitle, replacedTitle, setSubTitle, delay);

                subTitleTimeout = setTimeout(updateSubTitle, delay + 30 * 4);
            } else {
                subTitleTimeout = setTimeout(updateSubTitle, getDelay());
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
                <span className={styles.version}>v36</span>
            </h1>
        </div>
    );
}
