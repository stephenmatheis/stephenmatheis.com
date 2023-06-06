import styles from './main.module.scss';

type Props = { children: React.ReactNode };

export function Main({ children }: Props) {
    return <main className={styles.main}>{children}</main>;
}
