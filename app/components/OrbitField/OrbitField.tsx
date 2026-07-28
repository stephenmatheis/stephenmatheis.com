import { colorVars, ColorProps } from '../colors';
import styles from './OrbitField.module.scss';

export type OrbitNode = {
    label: string;
    count: number;
};

type OrbitFieldProps = ColorProps & {
    hub: string;
    nodes: OrbitNode[];
    size?: number;
    className?: string;
};

const MIN_DURATION = 18;
const DURATION_STEP = 9;
const DEPTH_STEP = 18;

// Each node orbits on its own ring, each ring at its own depth (real
// translateZ, not a drop shadow standing in for one) and its own period —
// the outer rings drift slower, the way real orbits do. A node's own
// element counter-rotates at the same period so its label stays upright
// through the sweep instead of spinning with the ring underneath it.
export function OrbitField({ hub, nodes, size = 240, className, background, foreground, accent }: OrbitFieldProps) {
    // Radii scaled from `size` itself, not fixed constants — otherwise
    // the outermost ring's real footprint can exceed the box `size`
    // claims to occupy, and a parent with overflow:hidden clips it.
    const maxRadius = size / 2 - 16;
    const minRadius = maxRadius * 0.4;
    const radiusStep = nodes.length > 1 ? (maxRadius - minRadius) / (nodes.length - 1) : 0;

    return (
        <div
            className={`${styles.wrap} ${className ?? ''}`}
            style={{ ...colorVars({ background, foreground, accent }), '--size': `${size}px` } as React.CSSProperties}
        >
            <div className={styles.stage}>
                {nodes.map((node, i) => {
                    const radius = minRadius + i * radiusStep;
                    const duration = MIN_DURATION + i * DURATION_STEP;
                    const z = -(i + 1) * DEPTH_STEP;

                    return (
                        <div key={node.label} className={styles.depth} style={{ '--z': `${z}px` } as React.CSSProperties}>
                            <span className={styles.ringTrack} style={{ '--radius': `${radius}px` } as React.CSSProperties} />
                            <div
                                className={styles.ring}
                                style={{ '--radius': `${radius}px`, '--duration': `${duration}s` } as React.CSSProperties}
                            >
                                <div className={styles.node}>
                                    <span className={styles.dot} />
                                    <span className={styles.nodeLabel}>
                                        {node.label} · {node.count}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}

                <div className={styles.hub}>
                    <span className={styles.hubValue}>{nodes.reduce((sum, n) => sum + n.count, 0)}</span>
                    <span className={styles.hubLabel}>{hub}</span>
                </div>
            </div>
        </div>
    );
}
