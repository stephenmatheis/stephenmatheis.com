'use client';

import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

type Overlay = {
    page: boolean;
    left: boolean;
    right: boolean;
    numbers: boolean;
    tabs: boolean;
    statusBar: boolean;
};

type OverlayContext = {
    overlays: Overlay;
    setOverlays: Dispatch<SetStateAction<Overlay>>;
};

const OverlayContext = createContext<OverlayContext | undefined>(undefined);

export function useOverlay() {
    const context = useContext(OverlayContext);

    if (!context) {
        throw new Error('useOverlay must be used within an OverlayProvider');
    }

    return context;
}

export function OverlayProvider({ children }: { children: ReactNode }) {
    const [overlays, setOverlays] = useState({
        page: false,
        left: false,
        right: false,
        numbers: false,
        tabs: false,
        statusBar: false,
    });

    return (
        <OverlayContext.Provider
            value={{
                overlays,
                setOverlays,
            }}
        >
            {children}
        </OverlayContext.Provider>
    );
}
