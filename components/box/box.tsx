import styles from './box.module.scss';

export function Box({ children, ...props }) {
    return (
        <>
            <div className={styles.box} {...props}>
                {/* Top */}
                <div className={styles.top}>
                    <div className={styles.circle} />
                </div>

                {/* Children */}
                {children}

                {/* Bottom */}
                <div className={styles.bottom}>
                    <div className={styles.circle} />
                </div>
            </div>
        </>
    );
}
