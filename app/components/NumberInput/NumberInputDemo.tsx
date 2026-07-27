'use client';

import { NumberInput } from './NumberInput';
import { Hotspot } from '../Hotspot';
import { Inspector, useColors } from '../Inspector';
import { useStoredState } from '@/app/hooks/useStoredState';

export function NumberInputDemo() {
    const [value, setValue] = useStoredState('system:numberinput.value', 42);
    const [colors, setColors] = useColors('numberinput');

    return (
        <>
            <NumberInput label="NUMBER INPUT" value={value} onChange={setValue} {...colors} />
            <Hotspot leftPct={100} topPct={0} legDx={30} legDy={-60} label="NumberInput colors" {...colors}>
                <Inspector colors={colors} onChange={setColors} />
            </Hotspot>
        </>
    );
}
