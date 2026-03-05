import styles from './ControlsGuide.module.scss';

export function ControlsGuide() {
    return (
        <div className={styles.guide}>
            <div className={styles.group}>
                <div className={styles.cmds}>
                    <div className={styles.cmd}>h</div>
                    <div className={styles.cmd}>j</div>
                    <div className={styles.cmd}>k</div>
                    <div className={styles.cmd}>l</div>
                </div>
                <div className={styles.name}>navigate</div>
            </div>
            <div className={styles.group}>
                <div className={styles.cmds}>
                    <div className={styles.cmd}>i</div>
                    <div className={styles.cmd}>esc</div>
                </div>
                <div className={styles.name}>mode</div>
            </div>
            <div className={styles.group}>
                <div className={styles.cmds}>
                    <div className={styles.cmd}>q</div>
                    <div className={styles.cmd}>return</div>
                </div>
                <div className={styles.name}>select</div>
            </div>
            <div className={styles.group}>
                <div className={styles.cmds}>
                    <div className={styles.cmd}>w</div>
                </div>
                <div className={styles.name}>hide</div>
            </div>
        </div>
    );
}
