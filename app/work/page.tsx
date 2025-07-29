import { Viewport } from '@/components/viewport';
import styles from './page.module.scss';
import { Comment } from '@/components/comment';

export default function WorkPage() {
    return (
        <Viewport>
            <div className={styles.content}>
                <Comment text="Work" />
            </div>
        </Viewport>
    );
}
