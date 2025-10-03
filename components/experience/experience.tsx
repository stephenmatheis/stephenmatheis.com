import { Fragment } from 'react';
import experience from '@/data/experience';

export function Experience() {
    return (
        <>
            <h2>Experience</h2>
            <ul>
                {experience.map(({ company, roles }, index) => {
                    return (
                        <Fragment key={index}>
                            {roles.map(({ title, start, end }, index: number) => {
                                return (
                                    <li key={index}>
                                        <pre>
                                            {start}
                                            {end && <> - {end}</>}
                                            {'\t'}
                                            {title}, {company}
                                        </pre>
                                    </li>
                                );
                            })}
                        </Fragment>
                    );
                })}
            </ul>
        </>
    );
}
