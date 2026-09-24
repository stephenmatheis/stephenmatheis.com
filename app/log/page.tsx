import type { Metadata } from 'next';
import { versions, versionUrl } from '../versions';
import { releaseNotes } from './notes';
import styles from './log.module.css';

export const metadata: Metadata = {
    title: 'log · Stephen Matheis',
    description: 'Release notes for every version.',
};

/**
 * The changelog: one entry per version, newest first, like release notes for
 * a piece of software that only ever shipped redesigns.
 *
 * This is the one view that's plain reading: a server-rendered document with
 * no JavaScript, and each entry has an id (#v14) so you can link to it.
 */
export default function LogPage() {
    const newestFirst = [...versions].reverse();

    return (
        <main className={styles.page}>
            <header className={styles.header}>
                <h1>Release notes</h1>
                <p>Every version of stephenmatheis.com, newest first. {versions.length} releases.</p>
            </header>

            {newestFirst.map((version) => (
                <article key={version.number} id={`v${version.number}`} className={styles.release}>
                    <h2>
                        <a href={`#v${version.number}`}>v{version.number}</a> — {version.name}
                    </h2>

                    <p className={styles.meta}>
                        <time dateTime={version.frozen}>{version.frozen}</time> · {version.branch} @ {version.commit}
                    </p>

                    <ul>
                        {releaseNotes(version).map((note) => (
                            <li key={note}>{note}</li>
                        ))}
                        <li>
                            Last words: <q>{version.lastCommitMessage}</q>
                        </li>
                    </ul>

                    <p>
                        <a href={versionUrl(version)}>Visit v{version.number} →</a>
                    </p>
                </article>
            ))}
        </main>
    );
}
