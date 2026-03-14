import styles from './name.module.scss';

export function Name() {
    return (
        <div className={styles.name}>
            <h1>
                Stephen Matheis <span className={styles.lighter}>Software Engineer</span>
            </h1>
            <div className={styles.light}>Washington, D.C.</div>
            <div className={styles.light}>TS/SCI</div>
        </div>
    );
}
