/* eslint-disable react/no-unescaped-entities */
import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import me from '@/public/images/icon-400.webp';
import jobs from '@/data/jobs';
import projects from '@/data/projects';
import contact from '@/data/contact';
import styles from './page.module.scss';

function Arrow() {
    return (
        <span className={styles.icon}>
            &#xFEFF;
            <svg width="12" height="12" viewBox="0 0 12 12">
                <path d="M3.5 3C3.22386 3 3 3.22386 3 3.5C3 3.77614 3.22386 4 3.5 4V3ZM8.5 3.5H9C9 3.22386 8.77614 3 8.5 3V3.5ZM8 8.5C8 8.77614 8.22386 9 8.5 9C8.77614 9 9 8.77614 9 8.5H8ZM2.64645 8.64645C2.45118 8.84171 2.45118 9.15829 2.64645 9.35355C2.84171 9.54882 3.15829 9.54882 3.35355 9.35355L2.64645 8.64645ZM3.5 4H8.5V3H3.5V4ZM8 3.5V8.5H9V3.5H8ZM8.14645 3.14645L2.64645 8.64645L3.35355 9.35355L8.85355 3.85355L8.14645 3.14645Z" />
            </svg>
        </span>
    );
}

export default function ResumePage() {
    return (
        <div className={styles.resume}>
            {/* Header */}
            <div className={styles.header}>
                {/* Avatar */}
                <Link href="/">
                    <div className={styles.avatar}>
                        <Image src={me} alt="My memoji" priority />
                    </div>
                </Link>
                {/* Text */}
                <div className={styles.text}>
                    <h1 className={styles.name}>Stephen Matheis</h1>
                    <div className={styles.role}>
                        Director, Customer Experience at TATCS in Washington,
                        D.C.
                    </div>
                    {/* <div className={styles.pronouns}>They/Them</div> */}
                    <Link
                        className={styles.site}
                        href="https://github.com/stephenmatheis"
                        target="_blank"
                    >
                        github.com/stephenmatheis
                    </Link>
                </div>
            </div>

            {/* About */}
            <div className={styles.about}>
                <h2>About</h2>
                <p>
                    Hello there! My name is Stephen Matheis, and I'm the
                    Director of Customer Experience at <span>T and T</span>{' '}
                    Consulting Services in Washington, D.C. While the title may
                    sound impressive, I'm just a programmer day-to-day. I
                    wouldn't want it any other way.
                </p>
                <p>I'm grateful to make a living doing what I love.</p>
            </div>

            {/* Experience */}
            <div className={styles.experience}>
                <h2>Work Experience</h2>
                <div className={styles.list}>
                    {jobs.map((job, index) => {
                        return (
                            <Fragment key={index}>
                                {job.roles.map((role, index) => {
                                    const start = role.start.split(' ').at(-1);
                                    const end = role.end.split(' ').at(-1);

                                    return (
                                        <div key={index} className={styles.job}>
                                            <div className={styles.dates}>
                                                {start} -{' '}
                                                {end === 'Present'
                                                    ? 'Now'
                                                    : end}
                                            </div>
                                            <div
                                                key={index}
                                                className={styles.role}
                                            >
                                                <div className={styles.name}>
                                                    <Link href={job.site}>
                                                        {' '}
                                                        {role.title} at{' '}
                                                        {job.companyShort ||
                                                            job.company}
                                                    </Link>
                                                    <Arrow />
                                                </div>
                                                <div
                                                    className={styles.location}
                                                >
                                                    {job.location}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </Fragment>
                        );
                    })}
                </div>
            </div>

            {/* Projects */}
            <div className={styles.projects}>
                <h2>Projects</h2>
                <div className={styles.list}>
                    {projects.map((project, index) => {
                        return (
                            <div key={index} className={styles.project}>
                                <div className={styles.dates}>
                                    {project.date}
                                </div>
                                <div key={index} className={styles.info}>
                                    <div className={styles.name}>
                                        <Link href={project.link}>
                                            {project.name}
                                        </Link>
                                        <Arrow />
                                    </div>
                                    <div className={styles.description}>
                                        {project.description}
                                    </div>
                                    <div className={styles.img}>
                                        <Link
                                            href={project.link}
                                            target="_blank"
                                        >
                                            <Image
                                                src={project.image}
                                                width={160}
                                                height={90}
                                                alt={project.description}
                                            />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Contact */}
            <div className={styles.contacts}>
                <h2>Contact</h2>
                <div className={styles.list}>
                    {contact.map((item, index) => {
                        return (
                            <div key={index} className={styles.item}>
                                <div className={styles.name}>{item.name}</div>
                                <div className={styles.text}>
                                    <Link href={item.href}>
                                        {item.user || item.text}
                                    </Link>
                                    <Arrow />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Download */}
            <Link
                href="/resume.pdf"
                aria-label="My resume"
                target="_blank"
                className={styles.download}
            >
                <svg
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    className={styles.mobile}
                >
                    <path
                        fillRule="evenodd"
                        d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"
                    />
                </svg>
            </Link>

            {/* Toolbar */}
            <nav className={styles.toolbar}>
                <ul>
                    <li>
                        <Link href="/">
                            <svg
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                            >
                                <path d="M10 12.796V3.204L4.519 8zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753" />
                            </svg>
                        </Link>
                    </li>
                    <li>
                        <Link href="/links">
                            <svg
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                            >
                                <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z" />
                                <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z" />
                            </svg>
                        </Link>
                    </li>
                    <li>
                        <Link href="/resume.pdf">
                            <svg
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                            >
                                <path d="M5 4a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5M5 8a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1z" />
                                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1" />
                            </svg>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
