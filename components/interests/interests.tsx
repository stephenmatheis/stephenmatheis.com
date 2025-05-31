import { Comment } from '@/components/comment';
import interests from '@/data/interests';
import styles from './interests.module.scss';

type InterestsProps = {};

export function Interests({}: InterestsProps) {
    return (
        <div className={styles.interests}>
            <Comment text="Interests" />
            <div className={styles.items}>{interests.join(', ')}</div>
        </div>
    );
}
