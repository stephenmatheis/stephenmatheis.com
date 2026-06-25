import type { ThemeColors } from './types';

function readTheme(): ThemeColors {
    const styles = window.getComputedStyle(document.documentElement);

    return {
        background: styles.getPropertyValue('--background').trim(),
        foreground: styles.getPropertyValue('--foreground').trim(),
        inputBg: styles.getPropertyValue('--input-background').trim() || 'rgba(128,128,128,0.15)',
        placeholderColor: styles.getPropertyValue('--placeholder-color').trim() || 'rgba(128,128,128,0.5)',
        gridLine: styles.getPropertyValue('--grid-line').trim() || '#00000015',
        activeRegionBorderColor: styles.getPropertyValue('--active-region-color').trim() || '#2266cc',
    };
}

export function Theme() {
    let current: ThemeColors = readTheme();

    return {
        get(): ThemeColors {
            return current;
        },
        set(name: 'light' | 'dark'): void {
            document.documentElement.dataset.theme = name;
            current = readTheme();
        },
        refresh(): void {
            current = readTheme();
        },
    };
}
