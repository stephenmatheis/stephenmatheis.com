import styles from './Syntax.module.scss';

export function Syntax({ children, muted }: { children: React.ReactNode; muted?: boolean }) {
    return (
        <span aria-hidden="true" className={`${styles.syntax}${muted ? ` muted` : ''}`}>
            {children}
        </span>
    );
}
