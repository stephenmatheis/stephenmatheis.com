'use client';

import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

type Values = {
    isHovered: boolean;
    isOn: boolean;
};

export type Overlay = {
    fontFamily: Values;
    fontWeight: Values;
    backgroundColor: Values;
    color: Values;
    muted: Values;
    light: Values;
    lighter: Values;
    lightest: Values;
    accent: Values;
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
        fontFamily: {
            isHovered: false,
            isOn: false,
        },
        fontWeight: {
            isHovered: false,
            isOn: false,
        },
        backgroundColor: {
            isHovered: false,
            isOn: false,
        },
        color: {
            isHovered: false,
            isOn: false,
        },
        muted: {
            isHovered: false,
            isOn: false,
        },
        light: {
            isHovered: false,
            isOn: false,
        },
        lighter: {
            isHovered: false,
            isOn: false,
        },
        lightest: {
            isHovered: false,
            isOn: false,
        },
        accent: {
            isHovered: false,
            isOn: false,
        },
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
