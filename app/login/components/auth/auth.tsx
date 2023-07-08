'use client';

import { useSearchParams, usePathname } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';

export function Auth() {
    const searchParams = useSearchParams();
    const code = searchParams.get('code');
    const pathname = usePathname();

    if (code) {
        useAuth(code, pathname);
    }

    return <></>;
}
