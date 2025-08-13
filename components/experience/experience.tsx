import { Section } from '@/components/section';
import experience from '@/data/experience';
import styles from './experience.module.scss';

export function Experience() {
    return (
        <Section className={styles.experience} heading="Experience">
            <div className={styles.jobs}>
                {experience.map(({ company, location, start, end, roles, stack, list }, index) => {
                    if (company === 'Break') {
                        return (
                            <div key={index} className={styles.job}>
                                <div className={styles.company}>
                                    <span className={styles.name}>{company}</span>
                                    <span className={styles.dots}>{Array.from({ length: 32 }).join('.')}</span>
                                    <span className={styles.date}>
                                        {start} – {end}
                                    </span>
                                </div>
                            </div>
                        );
                    }

                    return (
                        <div key={index} className={styles.job}>
                            <div className={styles.company}>
                                <span className={styles.name}>{company}</span>
                                <span className={styles.dots}>
                                    {Array.from({ length: 57 - company.length - location!.length - 1 }).join('.')}
                                </span>
                                <span className={styles.location}>{location}</span>
                            </div>
                            <div className={styles.roles}>
                                {roles!.map(({ title, start, end }, index: number) => {
                                    return (
                                        <div key={index} className={styles.role}>
                                            <div className={styles.details}>
                                                <span className={styles.title}>{title}</span>{' '}
                                                <span className={styles.date}>
                                                    {start} – {end}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className={styles.list}>
                                {list!.map((line: string, i: number) => (
                                    <div key={i} className={styles.line}>
                                        - {line}
                                    </div>
                                ))}
                            </div>
                            <div className={styles.stack}>
                                {'</>'} {stack!.join(', ')}
                            </div>
                        </div>
                    );
                })}
            </div>
        </Section>
    );
}
