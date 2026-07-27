'use client';

import { ColorInput } from './ColorInput';
import { Hotspot } from '../Hotspot';
import { Inspector, useColors } from '../Inspector';
import { useStoredState } from '@/app/hooks/useStoredState';

export function ColorInputDemo() {
    const [value, setValue] = useStoredState('system:colorinput.value', '#ff0000');
    const [colors, setColors] = useColors('colorinput');

    return (
        <>
            <ColorInput label="COLOR INPUT" value={value} onChange={setValue} {...colors} />
            <Hotspot leftPct={100} topPct={0} legDx={30} legDy={-60} label="ColorInput colors" {...colors}>
                <Inspector colors={colors} onChange={setColors} />
            </Hotspot>
        </>
    );
}
