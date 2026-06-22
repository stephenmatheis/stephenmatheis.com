import type { StatusBar, EditorState } from './types';

function interpolate(template: string, state: EditorState): string {
    const r = state.activeRegion;

    return template.replace(/\{(\w+)\}/g, (_, token: string) => {
        if (!r) return '';

        switch (token) {
            case 'ln':    return String(state.cursor.y - r.y + 1);
            case 'col':   return String(state.cursor.x - r.x + 1);
            case 'r_rows': return String(r.height);
            case 'r_cols': return String(r.width);
            case 'rows':  return String(state.rows);
            case 'cols':  return String(state.cols);
            default:      return `{${token}}`;
        }
    });
}

// chars must be mainChars — the status bar lives in the main layer, not the active write layer.
export function composeStatusBar(config: StatusBar, state: EditorState, chars: string[][]): void {
    const row = state.rows - 1;

    if (row < 0 || row >= chars.length) return;

    for (let col = 0; col < state.cols; col++) {
        chars[row][col] = '';
    }

    if (config.left) {
        const content = interpolate(config.left, state);

        for (let i = 0; i < content.length && i < state.cols; i++) {
            chars[row][i] = content[i];
        }
    }

    if (config.center) {
        const content = interpolate(config.center, state);
        const startX = Math.floor((state.cols - content.length) / 2);

        for (let i = 0; i < content.length; i++) {
            const col = startX + i;

            if (col >= 0 && col < state.cols) {
                chars[row][col] = content[i];
            }
        }
    }

    if (config.right) {
        const content = interpolate(config.right, state);
        const startX = state.cols - content.length;

        for (let i = 0; i < content.length; i++) {
            const col = startX + i;

            if (col >= 0 && col < state.cols) {
                chars[row][col] = content[i];
            }
        }
    }
}
