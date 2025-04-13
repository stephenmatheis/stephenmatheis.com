import styles from './page.module.scss';

export default function ResumePage() {
    return (
        <div className={styles.page}>
            <div className={styles.cart}>
                <div
                    className={styles.shape}
                    style={{
                        top: '-25px',
                        left: '-10px',
                    }}
                />
                <div className={styles.shape} />
                <div className={styles.content}>
                    <span>Cartridge</span>
                    <span>Cartridge</span>
                </div>
            </div>
        </div>
    );
}
