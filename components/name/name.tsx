import styles from './name.module.scss';

export function Name() {
    return (
        <div className={styles.name}>
            <h1>
                Stephen Matheis <span>Software Engineer</span>
            </h1>
        </div>
    );
}
