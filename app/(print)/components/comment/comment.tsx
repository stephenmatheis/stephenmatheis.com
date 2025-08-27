import styles from './comment.module.scss';

export function Comment({ text, ...props }) {
    return (
        <h2 className={styles.comment} {...props}>
            {text}
        </h2>
    );
}
