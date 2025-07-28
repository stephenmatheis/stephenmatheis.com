'use client';

import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

type Values = {
    isHovered: boolean;
    isOn: boolean;
};

export type Overlay = {
    page: Values;
    left: Values;
    right: Values;
    numbers: Values;
    tabs: Values;
    statusBar: Values;
    pageWidth: Values;
    pageHeight: Values;
    paddingTop: Values;
    paddingBottom: Values;
    contentHeight: Values;
    contentWidth: Values;
    gap: Values;
    rightWidth: Values;
    leftWidth: Values;
    lineHeight: Values;
    fontSize: Values;
    charWidth: Values;
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
        page: {
            isHovered: false,
            isOn: false,
        },
        left: {
            isHovered: false,
            isOn: false,
        },
        right: {
            isHovered: false,
            isOn: false,
        },
        numbers: {
            isHovered: false,
            isOn: false,
        },
        tabs: {
            isHovered: false,
            isOn: false,
        },
        statusBar: {
            isHovered: false,
            isOn: false,
        },
        pageWidth: {
            isHovered: false,
            isOn: false,
        },
        pageHeight: {
            isHovered: false,
            isOn: false,
        },
        paddingTop: {
            isHovered: false,
            isOn: false,
        },
        paddingBottom: {
            isHovered: false,
            isOn: false,
        },
        contentHeight: {
            isHovered: false,
            isOn: false,
        },
        contentWidth: {
            isHovered: false,
            isOn: false,
        },
        gap: {
            isHovered: false,
            isOn: false,
        },
        rightWidth: {
            isHovered: false,
            isOn: false,
        },
        leftWidth: {
            isHovered: false,
            isOn: false,
        },
        lineHeight: {
            isHovered: false,
            isOn: false,
        },
        fontSize: {
            isHovered: false,
            isOn: false,
        },
        charWidth: {
            isHovered: false,
            isOn: false,
        },
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
