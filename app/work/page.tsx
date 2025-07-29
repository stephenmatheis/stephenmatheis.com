import { Viewport } from '@/components/viewport';
import { Comment } from '@/components/comment';
import styles from './page.module.scss';

export default function WorkPage() {
    return (
        <Viewport>
            <div className={styles.content}>
                <Comment text="Work" />
            </div>
        </Viewport>
    );
}
