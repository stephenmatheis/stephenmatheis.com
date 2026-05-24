import { CSSProperties } from 'react';
import styles from './page.module.scss';

const lines = [
    <>Stephen Matheis. Programmer at Apple.</>,
    // <>
    //     <a href="https://github.com/stephenmatheis" target="_blank">
    //         Public work.
    //     </a>
    // </>,
];

export default function Home() {
    return (
        <div className={styles.page}>
            <div className={styles.top}>
                <div>Top</div>
            </div>
            <div className={styles.middle}>
                <div>Middle</div>
            </div>
            <div className={styles.lines}>
                <div className={`${styles.line} ${styles.thick}`} />
                <div className={`${styles.line} ${styles.thin}`} />
                <div className={`${styles.line} ${styles.thin}`} />
                <div className={`${styles.line} ${styles.thin}`} />
                <div className={`${styles.line} ${styles.thick}`} />
            </div>
            <div className={styles.bottom}>
                <div className={styles.logo}>
                    <div className={`${styles.band} ${styles.green}`} />
                    <div className={`${styles.band} ${styles.yellow}`} />
                    <div className={`${styles.band} ${styles.orange}`} />
                    <div className={`${styles.band} ${styles.red}`} />
                    <div className={`${styles.band} ${styles.pink}`} />
                    <div className={`${styles.band} ${styles.blue}`} />
                </div>
                <main className={styles.main}>
                    {lines.map((line, index) => {
                        return (
                            <p key={index} style={{ '--delay': `${(index + 1) * 2}s` } as CSSProperties}>
                                {line}
                            </p>
                        );
                    })}
                </main>
            </div>
        </div>
    );
}
