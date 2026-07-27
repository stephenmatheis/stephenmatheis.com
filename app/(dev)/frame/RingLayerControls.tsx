'use client';

import { RingLayer } from '@/app/components/Ring/Ring';
import { Toggle } from '@/app/components/Toggle/Toggle';
import { RangedSlider } from './RangedSlider';
import styles from './RingLayerControls.module.scss';

type RingLayerControlsProps = {
    index: number;
    layer: RingLayer;
    onChange: (patch: Partial<RingLayer>) => void;
    onRemove: () => void;
};

// Every knob a single ring in the gauge has, fully independent of its
// neighbors — this is what "each ring gets its own controls" turns into
// once Ring stops distributing rings by formula.
export function RingLayerControls({ index, layer, onChange, onRemove }: RingLayerControlsProps) {
    const key = `frame-sandbox:ring.layer.${index}`;

    return (
        <div className={styles.cluster}>
            <div className={styles.header}>
                <div className={styles.heading}>RING {index + 1}</div>
                <button type="button" className={styles.remove} onClick={onRemove}>
                    Remove
                </button>
            </div>

            <RangedSlider
                storageKey={`${key}.radius`}
                label="RADIUS"
                value={layer.radius}
                onChange={(radius) => onChange({ radius })}
                defaultMin={5}
                defaultMax={48}
                defaultStep={1}
            />
            <RangedSlider
                storageKey={`${key}.z`}
                label="DEPTH (Z)"
                value={layer.z}
                onChange={(z) => onChange({ z })}
                defaultMin={-120}
                defaultMax={40}
                defaultStep={5}
            />
            <RangedSlider
                storageKey={`${key}.opacity`}
                label="OPACITY"
                value={layer.opacity}
                onChange={(opacity) => onChange({ opacity })}
                defaultMin={0}
                defaultMax={1}
                defaultStep={0.05}
            />
            <RangedSlider
                storageKey={`${key}.tickCount`}
                label="TICK COUNT"
                value={layer.tickCount}
                onChange={(tickCount) => onChange({ tickCount })}
                defaultMin={6}
                defaultMax={96}
                defaultStep={6}
            />
            <RangedSlider
                storageKey={`${key}.tickWidth`}
                label="TICK WIDTH"
                value={layer.tickWidth}
                onChange={(tickWidth) => onChange({ tickWidth })}
                defaultMin={0.5}
                defaultMax={3}
                defaultStep={0.5}
            />
            <RangedSlider
                storageKey={`${key}.spinSeconds`}
                label="SPIN SECONDS"
                value={layer.spinSeconds}
                onChange={(spinSeconds) => onChange({ spinSeconds })}
                defaultMin={0}
                defaultMax={180}
                defaultStep={5}
            />
            <Toggle
                label="Emphasize ordinals"
                checked={layer.emphasizeMajors}
                onChange={(emphasizeMajors) => onChange({ emphasizeMajors })}
            />
            <Toggle label="Show circle" checked={layer.showCircle} onChange={(showCircle) => onChange({ showCircle })} />
        </div>
    );
}
