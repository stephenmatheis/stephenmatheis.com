import styles from './name.module.scss';

export function Name() {
    return (
        <div className={styles.name}>
            <h1>Stephen Matheis</h1>
            <div className={styles.light}>Software Engineer</div>
            <div className={styles.lighter}>Washington, D.C.</div>
            <div className={styles.lightest}>TS/SCI</div>
        </div>
    );
}
