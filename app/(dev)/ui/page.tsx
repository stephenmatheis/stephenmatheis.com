import styles from './page.module.scss';

export default function ResumePage() {
    return (
        <>
            <div className={styles.background} />

            <div style={{ top: 17, left: 17 }} className={`${styles.frame} ${styles.gap1}`}>
                {/* Two */}
                <div className={styles.block}>
                    <div className={styles.line}>
                        <div className={styles.pixel} />
                        <div className={styles.pixel} />
                        <div className={styles.pixel} />
                        <div className={styles.pixel} />
                    </div>
                    <div className={`${styles.line} ${styles.end}`}>
                        <div className={styles.pixel} />
                    </div>
                    <div className={styles.line}>
                        <div className={styles.pixel} />
                        <div className={styles.pixel} />
                        <div className={styles.pixel} />
                        <div className={styles.pixel} />
                    </div>
                    <div className={`${styles.line} ${styles.start}`}>
                        <div className={styles.pixel} />
                    </div>
                    <div className={`${styles.line} ${styles.start}`}>
                        <div className={styles.pixel} />
                    </div>
                    <div className={styles.line}>
                        <div className={styles.pixel} />
                        <div className={styles.pixel} />
                        <div className={styles.pixel} />
                        <div className={styles.pixel} />
                    </div>
                </div>

                {/* Zero */}
                <div className={styles.block}>
                    <div className={styles.line}>
                        <div className={styles.pixel} />
                        <div className={styles.pixel} />
                        <div className={styles.pixel} />
                        <div className={styles.pixel} />
                    </div>
                    <div className={`${styles.line} ${styles.split}`}>
                        <div className={styles.pixel} />
                        <div className={styles.pixel} />
                    </div>
                    <div className={`${styles.line} ${styles.split}`}>
                        <div className={styles.pixel} />
                        <div className={styles.pixel} />
                    </div>
                    <div className={`${styles.line} ${styles.split}`}>
                        <div className={styles.pixel} />
                        <div className={styles.pixel} />
                    </div>
                    <div className={`${styles.line} ${styles.split}`}>
                        <div className={styles.pixel} />
                        <div className={styles.pixel} />
                    </div>
                    <div className={styles.line}>
                        <div className={styles.pixel} />
                        <div className={styles.pixel} />
                        <div className={styles.pixel} />
                        <div className={styles.pixel} />
                    </div>
                </div>

                {/* Three */}
                <div className={styles.block}>
                    <div className={styles.line}>
                        <div className={styles.pixel} />
                        <div className={styles.pixel} />
                        <div className={styles.pixel} />
                        <div className={styles.pixel} />
                    </div>
                    <div className={`${styles.line} ${styles.end}`}>
                        <div className={styles.pixel} />
                    </div>
                    <div className={styles.line}>
                        <div className={styles.pixel} />
                        <div className={styles.pixel} />
                        <div className={styles.pixel} />
                        <div className={styles.pixel} />
                    </div>
                    <div className={`${styles.line} ${styles.end}`}>
                        <div className={styles.pixel} />
                    </div>
                    <div className={`${styles.line} ${styles.end}`}>
                        <div className={styles.pixel} />
                    </div>
                    <div className={styles.line}>
                        <div className={styles.pixel} />
                        <div className={styles.pixel} />
                        <div className={styles.pixel} />
                        <div className={styles.pixel} />
                    </div>
                </div>

                {/* Five */}
                <div className={styles.block}>
                    <div className={styles.line}>
                        <div className={styles.pixel} />
                        <div className={styles.pixel} />
                        <div className={styles.pixel} />
                        <div className={styles.pixel} />
                    </div>
                    <div className={`${styles.line} ${styles.start}`}>
                        <div className={styles.pixel} />
                    </div>
                    <div className={styles.line}>
                        <div className={styles.pixel} />
                        <div className={styles.pixel} />
                        <div className={styles.pixel} />
                        <div className={styles.pixel} />
                    </div>
                    <div className={`${styles.line} ${styles.end}`}>
                        <div className={styles.pixel} />
                    </div>
                    <div className={`${styles.line} ${styles.end}`}>
                        <div className={styles.pixel} />
                    </div>
                    <div className={styles.line}>
                        <div className={styles.pixel} />
                        <div className={styles.pixel} />
                        <div className={styles.pixel} />
                        <div className={styles.pixel} />
                    </div>
                </div>
            </div>
        </>
    );
}
