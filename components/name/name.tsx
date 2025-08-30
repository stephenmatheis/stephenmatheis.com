import styles from './name.module.scss';

export function Name() {
    return (
        <header className={styles.name}>
            <h1>
                Stephen Matheis <span>Software Engineer</span>
            </h1>
        </header>
    );
}
