'use client';

import { Slider } from '@/app/components/Slider/Slider';
import { NumberInput } from '@/app/components/NumberInput/NumberInput';
import { useStoredState } from '@/app/hooks/useStoredState';
import styles from './RangedSlider.module.scss';

type RangedSliderProps = {
    storageKey: string;
    label: string;
    value: number;
    onChange: (value: number) => void;
    defaultMin: number;
    defaultMax: number;
    defaultStep: number;
};

// Sandbox-only composition: a hardcoded min/max/step felt weird to tune
// against, so each tuning Slider here gets its own range, editable and
// persisted right next to it. The Slider component itself stays plain —
// this is how the sandbox uses it, not a trait of Slider itself.
export function RangedSlider({ storageKey, label, value, onChange, defaultMin, defaultMax, defaultStep }: RangedSliderProps) {
    const [min, setMin] = useStoredState(`${storageKey}.min`, defaultMin);
    const [max, setMax] = useStoredState(`${storageKey}.max`, defaultMax);
    const [step, setStep] = useStoredState(`${storageKey}.step`, defaultStep);

    return (
        <div className={styles.row}>
            <Slider label={label} value={value} min={min} max={max} step={step} onChange={onChange} />
            <div className={styles.range}>
                <NumberInput label="MIN" value={min} onChange={setMin} />
                <NumberInput label="MAX" value={max} onChange={setMax} />
                <NumberInput label="STEP" value={step} onChange={setStep} />
            </div>
        </div>
    );
}
