import styles from './heading.module.scss';

export function Heading({ text }: { text: string }) {
    return <h2 className={styles.heading}>{text}</h2>;
}
