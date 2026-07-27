// Shared three-color contract every component in the system takes:
// background, foreground, accent. Defaults are deliberately loud (white,
// black, pure red) so an unstyled instance is obviously unstyled rather
// than quietly matching whatever it happens to sit on.
export type ColorProps = {
    background?: string;
    foreground?: string;
    accent?: string;
};

export const DEFAULT_COLORS = {
    background: '#ffffff',
    foreground: '#000000',
    accent: '#ff0000',
} as const;

export function colorVars({ background, foreground, accent }: ColorProps): React.CSSProperties {
    return {
        '--bg': background ?? DEFAULT_COLORS.background,
        '--fg': foreground ?? DEFAULT_COLORS.foreground,
        '--accent': accent ?? DEFAULT_COLORS.accent,
    } as React.CSSProperties;
}
