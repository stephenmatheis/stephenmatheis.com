import type { Metadata } from 'next';
import Image from 'next/image';
import jobs from '@/data/jobs';
import me from 'public/me.png';
import styles from './page.module.scss';

export const metadata: Metadata = {
    title: 'Resume',
    description: `Resume.`,
};

export default function ResumePage() {
    return (
        <main className={styles.page}>
            <div className={styles.header}>
                <div className={styles.photo}>
                    <Image src={me} alt="Me" width={420 / 4} priority />
                </div>
                <div className={styles.text}>
                    <h1 className={styles.name}>Stephen Matheis</h1>
                    <div className={styles.title}>
                        Software Engineer in Washington, D.C.
                    </div>
                    <a
                        className={styles.portfolio}
                        href="github.com/stephenmatheis"
                        target="_blank"
                    >
                        github.com/stephenmatheis
                    </a>
                </div>
            </div>
            <div className={styles.section}>
                <h2>About</h2>
                <div>Lorem ipsum dolor sit amet.</div>
            </div>
            <div className={styles.section}>
                <h2 className={styles.heading}>Team</h2>
                <div className={styles.block}>
                    <div className={styles.date}>
                        <span>Current</span>
                    </div>
                    <div className={styles.text}>
                        <a href="https://tatcs.com" target="_blank">
                            <div className={styles.logo}>
                                <svg
                                    width="80"
                                    height="80"
                                    viewBox="0 0 80 80"
                                    fill="none"
                                >
                                    <path
                                        d="M0 12.4C0 11.2954 0.895431 10.4 2 10.4H69.6L42.4 37.6L17.6 62.4V46.8C17.6 45.6954 16.7046 44.8 15.6 44.8H2C0.895432 44.8 0 43.9046 0 42.8V12.4Z"
                                        fill="#FF6C00"
                                    />
                                    <path
                                        d="M76.5858 3.41421C77.8457 2.15428 80 3.04662 80 4.82843V78C80 79.1046 79.1046 80 78 80H69.6H4.82842C3.04661 80 2.15428 77.8457 3.41421 76.5858L17.6 62.4V69.2C17.6 70.3046 18.4954 71.2 19.6 71.2H50C51.1046 71.2 52 70.3046 52 69.2V46.8C52 45.6954 52.8954 44.8 54 44.8H67.6C68.7046 44.8 69.6 43.9046 69.6 42.8V10.4L76.5858 3.41421Z"
                                        fill="#FF6C00"
                                    />
                                </svg>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <div className={styles.section}>
                <h2 className={styles.heading}>Work Experience</h2>
                {jobs.map(
                    (
                        { title, company, location, start, end, lines },
                        index
                    ) => {
                        return (
                            <div key={index} className={styles.block}>
                                <div className={styles.date}>
                                    <span>
                                        {start} - {end}
                                    </span>
                                </div>
                                <div className={styles.text}>
                                    <div className={styles.title}>
                                        {title} @ {company}
                                    </div>
                                    <div className={styles.location}>
                                        {location}
                                    </div>
                                    <div className={styles.description}>
                                        {lines.join(' * ')}
                                    </div>
                                </div>
                            </div>
                        );
                    }
                )}
            </div>
        </main>
    );
}
