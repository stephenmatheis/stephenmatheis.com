import { usePage } from '@/providers/page-provider';
import { Section } from '@/components/section';
import experience from '@/data/experience';
import styles from './experience.module.scss';

export function Experience() {
    const { page } = usePage();

    return (
        <Section className={styles.experience} heading="Experience" data-page={page}>
            <div className={styles.jobs}>
                {experience.map(({ company, location, start, end, roles, stack, list }, index) => {
                    if (company === 'Break') {
                        return (
                            <div key={index} className={styles.break}>
                                <span className={styles.name}>{company}</span>
                                <span className={styles.dots}>
                                    {Array.from({ length: 44 }).map((_, i) => (
                                        <div key={i} className={styles.dot} />
                                    ))}
                                </span>
                                <span className={styles.date}>
                                    {start}
                                    {end && <>—{end}</>}
                                </span>
                            </div>
                        );
                    }

                    return (
                        <div key={index} className={styles.job}>
                            <div className={styles.company}>
                                <span className={styles.name}>{company}</span>
                                <span className={styles.dots}>
                                    {Array.from({ length: 70 - company.length - location!.length - 2 }).map((_, i) => (
                                        <div key={i} className={styles.dot} />
                                    ))}
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
                                                    {start}
                                                    {end && <>-{end}</>}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className={styles.list}>
                                {list!.map((line: string, i: number) => (
                                    <div key={i} className={styles.line}>
                                        {'•'} {line}
                                        {/* {'╶╴'} {line} */}
                                    </div>
                                ))}
                            </div>
                            <div className={styles.stack}>
                                {'{'} {stack!.join(', ')} {'}'}
                            </div>
                        </div>
                    );
                })}
            </div>
        </Section>
    );
}
