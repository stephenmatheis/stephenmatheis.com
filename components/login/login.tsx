'use client';

import { usePathname } from 'next/navigation';

export function Login({ name }) {
    const pathname = usePathname();

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
