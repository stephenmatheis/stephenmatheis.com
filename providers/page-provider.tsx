'use client';

import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

type PageContext = {
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
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

    return (
        <PageContext.Provider
            value={{
                page,
                setPage,
            }}
        >
            {children}
        </PageContext.Provider>
    );
}
