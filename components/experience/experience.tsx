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
                        <Fragment key={index}>
                            {roles!.map(({ title, start, end, list }, index: number) => {
                                return (
                                    <Fragment key={index}>
                                        <div className={styles.date}>
                                            {start} - {end || 'Now'}
                                        </div>
                                        <div className={styles.company}>
                                            {company} ({location})
                                        </div>
                                        <div className={styles.title}>{title}</div>
                                        <div className={styles.info}>{list?.join(' ')}</div>
                                    </Fragment>
                                );
                            })}
                        </Fragment>
                    );
                })}
            </div>
        </div>
    );
}
