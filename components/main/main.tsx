import { ReactNode } from 'react';
import Link from 'next/link';
import { Console } from '@/components/console';
import styles from './main.module.scss';

type Props = {
    children?: ReactNode;
};

export function Main({ children }: Props) {
    return (
        <main className={styles.main}>
            <div className={styles.left}>
                <Link className={styles.name} href={'/'}>
                    Stephen Matheis
                </Link>
                <div style={{ color: 'var(--muted)' }}>
                    {'(C)'} {new Date().getFullYear()}
                </div>
                <Console />
            </div>
            <div className={styles.right}>{children}</div>
        </main>
    );
}
