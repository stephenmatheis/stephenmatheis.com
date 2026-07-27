'use client';

import { useEffect, useState } from 'react';

// Persists a piece of state to localStorage under `key`. SSR-safe: the
// first render always uses `initial` (localStorage doesn't exist on the
// server), then syncs from storage once mounted — a one-time flash from
// default to stored value is the tradeoff for not needing a cookie-based
// sync just for a dev sandbox.
export function useStoredState<T>(key: string, initial: T) {
    const [value, setValue] = useState<T>(initial);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        try {
            const stored = window.localStorage.getItem(key);
            if (stored !== null) setValue(JSON.parse(stored));
        } catch {
            // Malformed or inaccessible storage — fall back to initial.
        }

        setHydrated(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!hydrated) return;

        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch {
            // Storage full or disabled — nothing to do about it here.
        }
    }, [key, value, hydrated]);

    return [value, setValue] as const;
}
