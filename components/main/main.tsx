import { ReactNode } from 'react';
import { Console } from '@/components/console';
import { PromptsProvider } from '@/contexts/prompts';
import styles from './main.module.scss';

type Props = {
    children?: ReactNode;
};

export function Main({ children }: Props) {
    return (
        <main className={styles.main}>
            <PromptsProvider
                prompts={[
                    { label: 'Posts', path: '/posts', type: 'console' },
                    { label: 'Archive', path: '/archive', type: 'console' },
                    { label: 'About', path: '/about', type: 'console' },
                    {
                        label: 'Resume',
                        path: '/resume.pdf',
                        type: 'console',
                        newTab: true,
                    },
                    { label: 'Settings', path: '/settings', type: 'console' },
                ]}
            >
                <Console />
                {children}
            </PromptsProvider>
        </main>
    );
}
