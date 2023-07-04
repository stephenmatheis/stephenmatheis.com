import styles from './fallback.module.scss';

export function Fallback() {
    return (
        <div className={styles['loader-wrapper']}>
            <div className={styles.dots}>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
            </div>
        </div>
    );
}
