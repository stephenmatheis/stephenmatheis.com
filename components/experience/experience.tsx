import { Comment } from '@/components/comment';
import experience from '@/data/experience';
import styles from './experience.module.scss';

export function Experience() {
    return (
        <section className={styles.experience}>
            <Comment text="Experience" />
            {experience.map(({ company, location, roles }, index) => {
                return (
                    <div key={index} className={styles.job}>
                        <div className={styles.roles}>
                            {roles.map(({ title, start, end, lines }, index) => {
                                return (
                                    <div key={index} className={styles.role}>
                                        <div className={styles.title}>
                                            <span>{title}</span> <span className={styles.company}>@ {company}</span>
                                        </div>
                                        <div className={styles.date}>
                                            {start} - {end}
                                            <span className={styles.location}> • {location}</span>
                                        </div>
                                        <div className={styles.lines}>
                                            {lines.map((line, index) => {
                                                return (
                                                    <span key={index} className={styles.line}>
                                                        <span className={styles.bullet}>*</span>
                                                        <span
                                                            dangerouslySetInnerHTML={{
                                                                __html: line,
                                                            }}
                                                        />
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </section>
    );
}
