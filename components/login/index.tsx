'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export function Login() {
    const searchParams = useSearchParams();
    const code = searchParams.get('code');

    useEffect(() => {
        async function getToken(code: string) {
            const url = 'api/token';

            const res = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    code,
                }),
                headers: {
                    Accept: '*/*',
                },
            });

            const data = await res.json();

            console.log('Token:', data);

            if (data.access_token) {
                localStorage.setItem('gh-auth', JSON.stringify(data));
            }
        }

        async function refreshToken(refresh_token: string) {
            const url = 'api/token/refresh';

            const res = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    refresh_token,
                }),
                headers: {
                    Accept: '*/*',
                },
            });

            const data = await res.json();

            console.log('Refresh token:', data);

            if (data.access_token) {
                localStorage.setItem('gh-auth', JSON.stringify(data));
            }
        }

        try {
            if (!code) {
                console.log('No GH login code.');
                return;
            }

            // 1. First, check if `gh-auth` already exists in local storage
            const gh_auth = localStorage.getItem('gh-auth') || '';

            if (!gh_auth) {
                getToken(code || '');

                return;
            }

            const { access_token, refresh_token } = JSON.parse(gh_auth);

            // 2. See if `access_token` works

            return;

            refreshToken(refresh_token);
            return;
        } catch (error) {
            console.log(error);
        }
    }, [code]);

    return <></>;
}
