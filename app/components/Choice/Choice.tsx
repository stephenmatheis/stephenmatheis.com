import { colorVars, ColorProps } from '../colors';
import { EventProps } from '../events';
import styles from './Choice.module.scss';

type Option = { value: string; label: string };

type ChoiceProps = ColorProps &
    EventProps & {
        label: string;
        value: string;
        options: Option[];
        onChange: (value: string) => void;
        className?: string;
    };

// A row of buttons, one active — for the case a Toggle can't cover: three
// or more mutually exclusive options (like Frame's border type) rather
// than a binary on/off.
export function Choice({
    label,
    value,
    options,
    onChange,
    className,
    background,
    foreground,
    accent,
    onMouseEnter,
    onMouseLeave,
    onMouseOver,
    onClick,
}: ChoiceProps) {
    return (
        <div
            className={`${styles.choice} ${className ?? ''}`}
            style={colorVars({ background, foreground, accent })}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onMouseOver={onMouseOver}
            onClick={onClick}
        >
            <div className={styles.label}>{label}</div>
            <div className={styles.options}>
                {options.map((option) => (
                    <button
                        key={option.value}
                        type="button"
                        className={styles.option}
                        data-active={option.value === value}
                        onClick={() => onChange(option.value)}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
