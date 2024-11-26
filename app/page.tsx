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
                    <Link
                        className={styles.site}
                        href="https://github.com/stephenmatheis"
                        target="_blank"
                    >
                        github.com/stephenmatheis
                    </Link>
                </div>
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
                                                    <Link
                                                        href={job.site}
                                                        target="_blank"
                                                    >
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
                                    <div
                                        className={styles.description}
                                        dangerouslySetInnerHTML={{
                                            __html: project.description,
                                        }}
                                    />
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
            <div className={styles.toolbar}>
                <Link
                    href="/resume.pdf"
                    aria-label="My resume"
                    target="_blank"
                    className={styles.download}
                >
                    {/* ↓ */}
                    Download
                </Link>
            </div>
        </div>
    );
}
