import { Section } from '@/components/section';
import experience from '@/data/experience';
import styles from './experience.module.scss';

export function Experience() {
    return (
        <Section className={styles.experience} heading="Experience">
            <div className={styles.jobs}>
                {experience.map(({ company, site, stack, roles, list }, index) => {
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
                            <div className={styles.roles}>
                                {roles.map(({ title, start, end }, index: number) => {
                                    return (
                                        <div key={index} className={styles.role}>
                                            <div className={styles.title}>
                                                <span>{title}</span>{' '}
                                                {index === 0 && (
                                                    // <a href={site} target="_blank" className={styles.company}>
                                                    //     @ {company}
                                                    // </a>
                                                    <span className={styles.company}>@ {company}</span>
                                                )}
                                            </div>
                                            <div className={styles.date}>
                                                {start}–{end}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <ul className={styles.list}>
                                {list?.map((item: string | React.ReactNode, index: number) => {
                                    return (
                                        <li key={index} className={styles.item}>
                                            <span>{item}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                            <div className={styles.stack}>
                                {'› '}
                                {stack?.join(', ')}
                            </div>
                        </div>
                    );
                })}
            </div>
        </Section>
    );
}
