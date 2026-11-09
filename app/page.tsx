const work = [
    {
        start: '2026',
        end: 'Now',
        company: 'Apple',
        title: 'Front-End Software Engineer',
    },
    // {
    //     start: '2025',
    //     end: '2026',
    //     company: 'NEXTDOTGOV',
    //     title: 'Freelance Software Engineer',
    // },
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
    // {
    //     start: '2014',
    //     end: '2016',
    //     company: 'Bravo Consulting Group',
    //     title: 'Senior Consultant',
    // },
    // {
    //     start: '2011',
    //     end: '2014',
    //     company: 'AIT',
    //     title: 'Access Control Specialist',
    // },
];

const updated = new Date().toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'America/Chicago',
});

function Syntax({ children }: { children: React.ReactNode }) {
    return <span aria-hidden="true">{children}</span>;
}

export default function Home() {
    return (
        <>
            <header>
                <h1>
                    Stephen Matheis <span className="spinner" aria-hidden="true"></span>
                </h1>
                <p>Front-End Software Engineer</p>
                <p>Apple</p>
            </header>
            <main>
                <section>
                    <h2>
                        <Syntax># </Syntax>
                        <strong>About Me</strong>
                    </h2>
                    <p>I live and work in Austin, TX. I like old motorcycles, hot cheeseburgers, and cold ales.</p>
                </section>
                <section>
                    <h2>
                        <Syntax>## </Syntax>
                        <strong>Contact</strong>
                    </h2>
                    <p>
                        <Syntax>[email](</Syntax>
                        <a href="mailto:stephen@matheis.email">
                            <Syntax>mailto:</Syntax>stephen@matheis.email
                        </a>
                        <Syntax>)</Syntax>
                    </p>
                    <p>
                        <Syntax>[@stephenmatheis](</Syntax>
                        <a href="https://github.com/stephenmatheis">
                            <Syntax>https://</Syntax>github.com/stephenmatheis
                        </a>
                        <Syntax>)</Syntax>
                    </p>
                </section>
                <section>
                    <h2>
                        <Syntax>## </Syntax>
                        <strong>Work</strong>
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
            </main>
            <footer>
                <p>
                    <strong>v43</strong> <Syntax>//</Syntax> updated {updated}
                </p>
            </footer>
        </>
    );
}
