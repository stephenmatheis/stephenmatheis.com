import { ReactNode } from 'react';
import styles from './page.module.scss';

export function Page({ children }: { children: ReactNode }) {
    return <div className={styles.page}>{children}</div>;
}
