'use client';

import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

type grow = 'link' | 'item' | 'button' | 'tab' | 'moving' | 'normal';

type CursorContext = {
    left: number;
    setLeft: Dispatch<SetStateAction<number>>;
    width: number;
    setWidth: Dispatch<SetStateAction<number>>;
    grow: grow;
    setGrow: Dispatch<SetStateAction<grow>>;
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
    const [left, setLeft] = useState<number>(0);
    const [grow, setGrow] = useState<grow>('normal');

    return (
        <CursorContext.Provider
            value={{
                width,
                left,
                setLeft,
                setWidth,
                grow,
                setGrow,
            }}
        >
            {children}
        </CursorContext.Provider>
    );
}
