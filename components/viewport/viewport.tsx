import styles from './viewport.module.scss';

type ViewportProps = {
    children: React.ReactNode;
};

export function Viewport({ children }: ViewportProps) {
    return <div className={styles.viewport}>{children}</div>;
}
