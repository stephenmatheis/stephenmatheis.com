import departureMonoCodepoints from '../codepoints/DepartureMono-Regular.json';
import styles from './page.module.scss';

export default function Home() {
    return (
        <div className={styles.page} style={{ opacity: 0 }}>
            <div>Departure Mono</div>
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
