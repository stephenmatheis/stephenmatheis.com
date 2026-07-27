'use client';

import { useEffect, useState } from 'react';
import { Frame, FrameBorder } from '@/app/components/Frame/Frame';
import { Ring, RingLayer, DEFAULT_RING_LAYERS } from '@/app/components/Ring/Ring';
import { Toggle } from '@/app/components/Toggle/Toggle';
import { Choice } from '@/app/components/Choice/Choice';
import { ColorInput } from '@/app/components/ColorInput/ColorInput';
import { useStoredState } from '@/app/hooks/useStoredState';
import { RangedSlider } from './RangedSlider';
import { RingLayerControls } from './RingLayerControls';
import styles from './page.module.scss';

const NEW_RING_LAYER: RingLayer = {
    radius: 40,
    z: -30,
    opacity: 0.6,
    tickCount: 48,
    tickWidth: 1,
    emphasizeMajors: true,
    spinSeconds: 0,
    showCircle: false,
};

export default function FramePage() {
    const [time, setTime] = useState('');
    const [lastEvent, setLastEvent] = useState('none yet');

    function track(source: string, type: string) {
        return () => setLastEvent(`${source}: ${type}`);
    }

    const [frameBg, setFrameBg] = useStoredState('frame-sandbox:frame.bg', '#ffffff');
    const [frameFg, setFrameFg] = useStoredState('frame-sandbox:frame.fg', '#000000');
    const [frameAccent, setFrameAccent] = useStoredState('frame-sandbox:frame.accent', '#ff0000');
    const [frameBorder, setFrameBorder] = useStoredState<FrameBorder>('frame-sandbox:frame.border', 'brackets');
    const [framePadding, setFramePadding] = useStoredState('frame-sandbox:frame.padding', 0);
    const [frameCornerLabels, setFrameCornerLabels] = useStoredState('frame-sandbox:frame.cornerLabels', false);
    const [frameNestRing, setFrameNestRing] = useStoredState('frame-sandbox:frame.nestRing', false);
    const [frameFontSize, setFrameFontSize] = useStoredState('frame-sandbox:frame.fontSize', 14);
    const [frameFontWeight, setFrameFontWeight] = useStoredState('frame-sandbox:frame.fontWeight', 400);

    const [ringBg, setRingBg] = useStoredState('frame-sandbox:ring.bg', '#ffffff');
    const [ringFg, setRingFg] = useStoredState('frame-sandbox:ring.fg', '#000000');
    const [ringAccent, setRingAccent] = useStoredState('frame-sandbox:ring.accent', '#ff0000');
    const [ringFontSize, setRingFontSize] = useStoredState('frame-sandbox:ring.fontSize', 20);
    const [ringFontWeight, setRingFontWeight] = useStoredState('frame-sandbox:ring.fontWeight', 400);
    const [size, setSize] = useStoredState('frame-sandbox:ring.size', 160);
    const [tiltStrength, setTiltStrength] = useStoredState('frame-sandbox:ring.tilt', 18);
    const [layers, setLayers] = useStoredState<RingLayer[]>('frame-sandbox:ring.layers', DEFAULT_RING_LAYERS);

    function updateLayer(index: number, patch: Partial<RingLayer>) {
        setLayers((prev) => prev.map((layer, i) => (i === index ? { ...layer, ...patch } : layer)));
    }

    function removeLayer(index: number) {
        setLayers((prev) => prev.filter((_, i) => i !== index));
    }

    function addLayer() {
        setLayers((prev) => [...prev, NEW_RING_LAYER]);
    }

    useEffect(() => {
        // Real time, not a canned string — the readout should be live because
        // the page is running, not because it's styled to look that way.
        const tick = () => setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));

        tick();

        const id = setInterval(tick, 1000);

        return () => clearInterval(id);
    }, []);

    return (
        <div className={styles.page}>
            <section className={styles.entry}>
                <div className={styles.tag}>.DESCRIPTION</div>
                <p className={styles.description}>
                    Corner brackets (or a real border), a label, an optional live readout, and body content that
                    can be text or another component entirely.
                </p>

                <div className={styles.tag}>.COMPONENT</div>
                <Frame
                    label="FRAME .01"
                    value={`T · ${time}`}
                    labelBL={frameCornerLabels ? 'SYS' : undefined}
                    labelBR={frameCornerLabels ? 'OK' : undefined}
                    border={frameBorder}
                    padding={framePadding}
                    fontSize={frameFontSize}
                    fontWeight={frameFontWeight}
                    background={frameBg}
                    foreground={frameFg}
                    accent={frameAccent}
                    onMouseEnter={track('Frame', 'mouseenter')}
                    onMouseLeave={track('Frame', 'mouseleave')}
                    onMouseOver={track('Frame', 'mouseover')}
                    onClick={track('Frame', 'click')}
                >
                    {frameNestRing ? (
                        <Ring
                            label="NESTED"
                            value="—"
                            size={100}
                            layers={[{ ...NEW_RING_LAYER, radius: 40, z: -20 }]}
                            background={frameBg}
                            foreground={frameFg}
                            accent={frameAccent}
                        />
                    ) : (
                        <>
                            This is a frame. No box, just four corners and a hairline label. The clock in the
                            corner is real — it ticks because the page is actually running, not because
                            it&rsquo;s styled to look like it should. Everything else about this page is still
                            being decided.
                        </>
                    )}
                </Frame>

                <div className={styles.lastEvent}>LAST EVENT · {lastEvent}</div>

                <div className={styles.tag}>.CONTROLS</div>
                <div className={styles.controls}>
                    <ColorInput label="BACKGROUND" value={frameBg} onChange={setFrameBg} />
                    <ColorInput label="FOREGROUND" value={frameFg} onChange={setFrameFg} />
                    <ColorInput label="ACCENT" value={frameAccent} onChange={setFrameAccent} />
                    <Choice
                        label="BORDER"
                        value={frameBorder}
                        onChange={(v) => setFrameBorder(v as FrameBorder)}
                        options={[
                            { value: 'brackets', label: 'Brackets' },
                            { value: 'square', label: 'Square' },
                            { value: 'rounded', label: 'Rounded' },
                            { value: 'none', label: 'None' },
                        ]}
                    />
                    <RangedSlider
                        storageKey="frame-sandbox:frame.padding.range"
                        label="PADDING"
                        value={framePadding}
                        onChange={setFramePadding}
                        defaultMin={0}
                        defaultMax={48}
                        defaultStep={2}
                    />
                    <Toggle label="Corner labels (BL/BR)" checked={frameCornerLabels} onChange={setFrameCornerLabels} />
                    <Toggle label="Nest a Ring as body content" checked={frameNestRing} onChange={setFrameNestRing} />
                    <RangedSlider
                        storageKey="frame-sandbox:frame.fontSize.range"
                        label="BODY FONT SIZE"
                        value={frameFontSize}
                        onChange={setFrameFontSize}
                        defaultMin={9}
                        defaultMax={28}
                        defaultStep={1}
                    />
                    <RangedSlider
                        storageKey="frame-sandbox:frame.fontWeight.range"
                        label="BODY FONT WEIGHT"
                        value={frameFontWeight}
                        onChange={setFrameFontWeight}
                        defaultMin={100}
                        defaultMax={700}
                        defaultStep={100}
                    />
                </div>
            </section>

            <span className={styles.divider} />

            <section className={styles.entry}>
                <div className={styles.tag}>.DESCRIPTION</div>
                <p className={styles.description}>
                    A radial gauge built from independently configurable rings, each with its own radius, depth,
                    tick detail, and spin.
                </p>

                <div className={styles.tag}>.COMPONENT</div>
                <Ring
                    label="RING .01"
                    value="72%"
                    size={size}
                    layers={layers}
                    tiltStrength={tiltStrength}
                    fontSize={ringFontSize}
                    fontWeight={ringFontWeight}
                    background={ringBg}
                    foreground={ringFg}
                    accent={ringAccent}
                    onMouseEnter={track('Ring', 'mouseenter')}
                    onMouseLeave={track('Ring', 'mouseleave')}
                    onMouseOver={track('Ring', 'mouseover')}
                    onClick={track('Ring', 'click')}
                />

                <div className={styles.lastEvent}>LAST EVENT · {lastEvent}</div>

                <div className={styles.tag}>.CONTROLS</div>
                <div className={styles.controls}>
                    <ColorInput label="BACKGROUND" value={ringBg} onChange={setRingBg} />
                    <ColorInput label="FOREGROUND" value={ringFg} onChange={setRingFg} />
                    <ColorInput label="ACCENT" value={ringAccent} onChange={setRingAccent} />
                    <RangedSlider
                        storageKey="frame-sandbox:ring.size.range"
                        label="DIAMETER"
                        value={size}
                        onChange={setSize}
                        defaultMin={80}
                        defaultMax={320}
                        defaultStep={10}
                    />
                    <RangedSlider
                        storageKey="frame-sandbox:ring.tilt.range"
                        label="TILT STRENGTH"
                        value={tiltStrength}
                        onChange={setTiltStrength}
                        defaultMin={0}
                        defaultMax={40}
                        defaultStep={2}
                    />
                    <RangedSlider
                        storageKey="frame-sandbox:ring.fontSize.range"
                        label="VALUE FONT SIZE"
                        value={ringFontSize}
                        onChange={setRingFontSize}
                        defaultMin={9}
                        defaultMax={40}
                        defaultStep={1}
                    />
                    <RangedSlider
                        storageKey="frame-sandbox:ring.fontWeight.range"
                        label="VALUE FONT WEIGHT"
                        value={ringFontWeight}
                        onChange={setRingFontWeight}
                        defaultMin={100}
                        defaultMax={700}
                        defaultStep={100}
                    />

                    {layers.map((layer, index) => (
                        <RingLayerControls
                            key={index}
                            index={index}
                            layer={layer}
                            onChange={(patch) => updateLayer(index, patch)}
                            onRemove={() => removeLayer(index)}
                        />
                    ))}

                    <button type="button" className={styles.addRing} onClick={addLayer}>
                        + Add ring
                    </button>
                </div>
            </section>
        </div>
    );
}
