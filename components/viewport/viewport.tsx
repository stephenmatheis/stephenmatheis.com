import { Sheet } from '@/components/sheet';
import styles from './viewport.module.scss';

export function Viewport({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.viewport}>
            {/* <div className={styles.background} />
            <div className={styles.foreground} /> */}
            <Sheet>{children}</Sheet>
        </div>
    );
}
