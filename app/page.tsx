import jobs from '@/data/jobs';
import contact from '@/data/contact';
import styles from './page.module.scss';

export default function ResumePage() {
    return (
        <div className={styles.page}>
            {/* Header */}
            <header>
                <h1>Stephen Matheis</h1>
                <p>
                    Director, Customer Experience at TATCS in Washington, D.C.
                </p>
                <p>
                    <a href="https://github.com/stephenmatheis" target="_blank">
                        GitHub
                    </a>
                </p>
            </header>
            <main>
                {/* Experience */}
                <section>
                    <h2>Work Experience</h2>
                    {jobs.map((job, index) => (
                        <ul key={index}>
                            {job.roles.map((role, index) => (
                                <li key={index}>
                                    <span>
                                        {role.start} - {role.end}
                                    </span>
                                    <span>
                                        {role.title} at{' '}
                                        {job.companyShort || job.company}
                                    </span>
                                    <span>{job.location}</span>
                                </li>
                            ))}
                        </ul>
                    ))}
                </section>

                {/* Contact */}
                <section>
                    <h2>Contact</h2>
                    {contact.map((item, index) => (
                        <ul key={index}>
                            <span>{item.name}</span>
                            <span>
                                <a href={item.href}>{item.user || item.text}</a>
                            </span>
                        </ul>
                    ))}
                </section>
            </main>

            {/* Download */}
            <footer>
                <a href="/resume.pdf" target="_blank">
                    Download Resume
                </a>
            </footer>
        </div>
    );
}
