import { UpdatePrompts } from '@/components/update-prompts';
import { Indicator } from '@/components/indicator';
import { Comment } from '@/components/comment';
import jobs from '@/data/jobs';
import styles from './experience.module.scss';

export function Experience() {
    return (
        <div className={styles['experience']}>
            <UpdatePrompts
                prompts={[
                    {
                        label: 'Experience',
                        type: 'content',
                    },
                    ...jobs.map(({ title, company, start }) => {
                        return {
                            label: `${title} @ ${company} ${start}`,
                            type: 'job',
                        };
                    }),
                ]}
            />
            <Indicator label={'Experience'} />
            <Comment text={'Experience'} />
            {jobs.map(
                ({ title, company, location, start, end, lines }, index) => {
                    return (
                        <div key={index} className={styles['job']}>
                            <div className={styles['title']}>
                                <Indicator
                                    label={`${title} @ ${company} ${start}`}
                                />
                                <span>{title}</span>
                                <span> </span>
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
                                                style={{ marginRight: '6px' }}
                                            >
                                                {/* ❯ */}
                                                {/* {'>'} */}
                                                {'·'}
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
                }
            )}
        </div>
    );
}
