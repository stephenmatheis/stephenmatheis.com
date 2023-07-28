import { getThemes } from '@/lib/themes';

export function useTheme() {
    const mode = localStorage.getItem('prefers-color-scheme') || '';
    const color = localStorage.getItem(`${mode.toLowerCase()}-theme`) || '';
    const colors = getThemes();
    const theme = colors[mode].find(({ name }) => name === color);

    return theme;
}
