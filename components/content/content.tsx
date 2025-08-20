import styles from './content.module.scss';

export function Content({ children }: { children: React.ReactNode }) {
    return <main className={styles.content}>{children}</main>;
}
