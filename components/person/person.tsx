import classNames from 'classnames';
import styles from './person.module.css';

export function Person() {
    return (
        <div className={styles.person}>
            <div className={styles.head} />
            <div className={styles.torso} />
            <div className={styles.arms}>
                <div className={classNames(styles.arm, styles.left)} />
                <div className={classNames(styles.arm, styles.right)} />
            </div>
            <div className={styles.legs}>
                <div className={classNames(styles.leg, styles.left)} />
                <div className={classNames(styles.leg, styles.right)} />
            </div>
        </div>
    );
}
