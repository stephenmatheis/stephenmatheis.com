import styles from './tmux.module.scss';

export default function Tmux() {
    return (
        <>
            <div className={styles.tmux}>
                <div className={`${styles.split} ${styles.left}`}>
                    <div className={`${styles.buffer} ${styles.zero}`}>
                        <div className={styles.text}>→ ~</div>
                        <div className={styles.bar}>
                            <div className={styles.background}>
                                <span>[0] 0:zsh*</span>
                                <span>"Mac.verizon.net" 17:24 07-Aug-25</span>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.buffer} ${styles.one}`}>
                        <div className={styles.text}>→ ~</div>
                        <div className={styles.bar}>
                            <div className={styles.background}>
                                <span>[1] 0:zsh*</span>
                                <span>"Mac.verizon.net" 17:24 07-Aug-25</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.split} ${styles.right}`}>
                    <div className={`${styles.buffer} ${styles.two}`}>
                        <div className={styles.text}>→ ~</div>
                        <div className={styles.bar}>
                            <div className={styles.background}>
                                <span>[2] 0:zsh*</span>
                                <span>"Mac.verizon.net" 17:24 07-Aug-25</span>
                            </div>
                        </div>
                    </div>
                    {/* <div className={`${styles.buffer} ${styles.one}`}>
                        <div className={styles.text}>→ ~</div>
                        <div className={styles.bar}>
                            <div className={styles.background}>
                                <span>[3] 0:zsh*</span>
                                <span>"Mac.verizon.net" 17:24 07-Aug-25</span>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    );
}
