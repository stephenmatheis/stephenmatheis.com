import { Section } from '@/components/section';
import experience from '@/data/experience';
import styles from './experience.module.scss';

export function Experience() {
    return (
        <Section className={styles.experience} heading="Experience">
            <div className={styles.jobs}>
                {experience.map(({ company, stack, roles }, index) => {
                    if (company === 'Break') {
                        return (
                            <div key={index} className={styles.job}>
                                Break{' '}
                                {roles.map(({ start, end }, index: number) => {
                                    return (
                                        <span key={index} className={styles.role}>
                                            <span className={styles.date}>
                                                {start}–{end}
                                            </span>
                                        </span>
                                    );
                                })}
                            </div>
                        );
                    }

                    return (
                        <div key={index} className={styles.job}>
                            <div className={styles.company}>{company}</div>
                            <div className={styles.roles}>
                                {roles.map(({ title, start, end }, index: number) => {
                                    return (
                                        <div key={index} className={styles.role}>
                                            <span className={styles.title}>{title}</span>{' '}
                                            <span className={styles.date}>
                                                {start} – {end}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className={styles.stack}>{stack?.join(', ')}</div>
                        </div>
                    );
                })}
            </div>
        </Section>
    );
}
