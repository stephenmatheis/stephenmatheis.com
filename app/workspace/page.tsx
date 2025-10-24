import { Fragment } from 'react';
import experience from '@/data/experience';
import styles from './page.module.scss';
import Link from 'next/link';

export default function Page() {
    return (
        <div className={styles.page}>
            <div className={styles.content}>
                <header>
                    <h1>
                        <Link href="/">
                            <span>Stephen Matheis</span>
                            <span className={styles.muted}>Software Engineer</span>
                        </Link>
                    </h1>
                    <ul>
                        <li>
                            <a
                                className={styles.muted}
                                href="mailto:stephen@matheis.email"
                                target="_blank"
                                title="My email address"
                            >
                                stephen@matheis.email
                            </a>
                        </li>
                        <li>
                            <a
                                className={styles.muted}
                                href="https://github.com/stephenmatheis"
                                target="_blank"
                                title="My GitHub profile"
                            >
                                github.com/stephenmatheis
                            </a>
                        </li>
                    </ul>
                </header>
                <ul className={styles.roles}>
                    {experience.map(({ company, roles }, index) => {
                        return (
                            <Fragment key={index}>
                                {roles.map(({ title, start, end }, index: number) => {
                                    return (
                                        <li key={index}>
                                            <span>
                                                {start}
                                                {end && <>-{end}</>}
                                            </span>
                                            <span>{title}</span>, <span className={styles.muted}>{company}</span>
                                        </li>
                                    );
                                })}
                            </Fragment>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
