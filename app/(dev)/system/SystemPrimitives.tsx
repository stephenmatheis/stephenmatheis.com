'use client';

import { Toggle } from '@/app/components/Toggle/Toggle';
import { Slider } from '@/app/components/Slider/Slider';
import { Choice } from '@/app/components/Choice/Choice';
import { ColorInput } from '@/app/components/ColorInput/ColorInput';
import { NumberInput } from '@/app/components/NumberInput/NumberInput';
import { Hotspot } from '@/app/components/Hotspot/Hotspot';
import { useStoredState } from '@/app/hooks/useStoredState';
import styles from './page.module.scss';

type Colors = { background: string; foreground: string; accent: string };

// Same three persisted colors for any component, keyed by name — the
// ColorProps contract is what makes one Inspector work for all five.
function useColors(key: string): [Colors, (patch: Partial<Colors>) => void] {
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

function Inspector({ colors, onChange }: { colors: Colors; onChange: (patch: Partial<Colors>) => void }) {
    return (
        <>
            <ColorInput label="BACKGROUND" value={colors.background} onChange={(v) => onChange({ background: v })} />
            <ColorInput label="FOREGROUND" value={colors.foreground} onChange={(v) => onChange({ foreground: v })} />
            <ColorInput label="ACCENT" value={colors.accent} onChange={(v) => onChange({ accent: v })} />
        </>
    );
}

// One hotspot each — every one opening the same three-color Inspector.
// The hotspot doesn't know or care what it's attached to, only that the
// thing behind it takes the shared ColorProps contract.
export function SystemToggle() {
    const [checked, setChecked] = useStoredState('system:toggle.checked', true);
    const [colors, setColors] = useColors('toggle');

    return (
        <div className={styles.stage} style={{ display: 'inline-block' }}>
            <Toggle label="Toggle" checked={checked} onChange={setChecked} {...colors} />
            <Hotspot leftPct={100} topPct={0} legDx={30} legDy={-60} label="Toggle colors" {...colors}>
                <Inspector colors={colors} onChange={setColors} />
            </Hotspot>
        </div>
    );
}

export function SystemSlider() {
    const [value, setValue] = useStoredState('system:slider.value', 50);
    const [colors, setColors] = useColors('slider');

    return (
        <div className={styles.stage} style={{ display: 'inline-block' }}>
            <Slider label="SLIDER" value={value} min={0} max={100} step={5} onChange={setValue} {...colors} />
            <Hotspot leftPct={100} topPct={0} legDx={30} legDy={-60} label="Slider colors" {...colors}>
                <Inspector colors={colors} onChange={setColors} />
            </Hotspot>
        </div>
    );
}

export function SystemChoice() {
    const [value, setValue] = useStoredState('system:choice.value', 'a');
    const [colors, setColors] = useColors('choice');

    return (
        <div className={styles.stage} style={{ display: 'inline-block' }}>
            <Choice
                label="CHOICE"
                value={value}
                onChange={setValue}
                options={[
                    { value: 'a', label: 'A' },
                    { value: 'b', label: 'B' },
                    { value: 'c', label: 'C' },
                ]}
                {...colors}
            />
            <Hotspot leftPct={100} topPct={0} legDx={30} legDy={-60} label="Choice colors" {...colors}>
                <Inspector colors={colors} onChange={setColors} />
            </Hotspot>
        </div>
    );
}

export function SystemColorInput() {
    const [value, setValue] = useStoredState('system:colorinput.value', '#ff0000');
    const [colors, setColors] = useColors('colorinput');

    return (
        <div className={styles.stage} style={{ display: 'inline-block' }}>
            <ColorInput label="COLOR INPUT" value={value} onChange={setValue} {...colors} />
            <Hotspot leftPct={100} topPct={0} legDx={30} legDy={-60} label="ColorInput colors" {...colors}>
                <Inspector colors={colors} onChange={setColors} />
            </Hotspot>
        </div>
    );
}

export function SystemNumberInput() {
    const [value, setValue] = useStoredState('system:numberinput.value', 42);
    const [colors, setColors] = useColors('numberinput');

    return (
        <div className={styles.stage} style={{ display: 'inline-block' }}>
            <NumberInput label="NUMBER INPUT" value={value} onChange={setValue} {...colors} />
            <Hotspot leftPct={100} topPct={0} legDx={30} legDy={-60} label="NumberInput colors" {...colors}>
                <Inspector colors={colors} onChange={setColors} />
            </Hotspot>
        </div>
    );
}
