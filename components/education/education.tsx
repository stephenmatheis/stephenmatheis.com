import { Heading } from '@/components/heading';
import styles from './education.module.scss';

export function Education() {
    return (
        <div className={styles.education}>
            <Heading>05 Education</Heading>
            <div className={styles.schools}>
                <div className={styles.school}>
                    <div className={styles.name}>Armstrong Atlantic State University</div>
                    <div className={styles.major}>Computer Science</div>
                    <div className={styles.dates}>Attended 2006—2008</div>
                </div>
            </div>
        </div>
    );
}
