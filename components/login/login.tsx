'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import styles from './login.module.scss';

export function Login({ name }) {
    const pathname = usePathname();

    useEffect(() => {
        // Check if token is still good
        async function check() {
            const res = await fetch('/api/octokit/user', {
                method: 'POST',
            });
            const data = await res.json();

            if (data.error) {
                await fetch('api/octokit/logout', {
                    method: 'POST',
                });

                // TODO: Instead of just refreshing, show a message with a close button?
                window.location.replace(pathname);
            }
        }

        try {
            check();
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <>
            {name && (
                <div className={styles['login-toolbar']}>
                    <div className={styles.name}>{name}</div>
                    <button
                        className={styles.logout}
                        onClick={async () => {
                            await fetch('api/octokit/logout', {
                                method: 'POST',
                            });

                            window.location.replace(pathname);
                        }}
                    >
                        Logout
                    </button>
                </div>
            )}
        </>
    );
}
