'use client';

import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

type Position = {
    top: number;
    left: number;
    height: number;
    width: number;
    type: 'link' | 'path' | 'button' | 'line' | 'markup' | 'tab' | 'moving' | 'normal';
};

type CursorContext = {
    position: Position;
    setPosition: Dispatch<SetStateAction<Position>>;
    resetPosition: () => void;
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
        height: 0,
        width: 0,
        type: 'normal',
    });

    function resetPosition() {
        setPosition((prev) => ({
            ...prev,
            // height: 0,
            // width: 0,
            type: 'normal',
        }));
    }

    return (
        <CursorContext.Provider
            value={{
                position,
                setPosition,
                resetPosition,
            }}
        >
            {children}
        </CursorContext.Provider>
    );
}
