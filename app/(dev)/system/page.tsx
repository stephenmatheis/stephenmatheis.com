import { FrameDemo } from '@/app/components/Frame';
import { RingDemo } from '@/app/components/Ring';
import { ToggleDemo } from '@/app/components/Toggle';
import { SliderDemo } from '@/app/components/Slider';
import { ChoiceDemo } from '@/app/components/Choice';
import { ColorInputDemo } from '@/app/components/ColorInput';
import { NumberInputDemo } from '@/app/components/NumberInput';
import { Entry } from '@/app/components/Entry';
import styles from './page.module.scss';

export default function SystemPage() {
    return (
        <div className={styles.page}>
            <h1 className={styles.heading}>SYSTEM</h1>

            <Entry
                name="FRAME"
                description="Corner brackets. Readout. Label. Tick strip. Body content can be text or another component. Five hotspots — border, padding, body font size, corner labels, and colors."
            >
                <FrameDemo />
            </Entry>

            <Entry
                name="RING"
                description="A radial gauge built from independently configurable concentric rings, with real layered CSS depth and cursor-driven parallax tilt. One hotspot per ring — click a ring to tune everything about it, or remove it — plus diameter, tilt strength, and colors. Add a ring with the button below."
                inline
            >
                <RingDemo />
            </Entry>

            <Entry
                name="TOGGLE"
                description="A two-cell slide switch, not a rounded pill. One hotspot for colors."
                inline
            >
                <ToggleDemo />
            </Entry>

            <Entry
                name="SLIDER"
                description="Ticks tied to the actual step count, not a decorative fixed-pixel pattern — the thumb always lands on a real stop. Touch-capable. One hotspot for colors."
                inline
            >
                <SliderDemo />
            </Entry>

            <Entry
                name="CHOICE"
                description="A row of buttons, one active, for three-or-more mutually exclusive options a Toggle can't cover. One hotspot for colors."
                inline
            >
                <ChoiceDemo />
            </Entry>

            <Entry
                name="COLOR INPUT"
                description="Hex or hsl() live text entry with a swatch preview, no native color-wheel picker. One hotspot for colors."
                inline
            >
                <ColorInputDemo />
            </Entry>

            <Entry
                name="NUMBER INPUT"
                description="Numeric-only live text entry, no native spinner chrome. One hotspot for colors."
                inline
            >
                <NumberInputDemo />
            </Entry>
        </div>
    );
}
