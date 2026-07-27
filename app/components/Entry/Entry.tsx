import styles from './Entry.module.scss';

type EntryProps = {
    name: string;
    description: React.ReactNode;
    inline?: boolean;
    children: React.ReactNode;
};

// One catalog row: corner brackets, a name, a description, then the real
// component plus its Hotspots as children. Those children land inside a
// position:relative box sized to just the component — not this section's
// own 50vw column — so Hotspot's leftPct/topPct land on the component's
// own edges rather than the whole entry. inline lets a fixed-size
// component (Ring's --size px, Toggle/Slider/Choice's intrinsic width)
// shrink that box to fit instead of stretching it to the full column.
export function Entry({ name, description, inline = false, children }: EntryProps) {
    return (
        <section className={styles.entry}>
            <span className={`${styles.corner} ${styles.tl}`} />
            <span className={`${styles.corner} ${styles.tr}`} />
            <span className={`${styles.corner} ${styles.bl}`} />
            <span className={`${styles.corner} ${styles.br}`} />

            <h2 className={styles.name}>{name}</h2>
            <p className={styles.description}>{description}</p>

            <div className={styles.stage} data-inline={inline}>
                {children}
            </div>
        </section>
    );
}
