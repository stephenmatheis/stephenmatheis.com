import styles from './page.module.scss';

export default function RootPage() {
    return (
        <div className={styles.root}>
            <div className={styles.primary}>
                <div>┌────────────┐</div>
                <div>│ NEXTdotgov │</div>
            </div>
            <div className={styles.color}>Pink Draft</div>
            <div className={styles.muted}>Line Writer</div>
            <div className={styles.light}>Tools</div>
            <div className={styles.lighter}>Links</div>
        </div>
    );
}
2;
