import styles from './comment.module.scss';

export default function Comment({ text }) {
    const content = `// ${text}`;

    return (
        <div className={styles['comment']}>
            <span>{content}</span>
        </div>
    );
}
