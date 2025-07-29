import { Corners } from '@/components/corners';
import styles from './page.module.scss';

export function Page({ children }) {
    return (
        <div className={styles.page}>
            {children}
        </div>
    );
}
