import { useEffect } from 'react';

export function useAuth(code: string, pathname: string) {
    useEffect(() => {
        async function getToken(code: string): Promise<void> {
            await fetch('api/octokit/auth', {
                method: 'POST',
                body: JSON.stringify({
                    code,
                }),
            });

            window.location.replace(pathname);
        }

        try {
            getToken(code || '');
        } catch (error) {
            console.log(error);
        }
    }, [code, pathname]);
}
