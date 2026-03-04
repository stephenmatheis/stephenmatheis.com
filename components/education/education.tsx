import { Section } from '../section';
import styles from './education.module.scss';

export function Education() {
    return (
        <Section className={styles.education} heading="Education">
            <div className={styles.school}>
                <div className={styles.name}>Armstrong Atlantic State University</div>
                <div className={styles.major}>
                    <div className={styles.label}>Computer Science</div>
                    <div className={styles.years}>2006 - 2007</div>
                </div>
            </div>
        </Section>
    );
}
