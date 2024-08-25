import { Section } from '@/components/section';
import jobs from '@/data/jobs';
import styles from './experience.module.scss';

export function Experience() {
    return (
        <Section className={styles.experience} heading="Experience">
            {jobs.map(({ company, location, roles, lines }, index) => {
                return (
                    <div key={index} className={styles.job}>
                        <div className={styles.roles}>
                            {roles.map(({ title, start, end }, index) => {
                                return (
                                    <div key={index} className={styles.role}>
                                        <div className={styles.title}>
                                            <span>{title}</span>{' '}
                                            {index === 0 && (
                                                <span
                                                    className={styles.company}
                                                >
                                                    @ {company}
                                                </span>
                                            )}
                                        </div>
                                        <div className={styles.date}>
                                            {start} - {end}
                                            <span className={styles.location}>
                                                {' '}
                                                • {location}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className={styles.lines}>
                            {lines.map((line, index) => {
                                return (
                                    <span key={index} className={styles.line}>
                                        <span
                                            style={{
                                                marginRight: '6px',
                                                color: 'var(--muted)',
                                            }}
                                        >
                                            {'•'}
                                        </span>
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
        </Section>
    );
}
