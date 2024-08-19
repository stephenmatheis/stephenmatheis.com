import { Section } from '@/components/section';
import jobs from '@/data/jobs';
import styles from './experience.module.scss';

export function Experience() {
    return (
        <Section className={styles.experience} heading="Experience">
            {jobs.map(
                (
                    { title, company, location, start, end, lines, titles },
                    index
                ) => {
                    return (
                        <div key={index} className={styles['job']}>
                            {lines && (
                                <>
                                    <div className={styles['title']}>
                                        <span>{title}</span>{' '}
                                        <span className={styles['company']}>
                                            @ {company}
                                        </span>
                                    </div>
                                    <div className={styles['date']}>
                                        {start} - {end}
                                        <span className={styles['location']}>
                                            {' '}
                                            • {location}
                                        </span>
                                    </div>
                                    <div className={styles['lines']}>
                                        {lines.map((line, index) => {
                                            return (
                                                <span
                                                    key={index}
                                                    className={styles['line']}
                                                >
                                                    <span
                                                        style={{
                                                            marginRight: '6px',
                                                            color: 'var(--muted)',
                                                        }}
                                                    >
                                                        {'*'}
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
                                </>
                            )}
                            {titles && (
                                <>
                                    <div className={styles['title']}>
                                        <span>{company}</span>
                                    </div>
                                    <div className={styles.positions}>
                                        {titles?.map(
                                            ({
                                                title,
                                                location,
                                                start,
                                                end,
                                                lines,
                                            }) => {
                                                return (
                                                    <div
                                                        key={title}
                                                        className={
                                                            styles.position
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                styles['title']
                                                            }
                                                        >
                                                            <span>{title}</span>
                                                        </div>
                                                        <div
                                                            className={
                                                                styles['date']
                                                            }
                                                        >
                                                            {start} - {end}
                                                            <span
                                                                className={
                                                                    styles[
                                                                        'location'
                                                                    ]
                                                                }
                                                            >
                                                                {' '}
                                                                • {location}
                                                            </span>
                                                        </div>
                                                        <div
                                                            className={
                                                                styles['lines']
                                                            }
                                                        >
                                                            {lines.map(
                                                                (
                                                                    line,
                                                                    index
                                                                ) => {
                                                                    return (
                                                                        <span
                                                                            key={
                                                                                index
                                                                            }
                                                                            className={
                                                                                styles[
                                                                                    'line'
                                                                                ]
                                                                            }
                                                                        >
                                                                            <span
                                                                                style={{
                                                                                    marginRight:
                                                                                        '6px',
                                                                                    color: 'var(--muted)',
                                                                                }}
                                                                            >
                                                                                {
                                                                                    '*'
                                                                                }
                                                                            </span>
                                                                            <span
                                                                                dangerouslySetInnerHTML={{
                                                                                    __html: line,
                                                                                }}
                                                                            />
                                                                        </span>
                                                                    );
                                                                }
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    );
                }
            )}
        </Section>
    );
}
