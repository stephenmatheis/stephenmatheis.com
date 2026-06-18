import pureProgCodepoints from './codepoints/pureprog-12-5x8-pixel-mono-normal.json';
import departureMonoCodepoints from './codepoints/DepartureMono-Regular.json';
import styles from './page.module.scss';

export default function Home() {
    return (
        <div className={styles.page}>
            <h2 style={{ fontFamily: 'var(--font-pureprog)', fontSize: '48px' }}>Pure Prog 5x8</h2>
            <div className={styles.text} style={{ fontFamily: 'var(--font-pureprog)', fontSize: '48px' }}>
                {pureProgCodepoints.map((codepoint, i) => {
                    if ([32].includes(codepoint)) {
                        return;
                    }

                    return (
                        <div key={i} className={styles.char}>
                            {String.fromCodePoint(codepoint)}
                        </div>
                    );
                })}
            </div>
            <h2 style={{ fontFamily: 'var(--font-departure-mono)', fontSize: '33px' }}>Departure Mono</h2>
            <div className={styles.text} style={{ fontFamily: 'var(--font-departure-mono)', fontSize: '33px' }}>
                {departureMonoCodepoints.map((codepoint, i) => {
                    return (
                        <div key={i} className={styles.char}>
                            {String.fromCodePoint(codepoint)}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
