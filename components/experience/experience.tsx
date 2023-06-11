import { Comment } from '@/components/comment';
import jobs from '@/data/jobs';
import styles from './experience.module.scss';

export function Experience({}) {
    return (
        <div className={styles['experience']}>
            <Comment text={'Experience'} />
            {jobs.map(
                ({ title, company, location, start, end, lines }, index) => {
                    return (
                        <div key={index} className={styles['job']}>
                            <div className={styles['title']}>
                                <span>{title}</span>
                                <span> </span>
                                <span className={styles['company']}>
                                    @ {company}
                                </span>
                            </div>
                            <div className={styles['date']}>
                                {/* <> */}
                                {/* {start} - {end} */}
                                {start}
                                {/* <span className={styles['location']}>
                                        {' '}
                                        • {location}
                                    </span> */}
                                {/* </> */}
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
                                                ❯
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
