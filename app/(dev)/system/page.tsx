import { SystemFrame } from './SystemFrame';
import { SystemRing } from './SystemRing';
import { SystemToggle, SystemSlider, SystemChoice, SystemColorInput, SystemNumberInput } from './SystemPrimitives';
import styles from './page.module.scss';

// The design system catalog — the one path. Each entry is a live,
// interactive instance with hotspots for whatever it takes to configure,
// not a static picture next to a separate controls list: the demo and
// the sandbox used to be two different pages (/frame and /system) before
// hotspots made that split unnecessary.
export default function SystemPage() {
    return (
        <div className={styles.page}>
            <h1 className={styles.heading}>SYSTEM</h1>

            <section className={styles.entry}>
                <h2 className={styles.name}>Frame</h2>
                <p className={styles.description}>
                    Corner brackets (or a real border) stand in for a border. Label and an optional live readout
                    sit above a tick strip; body content can be text or another component entirely. Five hotspots
                    — border, padding, body font size, corner labels, and colors.
                </p>
                <SystemFrame />
            </section>

            <section className={styles.entry}>
                <h2 className={styles.name}>Ring</h2>
                <p className={styles.description}>
                    A radial gauge built from independently configurable concentric rings, with real layered CSS
                    depth and cursor-driven parallax tilt. One hotspot per ring — click a ring to tune everything
                    about it, or remove it — plus diameter, tilt strength, and colors. Add a ring with the button
                    below.
                </p>
                <SystemRing />
            </section>

            <section className={styles.entry}>
                <h2 className={styles.name}>Toggle</h2>
                <p className={styles.description}>
                    A two-cell slide switch, not a rounded pill. One hotspot for colors.
                </p>
                <SystemToggle />
            </section>

            <section className={styles.entry}>
                <h2 className={styles.name}>Slider</h2>
                <p className={styles.description}>
                    Ticks tied to the actual step count, not a decorative fixed-pixel pattern — the thumb always
                    lands on a real stop. Touch-capable. One hotspot for colors.
                </p>
                <SystemSlider />
            </section>

            <section className={styles.entry}>
                <h2 className={styles.name}>Choice</h2>
                <p className={styles.description}>
                    A row of buttons, one active, for three-or-more mutually exclusive options a Toggle
                    can&rsquo;t cover. One hotspot for colors.
                </p>
                <SystemChoice />
            </section>

            <section className={styles.entry}>
                <h2 className={styles.name}>ColorInput</h2>
                <p className={styles.description}>
                    Hex or hsl() live text entry with a swatch preview, no native color-wheel picker. One hotspot
                    for colors.
                </p>
                <SystemColorInput />
            </section>

            <section className={styles.entry}>
                <h2 className={styles.name}>NumberInput</h2>
                <p className={styles.description}>
                    Numeric-only live text entry, no native spinner chrome. One hotspot for colors.
                </p>
                <SystemNumberInput />
            </section>
        </div>
    );
}
