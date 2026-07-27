'use client';

// Imports the concrete file, not the barrel — the barrel also re-exports
// ColorInputDemo, which imports Inspector, which would make this a
// circular import through the index files.
import { ColorInput } from '../ColorInput/ColorInput';
import { useStoredState } from '@/app/hooks/useStoredState';

export type Colors = { background: string; foreground: string; accent: string };

// Same three persisted colors for any component, keyed by name — the
// ColorProps contract is what makes one Inspector work for every demo
// that just needs a colors hotspot and nothing else.
export function useColors(key: string): [Colors, (patch: Partial<Colors>) => void] {
    const [background, setBackground] = useStoredState(`system:${key}.bg`, '#ffffff');
    const [foreground, setForeground] = useStoredState(`system:${key}.fg`, '#000000');
    const [accent, setAccent] = useStoredState(`system:${key}.accent`, '#ff0000');

    function set(patch: Partial<Colors>) {
        if (patch.background !== undefined) setBackground(patch.background);
        if (patch.foreground !== undefined) setForeground(patch.foreground);
        if (patch.accent !== undefined) setAccent(patch.accent);
    }

    return [{ background, foreground, accent }, set];
}

export function Inspector({ colors, onChange }: { colors: Colors; onChange: (patch: Partial<Colors>) => void }) {
    return (
        <>
            <ColorInput label="BACKGROUND" value={colors.background} onChange={(v) => onChange({ background: v })} />
            <ColorInput label="FOREGROUND" value={colors.foreground} onChange={(v) => onChange({ foreground: v })} />
            <ColorInput label="ACCENT" value={colors.accent} onChange={(v) => onChange({ accent: v })} />
        </>
    );
}
