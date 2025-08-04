'use client';

import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

type Position = {
    top: number;
    left: number;
    height: number;
    width: number;
    type: 'link' | 'path' | 'item' | 'button' | 'markup' | 'tab' | 'moving' | 'normal';
};

type CursorContext = {
    position: Position;
    setPosition: Dispatch<SetStateAction<Position>>;
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
    const [position, setPosition] = useState<Position>({
        top: 0,
        left: 0,
        height: 16,
        width: 48,
        type: 'normal',
    });

    return (
        <CursorContext.Provider
            value={{
                position,
                setPosition,
            }}
        >
            {children}
        </CursorContext.Provider>
    );
}
