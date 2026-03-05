'use client';

import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

export type Mode = 'NORMAL' | 'INSERT';

type ModeContext = {
    mode: Mode;
    setMode: Dispatch<SetStateAction<Mode>>;
};

const ModeContext = createContext<ModeContext | undefined>(undefined);

export function useMode() {
    const context = useContext(ModeContext);

    if (!context) {
        throw new Error('useMode must be used within a ModeProvider');
    }

    return context;
}

export function ModeProvider({ children }: { children: ReactNode }) {
    const [mode, setMode] = useState<Mode>('NORMAL');

    return (
        <ModeContext.Provider
            value={{
                mode,
                setMode,
            }}
        >
            {children}
        </ModeContext.Provider>
    );
}
