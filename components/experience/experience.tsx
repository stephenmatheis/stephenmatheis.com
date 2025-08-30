import { Fragment } from 'react';
import { Heading } from '../heading';
import experience from '@/data/experience';
import styles from './experience.module.scss';

export function Experience() {
    return (
        <div className={styles.experience}>
            <Heading>04 Experience</Heading>
            <div className={styles.jobs}>
                {experience.map(({ company, location, roles, list }, index) => {
                    return (
                        <div key={index} className={styles.job}>
                            <div className={styles.roles}>
                                {roles!.map(({ title, start, end }, index: number) => {
                                    return (
                                        <div key={index} className={styles.role}>
                                            <span className={styles.title}>{title}</span>
                                            <span className={styles.date}>
                                                {start}
                                                {end && <> - {end}</>}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className={styles.className}>
                                {company}, {location}
                            </div>
                            {/* <p className={styles.details}>
                                {list?.map((line: string, i: number) => (
                                    <Fragment key={i}>{line}</Fragment>
                                ))}
                            </p> */}
                            <ul className={styles.list}>
                                {list?.map((line: string, i: number) => (
                                    <li key={i} className={styles.line}>
                                        {line}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
