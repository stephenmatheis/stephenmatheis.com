'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styles from './Commands.module.scss';

export function Commands() {
    const router = useRouter();

    useEffect(() => {
        function handleKeydown(event: KeyboardEvent) {
            if (event.shiftKey || event.metaKey || event.ctrlKey || event.altKey) return;

            if (event.key === 'q') {
                router.back();

                return;
            }
        }

        window.addEventListener('keydown', handleKeydown);

        return () => {
            window.removeEventListener('keydown', handleKeydown);
        };
    }, []);

    return <div className={styles.commands}>Commands</div>;
}
