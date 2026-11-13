import { Syntax } from '@/app/components/Syntax';
import styles from './Work.module.scss';

const work = [
    {
        start: '2026',
        end: 'Now',
        company: 'Apple',
        title: 'Front-End Software Engineer',
    },
    {
        start: '2025',
        end: '2026',
        company: 'NEXTDOTGOV',
        title: 'Freelance Software Engineer',
    },
    {
        start: '2023',
        end: '2025',
        company: 'TATCS',
        title: 'Director of User Experience',
    },
    {
        start: '2022',
        end: '2023',
        company: 'Apple',
        title: 'Front-End Developer',
    },
    {
        start: '2022',
        end: '2022',
        company: 'GovCIO',
        title: 'Software Engineer',
    },
    {
        start: '2021',
        end: '2022',
        company: 'Aeyon',
        title: 'Senior Software Engineer',
    },
    {
        start: '2018',
        end: '2021',
        company: 'TATCS',
        title: 'Senior SharePoint Developer',
    },
    {
        start: '2016',
        end: '2017',
        company: 'HID Global',
        title: 'Systems Programmer 3',
    },
    {
        start: '2014',
        end: '2016',
        company: 'Bravo Consulting Group',
        title: 'Senior Consultant',
    },
    {
        start: '2011',
        end: '2014',
        company: 'AIT',
        title: 'Access Control Specialist',
    },
];

export function Work() {
    return (
        <section className={styles.work}>
            <h2>
                <Syntax>## </Syntax>
                Work
            </h2>
            <ul className="grid">
                {work.map((job, index) => (
                    <li key={index}>
                        <div>{job.title}</div>
                        <div>{job.company}</div>
                        <div>
                            {job.start}–{job.end}
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}
