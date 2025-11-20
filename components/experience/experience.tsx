import { Section } from '@/components/section';
import experience from '@/data/experience';
import styles from './experience.module.scss';

export function Experience() {
    return (
        <Section className={styles.experience} heading="Experience">
            <div className={styles.jobs}>
                {experience.map(({ company, title, start, end, list }, index) => {
                    return (
                        <div key={index} className={styles.job}>
                            <h4 key={index} className={styles.role}>
                                <span className={styles.title}>
                                    <span>{title}</span> at {company}
                                </span>
                                <span className={styles.date}>
                                    {start}
                                    {end && <> - {end}</>}
                                </span>
                            </h4>
                            <ul>
                                {list.map((item, index) => {
                                    return <div key={index} dangerouslySetInnerHTML={{ __html: item }} />;
                                })}
                            </ul>
                        </div>
                    );
                })}
            </div>
        </Section>
    );
}
