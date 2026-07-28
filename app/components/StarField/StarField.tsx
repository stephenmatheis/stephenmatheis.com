import styles from './StarField.module.scss';

// Three dot-grid layers at different spacing/opacity, each parallaxed by
// a different amount off the same --mx/--my the page already sets on
// pointer move — nothing here listens for the mouse itself, it just
// reads the custom property inherited down from whatever ancestor is
// tracking it.
export function StarField() {
    return (
        <div className={styles.field}>
            <div className={styles.layer} data-depth="1" />
            <div className={styles.layer} data-depth="2" />
            <div className={styles.layer} data-depth="3" />
        </div>
    );
}
