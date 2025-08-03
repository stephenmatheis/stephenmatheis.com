import { Page } from '@/components/page';
import styles from './viewport.module.scss';

export function Viewport({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.viewport}>
            <Page>{children}</Page>
        </div>
    );
}
