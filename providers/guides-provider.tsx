'use client';

import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

type GuidesContext = {
    isOn: boolean;
    setIsOn: Dispatch<SetStateAction<boolean>>;
};

const GuidesContext = createContext<GuidesContext | undefined>(undefined);

export function useGuides() {
    const context = useContext(GuidesContext);

    if (!context) {
        throw new Error('useGuides must be used within a GuidesProvider');
    }

    return context;
}

export function GuidesProvider({ children }: { children: ReactNode }) {
    const [isOn, setIsOn] = useState<boolean>(true);

    return (
        <GuidesContext.Provider
            value={{
                isOn,
                setIsOn,
            }}
        >
            {children}
        </GuidesContext.Provider>
    );
}
