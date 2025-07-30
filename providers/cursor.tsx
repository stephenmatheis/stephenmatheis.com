'use client';

import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

type CursorContext = {
    width: number;
    setWidth: Dispatch<SetStateAction<number>>;
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
    const [width, setWidth] = useState<number>(48);
    const [grow, setGrow] = useState<boolean>(false);

    return (
        <CursorContext.Provider
            value={{
                width,
                setWidth,
                grow,
                setGrow,
            }}
        >
            {children}
        </CursorContext.Provider>
    );
}
