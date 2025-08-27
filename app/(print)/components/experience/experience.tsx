import { Section } from '@/app/(print)/components/section';
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
                                {roles!.map(({ title, start, end }, index: number) => {
                                    return (
                                        <div key={index} className={styles.role}>
                                            <span className={styles.title}>
                                                <span className={styles.name}>{title}</span>

                                                {index === 0 && (
                                                    <>
                                                        {' | '}
                                                        <span className={styles.company}>{company}</span>
                                                    </>
                                                )}
                                            </span>
                                            <span className={styles.date}>
                                                {start}
                                                {end && <> – {end}</>}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                            <ul className={styles.list}>
                                {list!.map((line: string, i: number) => (
                                    <li key={i}>{line}</li>
                                ))}
                            </ul>
                            {/* <div className={styles.stack}>
                                {'['} {stack!.join(', ')} {']'}
                            </div> */}
                        </div>
                    );
                })}
            </div>
        </Section>
    );
}
