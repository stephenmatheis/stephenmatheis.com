import styles from './squares.module.scss';

export function Squares() {
    return (
        <div className={styles.squares}>
            {Array.from({ length: 15 }, (_, i) => (
                <div key={i} className={styles.square}>
                    <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M32.5 0.5V32.5H0.5V0.5H32.5Z" stroke="currentColor" />
                    </svg>
                </div>
            ))}
        </div>
    );
}
