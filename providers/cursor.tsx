'use client';

import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

type CursorContext = {
    grow: boolean;
    setGrow: Dispatch<SetStateAction<boolean>>;
};

const CursorContext = createContext<CursorContext | undefined>(undefined);

export function useCursor() {
    const context = useContext(CursorContext);

    if (!context) {
        throw new Error('useCursor must be used within a CursorProvider');
    }

    return context;
}

export function CursorProvider({ children }: { children: ReactNode }) {
    const [grow, setGrow] = useState<boolean>(false);

    return (
        <CursorContext.Provider
            value={{
                grow,
                setGrow,
            }}
        >
            {children}
        </CursorContext.Provider>
    );
}
