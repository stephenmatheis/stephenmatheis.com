'use client';

import { Fragment, useState } from 'react';
import classNames from 'classnames';
import styles from './demo.module.scss';

const groups = [
    {
        name: 'BASIC LATIN',
        items: [
            'A',
            'B',
            'C',
            'D',
            'E',
            'F',
            'G',
            'H',
            'I',
            'J',
            'K',
            'L',
            'M',
            'N',
            'O',
            'P',
            'Q',
            'R',
            'S',
            'T',
            'U',
            'V',
            'W',
            'X',
            'Y',
            'Z',
            'a',
            'b',
            'c',
            'd',
            'e',
            'f',
            'g',
            'h',
            'i',
            'j',
            'k',
            'l',
            'm',
            'n',
            'o',
            'p',
            'q',
            'r',
            's',
            't',
            'u',
            'v',
            'w',
            'x',
            'y',
            'z',
        ],
    },
    {
        name: 'PUNCTUATION',
        items: [
            '@',
            '&',
            '.',
            ',',
            ':',
            ';',
            '…',
            '!',
            '¡',
            '?',
            '¿',
            '·',
            '•',
            '*',
            '⁊',
            '‧',
            '#',
            '/',
            '\\',
            '-',
            '–',
            '—',
            '⸗',
            '_',
            '(',
            ')',
            '{',
            '}',
            '[',
            ']',
            '‚',
            '„',
            '“',
            '”',
            '‘',
            '’',
            '«',
            '»',
            '‹',
            '›',
            '"',
            "'",
            '⟨',
            '⟩',
            'ª',
            'º',
            'ǂ',
            'ǀ',
            'ǁ',
            'ǃ',
            '¶',
            '§',
            '©',
            '®',
            '™',
            '°',
            '′',
            '″',
            '|',
            '¦',
            '†',
            '‡',
            '⌥',
            '⌘',
            '№',
        ],
    },
    {
        name: 'NUMERALS, MATH, CURRENCY',
        items: [
            '0',
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '⁰',
            '¹',
            '²',
            '³',
            '⁴',
            '⁵',
            '⁶',
            '⁷',
            '⁸',
            '⁹',
            '₀',
            '₁',
            '₂',
            '₃',
            '₄',
            '₅',
            '₆',
            '₇',
            '₈',
            '₉',
            'ƒ',
            '฿',
            '₿',
            '¢',
            '¤',
            '$',
            '€',
            '₣',
            '₴',
            '₺',
            '₽',
            '₹',
            '₪',
            '£',
            '₸',
            '₮',
            '₩',
            '¥',
            '+',
            '−',
            '×',
            '÷',
            '=',
            '≠',
            '>',
            '<',
            '≥',
            '≤',
            '±',
            '≈',
            '~',
            '¬',
            '^',
            '∞',
            '∫',
            'Ω',
            '∆',
            '∏',
            '∑',
            '√',
            '∂',
            'µ',
            '%',
            '‰',
            '⁒',
            '∙',
            '⁄',
            '½',
            '¼',
            '¾',
            '⅛',
            '⅜',
            '⅝',
            '⅞',
            '↉',
            '⅓',
            '⅔',
            '⅕',
            '⅖',
            '⅗',
            '⅘',
            '⅙',
            '⅚',
            '⅐',
            '⅑',
            'ℓ',
            '℮',
        ],
    },
    {
        name: 'GRAPHICAL',
        items: [
            '↑',
            '↗',
            '→',
            '↘',
            '↓',
            '↙',
            '←',
            '↖',
            '↕',
            '↰',
            '↱',
            '↲',
            '↳',
            '↴',
            '↵',
            '▲',
            '▼',
            '►',
            '◄',
            '△',
            '▽',
            '▷',
            '◁',
            '◊',
            '♩',
            '♪',
            '♫',
            '♬',
            '♠',
            '♣',
            '♥',
            '♦',
            '▄',
            '█',
            '▀',
            '░',
            '▒',
            '▓',
            '┬',
            '┐',
            '┌',
            '─',
            '┴',
            '┘',
            '└',
            '│',
            '┼',
            '┤',
            '├',
            '╦',
            '╗',
            '╔',
            '═',
            '╩',
            '╝',
            '╚',
            '║',
            '╬',
            '╣',
            '╠',
        ],
    },
];

export function Demo() {
    const [selected, setSelected] = useState<string>('Q');

    return (
        <div className={classNames(styles.demo, 'maxwidth')}>
            <div className={styles.split}>
                <div className={styles.glyph}>
                    <span className={styles.big}>{selected}</span>
                </div>
                <div className={styles.list}>
                    {groups.map(({ name, items }) => {
                        return (
                            <Fragment key={name}>
                                <div className={styles.heading}>{name}</div>
                                {items.map((item) => {
                                    return (
                                        <div
                                            key={item}
                                            className={styles.item}
                                            tabIndex={0}
                                            title={item}
                                            data-selected={
                                                item === selected
                                                    ? 'true'
                                                    : 'false'
                                            }
                                            onClick={() => setSelected(item)}
                                        >
                                            <span className={styles.content}>
                                                {item}
                                            </span>
                                        </div>
                                    );
                                })}
                            </Fragment>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
