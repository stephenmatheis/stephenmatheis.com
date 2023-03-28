import Type from '@/components/type';
import styles from './comment.module.scss';

export default function Comment({ text, type, speed }) {
    const content = `// ${text}`;

    return (
        <div className={styles['comment']}>
            {type ? <Type content={content} speed={speed / 2} /> : <span>{content}</span>}
        </div>
    );
}