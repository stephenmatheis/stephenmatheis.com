import styles from './heading.module.scss';

export function Heading({ children, ...props }) {
    return (
        <h2 className={styles.heading} {...props}>
            {children}
        </h2>
    );
}
