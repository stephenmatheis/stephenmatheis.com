'use client';

import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

type Direction = 'back' | 'forward' | null;

type PageContext = {
    direction: Direction;
    setDirection: Dispatch<SetStateAction<Direction>>;
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
    canUpdate: boolean;
    setCanUpdate: Dispatch<SetStateAction<boolean>>;
};

const PageContext = createContext<PageContext | undefined>(undefined);

export function usePage() {
    const context = useContext(PageContext);

    if (!context) {
        throw new Error('usePage must be used within a PageProvider');
    }

    return context;
}

export function PageProvider({ children }: { children: ReactNode }) {
    const [page, setPage] = useState<number>(1);
    const [canUpdate, setCanUpdate] = useState<boolean>(false);
    const [direction, setDirection] = useState<Direction>(null);

    return (
        <PageContext.Provider
            value={{
                direction,
                setDirection,
                page,
                setPage,
                canUpdate,
                setCanUpdate,
            }}
        >
            {children}
        </PageContext.Provider>
    );
}
