import { Section } from '@/components/section';
import experience from '@/data/experience';
import styles from './experience.module.scss';

export function Experience() {
    return (
        <Section className={styles.experience} heading="Experience">
            <div className={styles.jobs}>
                {experience.map(({ company, location, roles, list }, index) => {
                    return (
                        <div key={index} className={styles.job}>
                            <div className={styles.company}>
                                <span className={styles.name}>{company}</span>{' '}
                                <span className={styles.location}>{location}</span>
                            </div>
                            <div className={styles.roles}>
                                {roles!.map(({ title, start, end }, index: number) => {
                                    return (
                                        <div key={index} className={styles.role}>
                                            <span className={styles.title}>{title}</span>{' '}
                                            <span className={styles.date}>
                                                {start}
                                                {end && <>—{end}</>}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                            <ul className={styles.list}>
                                {list!.map((line: string, i: number) => (
                                    <li key={i} className={styles.line}>
                                        {line}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>
        </Section>
    );
}
