import styles from './name.module.scss';

export function Name() {
    return (
        <h1 className={styles.name}>
            Stephen Matheis
            <br />
            <span>Software Engineer</span>
        </h1>
    );
}
