'use client';

import { Toggle } from './Toggle';
import { Hotspot } from '../Hotspot';
import { Inspector, useColors } from '../Inspector';
import { useStoredState } from '@/app/hooks/useStoredState';

// One hotspot, opening the same three-color Inspector every simple demo
// uses — the hotspot doesn't know or care what it's attached to, only
// that the thing behind it takes the shared ColorProps contract.
export function ToggleDemo() {
    const [checked, setChecked] = useStoredState('system:toggle.checked', true);
    const [colors, setColors] = useColors('toggle');

    return (
        <>
            <Toggle label="Toggle" checked={checked} onChange={setChecked} {...colors} />
            <Hotspot leftPct={100} topPct={0} legDx={30} legDy={-60} label="Toggle colors" {...colors}>
                <Inspector colors={colors} onChange={setColors} />
            </Hotspot>
        </>
    );
}
