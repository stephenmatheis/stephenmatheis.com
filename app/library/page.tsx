import type { Metadata } from 'next';
import Link from 'next/link';
import { Syntax } from '@/app/components/Syntax';
import { PageHeader } from '@/app/components/PageHeader';
import { formatDate, getEntries, getTopics, isDate } from './entries';
import styles from './page.module.scss';

export const metadata: Metadata = {
    title: 'Library · Stephen Matheis',
};

function plural(count: number, one: string, many: string) {
    return `${count} ${count === 1 ? one : many}`;
}

export default function Library() {
    const entries = getEntries();
    const topics = getTopics();
    const indexWidth = String(Math.max(...topics.map(([, topicEntries]) => topicEntries.length))).length;
    const dateWidth = Math.max(...entries.map((entry) => formatDate(entry.added).length));

    return (
        <>
            <PageHeader
                parent={{
                    label: 'Home',
                    href: '/',
                }}
                title="Library"
                details={[plural(entries.length, 'entry', 'entries'), plural(topics.length, 'topic', 'topics')]}
            />
            <main
                className={styles.library}
                style={{ '--index-width': `${indexWidth}ch`, '--date-width': `${dateWidth}ch` } as React.CSSProperties}
            >
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
