import { ReactNode } from 'react';
import { UpdatePrompts } from '@/components/update-prompts';
import { Indicator } from '@/components/indicator';
import Link from 'next/link';
import styles from './main.module.scss';

type Props = {
    children?: ReactNode;
};

// TODO: Add Header and Footer links to list of page prompts
export function Main({ children }: Props) {
    return (
        <main className={styles.main}>
            <div className={styles.left}>
                <UpdatePrompts
                    prompts={[
                        {
                            label: 'Header',
                            path: '/',
                            type: 'content',
                        },
                    ]}
                />
                <div>
                    <Indicator label={'Header'} />
                    <Link className={styles.name} href={'/'}>
                        Stephen Matheis
                    </Link>
                </div>
                <div style={{ color: 'var(--muted)' }}>
                    {'(C)'} {new Date().getFullYear()}
                </div>
            </div>
            <div className={styles.right}>{children}</div>
        </main>
    );
}
