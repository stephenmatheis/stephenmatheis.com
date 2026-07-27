'use client';

import { Slider } from './Slider';
import { Hotspot } from '../Hotspot';
import { Inspector, useColors } from '../Inspector';
import { useStoredState } from '@/app/hooks/useStoredState';

export function SliderDemo() {
    const [value, setValue] = useStoredState('system:slider.value', 50);
    const [colors, setColors] = useColors('slider');

    return (
        <>
            <Slider label="SLIDER" value={value} min={0} max={100} step={5} onChange={setValue} {...colors} />
            <Hotspot leftPct={100} topPct={0} legDx={30} legDy={-60} label="Slider colors" {...colors}>
                <Inspector colors={colors} onChange={setColors} />
            </Hotspot>
        </>
    );
}
