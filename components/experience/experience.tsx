import { Fragment } from 'react';
import experience from '@/data/experience';

export function Experience() {
    return (
        <>
            <h2>Experience</h2>
            <table>
                <tbody>
                    {experience.map(({ company, roles }, index) => {
                        return (
                            <Fragment key={index}>
                                {roles.map(({ title, start, end }, index: number) => {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                {start}
                                                {end && <> - {end}</>}
                                                {'    '}
                                            </td>
                                            <td>
                                                {title}, {company}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </Fragment>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}
