import { SystemFrame } from './SystemFrame';
import { SystemRing } from './SystemRing';
import { SystemToggle, SystemSlider, SystemChoice, SystemColorInput, SystemNumberInput } from './SystemPrimitives';
import styles from './page.module.scss';

function Corners() {
    return (
        <>
            <span className={`${styles.corner} ${styles.tl}`} />
            <span className={`${styles.corner} ${styles.tr}`} />
            <span className={`${styles.corner} ${styles.bl}`} />
            <span className={`${styles.corner} ${styles.br}`} />
        </>
    );
}

export default function SystemPage() {
    return (
        <div className={styles.page}>
            <h1 className={styles.heading}>SYSTEM</h1>
            <section className={styles.entry}>
                <Corners />
                <h2 className={styles.name}>FRAME</h2>
                <p className={styles.description}>
                    Corner brackets (or a real border) stand in for a border. Label and an optional live readout sit
                    above a tick strip; body content can be text or another component entirely. Five hotspots — border,
                    padding, body font size, corner labels, and colors.
                </p>
                <SystemFrame />
            </section>
            <section className={styles.entry}>
                <Corners />
                <h2 className={styles.name}>RING</h2>
                <p className={styles.description}>
                    A radial gauge built from independently configurable concentric rings, with real layered CSS depth
                    and cursor-driven parallax tilt. One hotspot per ring — click a ring to tune everything about it, or
                    remove it — plus diameter, tilt strength, and colors. Add a ring with the button below.
                </p>
                <SystemRing />
            </section>
            <section className={styles.entry}>
                <Corners />
                <h2 className={styles.name}>TOGGLE</h2>
                <p className={styles.description}>
                    A two-cell slide switch, not a rounded pill. One hotspot for colors.
                </p>
                <SystemToggle />
            </section>
            <section className={styles.entry}>
                <Corners />
                <h2 className={styles.name}>SLIDER</h2>
                <p className={styles.description}>
                    Ticks tied to the actual step count, not a decorative fixed-pixel pattern — the thumb always lands
                    on a real stop. Touch-capable. One hotspot for colors.
                </p>
                <SystemSlider />
            </section>
            <section className={styles.entry}>
                <Corners />
                <h2 className={styles.name}>CHOICE</h2>
                <p className={styles.description}>
                    A row of buttons, one active, for three-or-more mutually exclusive options a Toggle can&rsquo;t
                    cover. One hotspot for colors.
                </p>
                <SystemChoice />
            </section>
            <section className={styles.entry}>
                <Corners />
                <h2 className={styles.name}>COLOR INPUT</h2>
                <p className={styles.description}>
                    Hex or hsl() live text entry with a swatch preview, no native color-wheel picker. One hotspot for
                    colors.
                </p>
                <SystemColorInput />
            </section>
            <section className={styles.entry}>
                <Corners />
                <h2 className={styles.name}>NUMBER INPUT</h2>
                <p className={styles.description}>
                    Numeric-only live text entry, no native spinner chrome. One hotspot for colors.
                </p>
                <SystemNumberInput />
            </section>
        </div>
    );
}
