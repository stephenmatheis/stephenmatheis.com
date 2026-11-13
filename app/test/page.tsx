import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/app/components/Header';
import { Frontmatter } from '@/app/components/Frontmatter';
import { PageHeader } from '@/app/components/PageHeader';
import { Syntax } from '@/app/components/Syntax';
import styles from './page.module.scss';

export const metadata: Metadata = {
    title: 'Test · Stephen Matheis',
};

const sampleEntry = {
    title: 'Use 100dvh for full-height layouts on iOS Safari',
    type: 'tip',
    topic: 'safari & ios',
    added: '2021-05-02',
};

const homeLines = [
    {
        key: 'role',
        value: 'Front-End Software Engineer',
    },
    {
        key: 'company',
        value: 'Apple',
    },
];

const libraryLines = [
    {
        key: 'page',
        value: 'Library',
    },
    {
        key: 'entries',
        value: '68',
    },
];

const homeParent = {
    label: 'Home',
    href: '/',
};

const libraryParent = {
    label: 'Library',
    href: '/library',
};

const entryLines = [
    {
        key: 'title',
        value: sampleEntry.title,
    },
    {
        key: 'type',
        value: sampleEntry.type,
    },
    {
        key: 'topic',
        value: <Link href="/library">{sampleEntry.topic}</Link>,
    },
    {
        key: 'added',
        value: sampleEntry.added,
    },
];

function CurrentEntryHeader() {
    return (
        <header className={styles.currentEntry}>
            <p>
                <Syntax>[</Syntax>
                <Link href="/library">Library</Link>
                <Syntax>]</Syntax> / {sampleEntry.topic}
            </p>
            <h1>{sampleEntry.title}</h1>
            <p>{sampleEntry.type} · added 02 May 2021 · css, ios, viewport</p>
        </header>
    );
}

export default function Test() {
    return (
        <>
            <PageHeader parent={homeParent} title="Test" details={['Header comparison']} />
            <main className={styles.comparison}>
                <div className={styles.columnLabels}>
                    <h2>
                        <Syntax muted>## </Syntax>
                        Current
                    </h2>
                    <h2>
                        <Syntax muted>## </Syntax>
                        Frontmatter
                    </h2>
                    <h2>
                        <Syntax muted>## </Syntax>
                        Frontmatter + column nav
                    </h2>
                    <h2>
                        <Syntax muted>## </Syntax>
                        Parent link
                    </h2>
                </div>

                <section className={styles.row}>
                    <p className={styles.rowLabel}>home</p>
                    <div className={styles.cell}>
                        <Header />
                    </div>
                    <div className={styles.cell}>
                        <Frontmatter lines={homeLines} currentPage="home" />
                    </div>
                    <div className={styles.cell}>
                        <Frontmatter lines={homeLines} currentPage="home" pagesPlacement="column" />
                    </div>
                    <div className={styles.cell}>
                        <PageHeader title="Stephen Matheis" details={['Front-End Software Engineer', 'Apple']} />
                    </div>
                </section>

                <section className={styles.row}>
                    <p className={styles.rowLabel}>library</p>
                    <div className={styles.cell}>
                        <Header pageTitle="Library" subHeading="68 entries in 10 topics" />
                    </div>
                    <div className={styles.cell}>
                        <Frontmatter lines={libraryLines} currentPage="library" />
                    </div>
                    <div className={styles.cell}>
                        <Frontmatter lines={libraryLines} currentPage="library" pagesPlacement="column" />
                    </div>
                    <div className={styles.cell}>
                        <PageHeader parent={homeParent} title="Library" details={['68 entries', '10 topics']} />
                    </div>
                </section>

                <section className={styles.row}>
                    <p className={styles.rowLabel}>entry</p>
                    <div className={styles.cell}>
                        <CurrentEntryHeader />
                    </div>
                    <div className={styles.cell}>
                        <Frontmatter lines={entryLines} currentPage="library" />
                    </div>
                    <div className={styles.cell}>
                        <Frontmatter lines={entryLines} currentPage="library" pagesPlacement="column" />
                    </div>
                    <div className={styles.cell}>
                        <PageHeader
                            parent={libraryParent}
                            title={sampleEntry.title}
                            details={['02 May 2021', sampleEntry.topic, sampleEntry.type]}
                        />
                    </div>
                </section>
            </main>
        </>
    );
}
