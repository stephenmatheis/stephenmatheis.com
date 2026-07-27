import { Frame } from '@/app/components/Frame/Frame';
import styles from './page.module.scss';

// The design system catalog. Each finished component gets an entry here —
// this is the reference, /frame is the sandbox where a component earns its
// way in.
export default function SystemPage() {
    return (
        <div className={styles.page}>
            <h1 className={styles.heading}>SYSTEM</h1>

            <section className={styles.entry}>
                <h2 className={styles.name}>Frame</h2>
                <p className={styles.description}>
                    Corner brackets stand in for a border. Label and an optional live readout sit above a tick
                    strip. Colors come from the shared background/foreground/accent contract every component
                    takes.
                </p>
                <Frame label="FRAME .01" value="STATIC">
                    Default appearance with no colors supplied — the component falls back to the system defaults
                    (white, black, red) so an unstyled instance is obviously unstyled.
                </Frame>
            </section>
        </div>
    );
}
