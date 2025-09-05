import { Section } from '@/components/section';
import experience from '@/data/experience';
import styles from './experience.module.scss';

export function Experience() {
    return (
        <Section className={styles.experience} heading="Experience">
            <div className={styles.jobs}>
                {experience.map(({ company, location, roles, stack, list }, index) => {
                    return (
                        <div key={index} className={styles.job}>
                            <div className={styles.roles}>
                                {roles.map(({ title, start, end }, index: number) => {
                                    return (
                                        <div key={index} className={styles.role}>
                                            <div className={styles.heading}>
                                                <span className={styles.title}>{title}</span>
                                                {index === 0 && <span className={styles.company}> at {company}</span>}
                                            </div>
                                            <span className={styles.date}>
                                                {start}
                                                {end && <> - {end}</>}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                            <ul className={styles.list}>
                                {list!.map((line: string, i: number) => (
                                    <li key={i} className={styles.line}>
                                        ◆ {line}
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
