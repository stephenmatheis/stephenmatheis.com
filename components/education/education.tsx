import { Comment } from '@/components/comment';
import education from '@/data/education';
import styles from './education.module.scss';

export function Education() {
    return (
        <div className={styles['education']}>
            <Comment text="Education" />
            <div className={styles['schools-ctr']}>
                {education.map(({ school, degree }, index) => {
                    return (
                        <div key={index} className={styles.school}>
                            <div className={styles['name']}>{school}</div>
                            <div>{degree}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
