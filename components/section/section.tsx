import { Comment } from '@/components/comment';
import styles from './section.module.scss';

export function Section({ className = '', heading, children }) {
    return (
        <section
            className={[styles['section'], className]
                .filter((x) => x)
                .join(' ')}
            id={heading.toLowerCase()}
        >
            <Comment text={heading} />
            {children}
        </section>
    );
}
