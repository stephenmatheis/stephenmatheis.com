import Type from '@/components/type';
import jobs from '@/data/jobs';
import styles from './experience.module.scss';

export default function Experience({ type, speed }) {
    return (
        <div className={styles['experience']}>
            <div className={styles['comment']}>
                {type ? <Type content={'// Experience'} speed={speed / 2} /> : <span>{'// Experience'}</span>}
            </div>
            {
                jobs.map(({ title, company, location, start, end, lines }, index) => {
                    return (
                        <div key={index} className={styles['job']}>
                            <div className={styles['title']}>
                                {type ? <Type content={title} speed={speed / 2} /> : <span>{title}</span>}
                                <span> </span>
                                {type ? <Type content={`@ ${company}`} speed={speed / 2} className={styles['company']} /> : <span className={styles['company']}>@ {company}</span>}
                            </div>
                            <div className={styles['date']}>
                                {
                                    type ?
                                        <>
                                            <Type content={`${start} - ${end} `} speed={speed / 2} className={styles['date']} />
                                            <Type content={'• '} speed={speed} className={styles['location']} />
                                            <Type content={location} speed={speed / 2} />
                                            <span></span>
                                        </> :
                                        <>
                                            {start} - {end}
                                            <span className={styles['location']}> • {location}</span>
                                        </>
                                }
                            </div>
                            <div className={styles['lines']}>
                                {lines.map((line, index) => {
                                    return (
                                        <span key={index} className={styles['line']}>
                                            <span style={{ marginRight: '6px' }} >❯</span>
                                            {
                                                type ?
                                                    <>
                                                        <Type content={line} speed={speed / 6} />
                                                    </> :
                                                    <>
                                                        <span dangerouslySetInnerHTML={{ __html: line }} />
                                                    </>
                                            }
                                        </span>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}