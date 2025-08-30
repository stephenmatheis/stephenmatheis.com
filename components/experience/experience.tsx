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
                            <div className={styles.details}>
                                <div className={styles.roles}>
                                    {roles!.map(({ title, start, end }, index: number) => {
                                        return (
                                            <div key={index} className={styles.role}>
                                                <span>
                                                    <span className={styles.title}>{title}</span>{' '}
                                                    {index === 0 && (
                                                        <>
                                                            <span className={styles.name}>at {company}</span>
                                                            <span className={styles.name}> in {location}</span>
                                                        </>
                                                    )}
                                                </span>
                                                <span className={styles.date}>
                                                    {start}
                                                    {end && <> - {end}</>}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                                <ul className={styles.list}>
                                    {list!.map((line: string, i: number) => (
                                        <li key={i} className={styles.line}>
                                            {line}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
