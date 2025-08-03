import styles from './sheet.module.scss';

export function Sheet({ children }: { children: React.ReactNode }) {
    return <div className={styles.sheet}>{children}</div>;
}
