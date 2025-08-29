import { Section } from '../section';
import styles from './education.module.scss';

export function Education() {
    return (
        <Section className={styles.education} heading="05 Education">
            <div className={styles.schools}>
                <div className={styles.school}>
                    <div className={styles.name}>Armstrong Atlantic State University</div>
                    <div className={styles.major}>Computer Science</div>
                    <div className={styles.dates}>Attended 2006—2008</div>
                </div>
                <div className={styles.school}>
                    <div className={styles.name}>Liberty County High School</div>
                    <div className={styles.major}>Dual Seal College Preparatory</div>
                    <div className={styles.dates}>Graduated 2006</div>
                </div>
            </div>
        </Section>
    );
}
