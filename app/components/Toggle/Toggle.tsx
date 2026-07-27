import { colorVars, ColorProps } from '../colors';
import { EventProps } from '../events';
import styles from './Toggle.module.scss';

type ToggleProps = ColorProps &
    EventProps & {
        label: string;
        checked: boolean;
        onChange: (checked: boolean) => void;
        className?: string;
    };

// A physical slide switch, not a rounded iOS pill — a blade that lives in
// one of two cells rather than a thumb that floats on a track. Native
// <button> semantics mean Space/Enter activation comes for free.
export function Toggle({
    label,
    checked,
    onChange,
    className,
    background,
    foreground,
    accent,
    onMouseEnter,
    onMouseLeave,
    onMouseOver,
    onClick,
}: ToggleProps) {
    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        onChange(!checked);
        onClick?.(event);
    }

    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            className={`${styles.toggle} ${className ?? ''}`}
            style={colorVars({ background, foreground, accent })}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onMouseOver={onMouseOver}
            onClick={handleClick}
        >
            <span className={styles.track} data-checked={checked}>
                <span className={styles.blade} />
            </span>
            <span className={styles.label}>{label}</span>
        </button>
    );
}
