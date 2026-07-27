'use client';

import { Ring, RingLayer, DEFAULT_RING_LAYERS } from '@/app/components/Ring/Ring';
import { Slider } from '@/app/components/Slider/Slider';
import { Toggle } from '@/app/components/Toggle/Toggle';
import { ColorInput } from '@/app/components/ColorInput/ColorInput';
import { Hotspot } from '@/app/components/Hotspot/Hotspot';
import { colorVars } from '@/app/components/colors';
import { useStoredState } from '@/app/hooks/useStoredState';
import styles from './page.module.scss';
import ringStyles from './SystemRing.module.scss';

// Angle 0 = right (3 o'clock), 90 = top, increasing counterclockwise —
// standard math convention, flipped for CSS top growing downward.
function polar(angleDeg: number, radiusFraction: number) {
    const rad = (angleDeg * Math.PI) / 180;

    return {
        leftPct: 50 + radiusFraction * 50 * Math.cos(rad),
        topPct: 50 - radiusFraction * 50 * Math.sin(rad),
    };
}

// Every ring layer's own hotspot sits along this one spoke, at a distance
// from center set by its own radius — the same line through the dial, so
// adding or removing rings just adds or removes a dot along it instead of
// rearranging the whole layout. Top-left rather than bottom-right so the
// dot lands on open dial face instead of crossing where the leader lines
// of the fixed hotspots (diameter, tilt, colors) already run.
const LAYER_ANGLE = 135;

const MIN_RADIUS = 5;
const RADIUS_STEP = 12;

type Layer = RingLayer & { id: number };

const INITIAL_LAYERS: Layer[] = DEFAULT_RING_LAYERS.map((layer, i) => ({ ...layer, id: i }));

// A new ring nests just inside the current innermost one. Once that gap
// closes up, further additions would land on top of the innermost ring
// instead of inside it — indistinguishable, not just crowded — so room
// is checked before adding rather than clamping into a silent duplicate.
function hasRoomForLayer(layers: Layer[]) {
    const innermost = Math.min(...layers.map((l) => l.radius));

    return innermost - RADIUS_STEP >= MIN_RADIUS;
}

function nextLayer(layers: Layer[]): Layer {
    const innermost = Math.min(...layers.map((l) => l.radius));
    const id = Math.max(...layers.map((l) => l.id)) + 1;

    return {
        radius: innermost - RADIUS_STEP,
        z: -90,
        opacity: 0.5,
        tickCount: 48,
        tickWidth: 1,
        emphasizeMajors: true,
        spinSeconds: 0,
        showCircle: false,
        id,
    };
}

