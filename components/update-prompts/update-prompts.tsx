'use client';

import { useEffect } from 'react';
import { usePrompts } from '@/contexts/prompts';

export function UpdatePrompts({ prompts }) {
    const { setPrompts } = usePrompts();

    useEffect(() => {
        setPrompts((prev) => {
            return [...new Set([...prev, ...prompts])];
        });
    }, [prompts, setPrompts]);

    return <></>;
}
