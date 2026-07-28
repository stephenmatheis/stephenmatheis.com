import { colorVars, ColorProps } from '../colors';
import styles from './Ticker.module.scss';

type TickerProps = ColorProps & {
    items: string[];
    className?: string;
};

// Content is duplicated once so a -50% translateX loops seamlessly —
// the animation never has to jump or reset mid-scroll.
export function Ticker({ items, className, background, foreground, accent }: TickerProps) {
    const loop = [...items, ...items];

    return (
        <div
            className={`${styles.ticker} ${className ?? ''}`}
            style={colorVars({ background, foreground, accent })}
        >
            <div className={styles.track}>
                {loop.map((item, i) => (
                    <span key={i} className={styles.item}>
                        {item}
                        <span className={styles.sep}>·</span>
                    </span>
                ))}
            </div>
        </div>
    );
}
