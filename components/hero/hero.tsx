// import Image from 'next/image';
// import me from 'public/me.png';
// import styles from './hero.module.scss';

// export function Hero() {
//     return (
//         <div className={styles.hero}>
//             <div className={styles['img-ctr']}>
//                 {/* <Image
//                     src={me}
//                     alt="Me"
//                     width={210}
//                     style={{ borderRadius: '50%' }}
//                     priority
//                 /> */}
//             </div>
//         </div>
//     );
// }

import Link from 'next/link';
import styles from './hero.module.scss';
import classNames from 'classnames';

const letters = [
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
];
const shapes = ['■', '◼', '▪', '▫', '●', '◦', '▴', '▵', '◆', '◇', '◇'];
const four = ['□', '◯', '△', '◇'];
const basic = ['⏹', '□', '●', '◯', '▲', '△', '◆', '◇', '+', '✕', '*', '=', '-'];
const binary = [0, 1];
const links = ['Stephen Matheis', 'Blog', 'About', 'Posts'];
const columns = 20;
const rows = 20;
const min = 0;
const max = 25;
const shape = '◦';
// const shape = '0';

export function Hero() {
    const cells = Array.from(
        { length: columns * rows },
        // () => setChar(four)
        // () => setChar(letters)
        // () => setChar(basic)
        // () => setChar(shapes),
        // () => setChar(binary)
        // () => shape
        // () => '■',
        // () => '◼',
        // () => '▪',
        // () => '▫',
        // () => '●'
        () => '◦'
        // () => '▴',
        // () => '▵',
        // () => '◆',
        // () => '◇',
        // () => '◇',
    );

    return (
        <div className={styles.words}>
            {cells.map((letter, index) => {
                // Rows 1, 3, and 5
                for (let i = 1; i < links.length; i++) {
                    let row = i * 2 - 1;

                    if (
                        isRow({
                            columns,
                            row,
                            index,
                            word: links[i],
                            align: 'right',
                        })
                    ) {
                        return (
                            <Letter
                                key={index}
                                columns={columns}
                                row={row}
                                index={index}
                                word={links[i]}
                                align="right"
                            />
                        );
                    }
                }

                // Last row
                if (
                    isRow({
                        columns,
                        row: rows - 1,
                        index,
                        word: links[0],
                        align: 'left',
                    })
                ) {
                    return (
                        <Letter
                            key={index}
                            columns={columns}
                            row={rows - 1}
                            index={index}
                            word={links[0]}
                            href="/"
                            align={undefined}
                        />
                    );
                }

                // Normal Cell
                return (
                    <div key={index} className={classNames(styles['cell'])}>
                        {letter}
                    </div>
                );
            })}
        </div>
    );
}

function Letter({ columns, row, index, word, align, href = '' }) {
    let char =
        align === 'right'
            ? word[
                  index -
                      (columns * (row - 1) + (columns - 1)) +
                      (word.length - 1)
              ].toUpperCase()
            : word[index - columns * row].toUpperCase();

    if (char === ' ') {
        return (
            <div key={index} className={classNames(styles['cell'])}>
                {/* {shape} */}A
            </div>
        );
    }

    return (
        <Link
            key={index}
            className={classNames(styles['cell'], styles['link'])}
            href={href || `/${word.toLowerCase()}`}
        >
            {char}
        </Link>
    );
}

function isRow({ columns, row, index, word, align }) {
    if (align === 'right') {
        if (
            index > columns * (row - 1) + (columns - 1) - word.length &&
            index <= columns * (row - 1) + (columns - 1)
        ) {
            return true;
        } else {
            return false;
        }
    }

    if (align === 'left') {
        if (index >= columns * row && index < columns * row + word.length) {
            return true;
        } else {
            return false;
        }
    }

    return false;
}

function setChar(set: string | any[]) {
    return set[getRandomIntInclusive(0, set.length - 1)];
}

function getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}
