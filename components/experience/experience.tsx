import { Heading } from '../heading';
import experience from '@/data/experience';
import styles from './experience.module.scss';
import { Fragment } from 'react';

export function Experience() {
    return (
        <div className={styles.experience}>
            <Heading>Experience</Heading>
            <div className={styles.jobs}>
                {experience.map(({ company, location, roles }, index) => {
                    return (
                        <div key={index} className={styles.job}>
                            {roles!.map(({ title, start, end, list }, index: number) => {
                                return (
                                    <div key={index} className={styles.role}>
                                        <div className={styles.date}>
                                            {start} - {end || 'Now'}
                                        </div>
                                        <div className={styles.info}>
                                            <div className={styles.details}>
                                                <span className={styles.title}>{title}</span>
                                                {index === 0 && <span className={styles.company}> at {company}</span>}
                                                {index === 0 && (
                                                    <span className={styles.location}>
                                                        {' '}
                                                        {location === 'Remote' ? '(Remote)' : ` in ${location}`}
                                                    </span>
                                                )}
                                            </div>
                                            <div className={styles.list}>{list?.join(' ')}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
