import { Fragment } from 'react';
import Experience from '@/markdown/experience.mdx';
import styles from './about.module.scss';

import experience from '@/data/experience';

export function About() {
    return (
        <div className={styles.about}>
            <Experience />
            <p>In June of 2025 I founded NEXTdotgov, a web consultancy for government, in Washington, D.C.</p>
            {experience.map(({ company, location, roles }, index) => {
                return (
                    <p key={index}>
                        {roles.map(({ title, start, end, list }, index: number) => {
                            return (
                                <Fragment key={index}>
                                    From {start} to {end}, I worked at <span className={styles.company}>{company}</span>{' '}
                                    {location || ''} as <span className={styles.title}>{title}</span>. {list?.join(' ')}{' '}
                                    {index !== 0 ? <> </> : ''}
                                </Fragment>
                            );
                        })}
                    </p>
                );
            })}
        </div>
    );
}