// One hotspot per ring layer, not per property — click the ring itself to
// tune everything about it (radius, ticks, spin, opacity, ...) or remove
// it. That keeps hotspot count tied to how many rings exist instead of how
// many properties each one has. Diameter, tilt, and colors stay as their
// own fixed hotspots; adding a ring is a plain button, since it isn't
// attached to an existing visual part the way tuning one is.
export function SystemRing() {
    const [background, setBackground] = useStoredState('system:ring.bg', '#ffffff');
    const [foreground, setForeground] = useStoredState('system:ring.fg', '#000000');
    const [accent, setAccent] = useStoredState('system:ring.accent', '#ff0000');
    const [size, setSize] = useStoredState('system:ring.size', 160);
    const [tiltStrength, setTiltStrength] = useStoredState('system:ring.tilt', 18);
    const [layers, setLayers] = useStoredState<Layer[]>('system:ring.layers', INITIAL_LAYERS);

    const colors = { background, foreground, accent };

    function updateLayer(id: number, patch: Partial<RingLayer>) {
        setLayers((prev) => prev.map((layer) => (layer.id === id ? { ...layer, ...patch } : layer)));
    }

    function removeLayer(id: number) {
        setLayers((prev) => (prev.length > 1 ? prev.filter((layer) => layer.id !== id) : prev));
    }

    function addLayer() {
        setLayers((prev) => (hasRoomForLayer(prev) ? [...prev, nextLayer(prev)] : prev));
    }

    const diameterPos = polar(0, 1.5);
    const tiltPos = polar(0, 1.25);
    const colorsPos = polar(0, 1);

    return (
        <div className={styles.stage} style={{ display: 'inline-block' }}>
            <Ring label="RING .01" value="72%" size={size} layers={layers} tiltStrength={tiltStrength} {...colors} />

            <Hotspot
                leftPct={diameterPos.leftPct}
                topPct={diameterPos.topPct}
                legDx={40}
                legDy={-70}
                label="Diameter"
                {...colors}
            >
                <Slider label="DIAMETER" value={size} min={80} max={320} step={10} onChange={setSize} {...colors} />
            </Hotspot>

            {layers.map((layer, i) => {
                const pos = polar(LAYER_ANGLE, layer.radius / 50);

                return (
                    <Hotspot
                        key={layer.id}
                        leftPct={pos.leftPct}
                        topPct={pos.topPct}
                        legDx={50}
                        legDy={70}
                        label={`Ring ${i + 1}`}
                        {...colors}
                    >
                        <Slider
                            label="RADIUS"
                            value={layer.radius}
                            min={5}
                            max={48}
                            step={1}
                            onChange={(radius) => updateLayer(layer.id, { radius })}
                            {...colors}
                        />
                        <Slider
                            label="TICK COUNT"
                            value={layer.tickCount}
                            min={8}
                            max={96}
                            step={4}
                            onChange={(tickCount) => updateLayer(layer.id, { tickCount })}
                            {...colors}
                        />
                        <Slider
                            label="TICK WIDTH"
                            value={layer.tickWidth}
                            min={1}
                            max={4}
                            step={1}
                            onChange={(tickWidth) => updateLayer(layer.id, { tickWidth })}
                            {...colors}
                        />
                        <Slider
                            label="OPACITY"
                            value={layer.opacity}
                            min={0}
                            max={1}
                            step={0.05}
                            onChange={(opacity) => updateLayer(layer.id, { opacity: Math.round(opacity * 100) / 100 })}
                            {...colors}
                        />
                        <Slider
                            label="SPIN SECONDS"
                            value={layer.spinSeconds}
                            min={0}
                            max={180}
                            step={5}
                            onChange={(spinSeconds) => updateLayer(layer.id, { spinSeconds })}
                            {...colors}
                        />
                        <Toggle
                            label="Show circle"
                            checked={layer.showCircle}
                            onChange={(showCircle) => updateLayer(layer.id, { showCircle })}
                            {...colors}
                        />
                        <Toggle
                            label="Emphasize majors"
                            checked={layer.emphasizeMajors}
                            onChange={(emphasizeMajors) => updateLayer(layer.id, { emphasizeMajors })}
                            {...colors}
                        />
                        {layers.length > 1 && (
                            <button
                                type="button"
                                className={ringStyles.removeRing}
                                onClick={() => removeLayer(layer.id)}
                            >
                                − Remove ring
                            </button>
                        )}
                    </Hotspot>
                );
            })}

            <Hotspot
                leftPct={tiltPos.leftPct}
                topPct={tiltPos.topPct}
                legDx={40}
                legDy={110}
                label="Tilt strength"
                {...colors}
            >
                <Slider
                    label="TILT STRENGTH"
                    value={tiltStrength}
                    min={0}
                    max={40}
                    step={2}
                    onChange={setTiltStrength}
                    {...colors}
                />
            </Hotspot>

            <Hotspot
                leftPct={colorsPos.leftPct}
                topPct={colorsPos.topPct}
                legDx={60}
                legDy={50}
                label="Colors"
                {...colors}
            >
                <ColorInput label="BACKGROUND" value={background} onChange={setBackground} />
                <ColorInput label="FOREGROUND" value={foreground} onChange={setForeground} />
                <ColorInput label="ACCENT" value={accent} onChange={setAccent} />
            </Hotspot>

            <button
                type="button"
                className={ringStyles.addRing}
                style={colorVars(colors)}
                onClick={addLayer}
                disabled={!hasRoomForLayer(layers)}
            >
                + Add ring
            </button>
        </div>
    );
}
