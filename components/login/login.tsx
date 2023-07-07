'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export function Login() {
    const searchParams = useSearchParams();
    const code = searchParams.get('code');

    useEffect(() => {
        
    }, [code]);

    return <></>;
}
