'use client';

import { Frame, FrameBorder } from '@/app/components/Frame/Frame';
import { Slider } from '@/app/components/Slider/Slider';
import { Choice } from '@/app/components/Choice/Choice';
import { Toggle } from '@/app/components/Toggle/Toggle';
import { ColorInput } from '@/app/components/ColorInput/ColorInput';
import { Hotspot } from '@/app/components/Hotspot/Hotspot';
import { useStoredState } from '@/app/hooks/useStoredState';
import styles from './page.module.scss';

export function SystemFrame() {
    const [background, setBackground] = useStoredState('system:frame.bg', '#ffffff');
    const [foreground, setForeground] = useStoredState('system:frame.fg', '#000000');
    const [accent, setAccent] = useStoredState('system:frame.accent', '#ff0000');
    const [border, setBorder] = useStoredState<FrameBorder>('system:frame.border', 'square');
    const [padding, setPadding] = useStoredState('system:frame.padding', 0);
    const [fontSize, setFontSize] = useStoredState('system:frame.fontSize', 12);
    const [cornerLabels, setCornerLabels] = useStoredState('system:frame.cornerLabels', false);

    const colors = { background, foreground, accent };

    return (
        <div className={styles.stage}>
            <Frame
                label="FRAME .01"
                labelBL={cornerLabels ? 'SYS' : undefined}
                labelBR={cornerLabels ? 'OK' : undefined}
                border={border}
                padding={padding}
                fontSize={fontSize}
                {...colors}
            >
                This is a frame. Five hotspots sit on the parts they actually control instead of a list below.
            </Frame>

            <Hotspot leftPct={0} topPct={0} legDx={60} legDy={30} label="Border" {...colors}>
                <Choice
                    label="BORDER"
                    value={border}
                    onChange={(v) => setBorder(v as FrameBorder)}
                    options={[
                        { value: 'square', label: 'Square' },
                        { value: 'rounded', label: 'Rounded' },
                        { value: 'none', label: 'None' },
                    ]}
                    {...colors}
                />
            </Hotspot>

            <Hotspot leftPct={100} topPct={50} legDx={40} legDy={-70} label="Padding" {...colors}>
                <Slider label="PADDING" value={padding} min={0} max={48} step={2} onChange={setPadding} {...colors} />
            </Hotspot>

            <Hotspot leftPct={50} topPct={55} legDx={60} legDy={90} label="Body font size" {...colors}>
                <Slider
                    label="BODY FONT SIZE"
                    value={fontSize}
                    min={9}
                    max={28}
                    step={1}
                    onChange={setFontSize}
                    {...colors}
                />
            </Hotspot>

            <Hotspot leftPct={100} topPct={100} legDx={40} legDy={50} label="Corner labels" {...colors}>
                <Toggle label="Corner labels" checked={cornerLabels} onChange={setCornerLabels} {...colors} />
            </Hotspot>

            <Hotspot leftPct={0} topPct={100} legDx={40} legDy={40} label="Colors" {...colors}>
                <ColorInput label="BACKGROUND" value={background} onChange={setBackground} />
                <ColorInput label="FOREGROUND" value={foreground} onChange={setForeground} />
                <ColorInput label="ACCENT" value={accent} onChange={setAccent} />
            </Hotspot>
        </div>
    );
}
