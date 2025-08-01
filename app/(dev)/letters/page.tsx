import styles from './page.module.scss';

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

export default function ResumePage() {
    return (
        <div className={styles.app}>
            <div className={styles.grid}>
                {Array.from({ length: 40 * 20 }, (_, i) => (
                    <span key={i} className={styles.letter} data-cell={i}>
                        A
                    </span>
                ))}
            </div>
        </div>
    );
}
