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
                                            {index === 0 && <div className={styles.company}>{company}</div>}
                                            <div className={styles.title}>{title}</div>
                                            {index === 0 && <div className={styles.location}> ({location})</div>}
                                        </div>
                                        <div className={styles.list}>{list?.join(' ')}</div>
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
