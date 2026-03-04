import styles from './page.module.scss';

export default function AboutPage() {
    return (
        <div className={styles.page}>
            <div className={styles.pane}>
                <div className={styles.list}>
                    <div className={styles.input}>Input</div>
                    <div className={styles.items}>List</div>
                </div>
                <div className={styles.view}>Viewer</div>
            </div>
            <div className={styles.statusbar}>Status bar</div>
        </div>
    );
}
