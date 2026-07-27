import { colorVars, ColorProps } from '../colors';
import { EventProps } from '../events';
import styles from './Frame.module.scss';

export type FrameBorder = 'square' | 'rounded' | 'none';

type FrameProps = ColorProps &
    EventProps & {
        label: string;
        value?: React.ReactNode;
        labelBL?: React.ReactNode;
        labelBR?: React.ReactNode;
        children: React.ReactNode;
        className?: string;
        border?: FrameBorder;
        padding?: number;
        fontSize?: number;
        fontWeight?: number;
    };

// The base unit of the design system: a label and an optional live readout
// sit above a tick strip, with any of the four corners able to carry a
// label of its own. Border is always a corner bracket, never a solid
// line — "square" vs "rounded" only changes the bracket's own joint shape,
// or "none" omits it entirely. Colors come from the shared
// background/foreground/accent contract — Frame only supplies the system
// defaults so it still looks right unstyled.
export function Frame({
    label,
    value,
    labelBL,
    labelBR,
    children,
    className,
    border = 'square',
    padding,
    fontSize,
    fontWeight,
    background,
    foreground,
    accent,
    onMouseEnter,
    onMouseLeave,
    onMouseOver,
    onClick,
}: FrameProps) {
    return (
        <div
            className={`${styles.frame} ${className ?? ''}`}
            data-border={border}
            style={
                {
                    ...colorVars({ background, foreground, accent }),
                    '--padding': padding !== undefined ? `${padding}px` : undefined,
                    '--content-font-size': fontSize !== undefined ? `${fontSize}px` : undefined,
                    '--content-font-weight': fontWeight,
                } as React.CSSProperties
            }
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onMouseOver={onMouseOver}
            onClick={onClick}
        >
            {border !== 'none' && (
                <>
                    <span className={`${styles.corner} ${styles.tl}`} />
                    <span className={`${styles.corner} ${styles.tr}`} />
                    <span className={`${styles.corner} ${styles.bl}`} />
                    <span className={`${styles.corner} ${styles.br}`} />
                </>
            )}

            <div className={styles.label}>{label}</div>
            {value !== undefined && <div className={styles.readout}>{value}</div>}
            <span className={styles.ticks} />

            <div className={styles.body}>{children}</div>

            {labelBL !== undefined && <div className={styles.labelBL}>{labelBL}</div>}
            {labelBR !== undefined && <div className={styles.labelBR}>{labelBR}</div>}
        </div>
    );
}
