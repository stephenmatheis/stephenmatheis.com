import { Section } from '@/components/section';
import experience from '@/data/experience';
import styles from './experience.module.scss';

export function Experience() {
    return (
        <Section className={styles.experience} heading="Experience">
            <div className={styles.jobs}>
                {experience.map(({ company, site, roles, list }, index) => {
                    return (
                        <div key={index} className={styles.job}>
                            <div className={styles.company}>
                                {site ? (
                                    <a href={site}>
                                        [<span>{company}</span>]({site.replace('https://', '')})
                                    </a>
                                ) : (
                                    <>{company}</>
                                )}
                            </div>
                            <div className={styles.roles}>
                                {roles.map(({ title, start, end }, index: number) => {
                                    return (
                                        <div key={index} className={styles.role}>
                                            <div className={styles.title}>{title}</div>
                                            <div className={styles.date}>
                                                {start} - {end}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <ul className={styles.list}>
                                {list!.map((line: string, i: number) => (
                                    <li
                                        key={i}
                                        className={styles.line}
                                        dangerouslySetInnerHTML={{ __html: `- ${line}` }}
                                    />
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>
        </Section>
    );
}
