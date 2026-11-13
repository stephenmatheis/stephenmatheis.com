import type { Metadata } from 'next';
import Link from 'next/link';
import { Syntax } from '@/app/components/Syntax';
import { Header } from '@/app/components/Header';
import { formatDate, getEntries, getTopics, isDate } from './entries';
import styles from './page.module.scss';

export const metadata: Metadata = {
    title: 'Library · Stephen Matheis',
};

export default function Library() {
    const entries = getEntries();
    const topics = getTopics();
    const indexWidth = String(Math.max(...topics.map(([, topicEntries]) => topicEntries.length))).length;
    const dateWidth = Math.max(...entries.map((entry) => formatDate(entry.added).length));

    return (
        <>
            <Header
                pageTitle="Library"
                subHeading={
                    <>
                        {entries.length} entries in {topics.length} topics
                    </>
                }
            />
            <main
                className={styles.library}
                style={{ '--index-width': `${indexWidth}ch`, '--date-width': `${dateWidth}ch` } as React.CSSProperties}
            >
                <h1 className={styles.h1}>~ Topics ~</h1>
                {topics.map(([topic, topicEntries]) => (
                    <section key={topic} className={styles.topic}>
                        <h2>
                            <Syntax>## </Syntax>
                            {topic}
                        </h2>
                        <ul className={styles.entries}>
                            {topicEntries.map((entry, index) => (
                                <li key={entry.slug}>
                                    <span className={styles.date}>{index + 1}</span>
                                    <span className={styles.title}>
                                        <Link href={`/library/${entry.slug}`}>{entry.title}</Link>
                                    </span>
                                    <span className={styles.date}>
                                        {isDate(entry.added) ? (
                                            <time dateTime={entry.added}>{formatDate(entry.added)}</time>
                                        ) : (
                                            entry.added
                                        )}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </section>
                ))}
            </main>
        </>
    );
}
