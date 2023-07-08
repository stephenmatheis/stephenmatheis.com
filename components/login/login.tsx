'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function Login({ name }) {
    const pathname = usePathname();

    useEffect(() => {
        // Check if token is still good
        async function check() {
            const res = await fetch('/api/octokit/user', {
                method: 'POST',
            });
            const data = await res.json();

            console.log('Check:', data);

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
                <div
                    style={{
                        position: 'fixed',
                        top: 10,
                        right: 10,
                        textAlign: 'right',
                    }}
                >
                    <div
                        style={{
                            color: 'var(--color)',
                            backgroundColor: 'var(--primary-30)',
                            padding: '6px 24px',
                            borderRadius: '6px',
                            marginBottom: 5,
                        }}
                    >
                        {name}
                    </div>
                    <button
                        style={{
                            color: 'var(--primary)',
                            backgroundColor: 'var(--primary-30)',
                            padding: '6px 24px',
                            borderRadius: '6px',
                            border: 'none',
                            cursor: 'pointer',
                        }}
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
