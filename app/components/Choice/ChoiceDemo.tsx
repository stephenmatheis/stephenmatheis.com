'use client';

import { Choice } from './Choice';
import { Hotspot } from '../Hotspot';
import { Inspector, useColors } from '../Inspector';
import { useStoredState } from '@/app/hooks/useStoredState';

export function ChoiceDemo() {
    const [value, setValue] = useStoredState('system:choice.value', 'a');
    const [colors, setColors] = useColors('choice');

    return (
        <>
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
        </>
    );
}
