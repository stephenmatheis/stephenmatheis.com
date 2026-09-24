import { headCommit } from './head-commit';
import { versions, versionUrl, type Version } from './versions';
import styles from './graph.module.css';

/**
 * The homepage: the archive drawn as `git log --graph`.
 *
 * It's not a picture of a git graph, it's close to the real thing. Every
 * version is a branch that forked off `main` and never merged back, so the
 * graph is a trunk with 42 short branches sticking out of it, newest at the
 * top, the way git prints it.
 *
 * Git colors each lane of the graph so you can follow a branch by eye. It
 * cycles through six terminal colors, and so does this.
 */
const laneColors = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan'];

/**
 * The first commit in this repo's history, which is where every branch
 * ultimately comes from. It's the bottom of the graph.
 */
const rootCommit = {
    sha: '8291e21',
    date: '2020-02-16',
    message: 'init',
};

export default function Home() {
    // git log prints newest first.
    const newestFirst = [...versions].reverse();

    // The commit this build came from: `main` in production, the branch name
    // on a preview.
    const head = headCommit();

    return (
        <main className={styles.terminal}>
            <pre className={styles.log}>
                <span className={styles.prompt}>$ git log --graph --oneline --decorate --all</span>
                {'\n\n'}
                <Trunk>*</Trunk> <span className={styles.sha}>{head.sha}</span>{' '}
                <span className={styles.decoration}>
                    (<span className={styles.head}>HEAD</span>
                    {/* git writes "HEAD -> branch" on a branch, and plain "HEAD" when detached. */}
                    {head.branch && (
                        <>
                            {' '}
                            -&gt; <span className={styles.branch}>{head.branch}</span>
                        </>
                    )}
                    )
                </span>{' '}
                you are here
                {'\n'}
                {newestFirst.map((version, index) => (
                    <VersionRow key={version.number} version={version} color={laneColors[index % laneColors.length]} />
                ))}
                <Trunk>*</Trunk> <span className={styles.sha}>{rootCommit.sha}</span>{' '}
                <span className={styles.date}>{rootCommit.date}</span> {rootCommit.message}
                {'\n'}
            </pre>
        </main>
    );
}

/** The trunk's lane: always the first column, always the same color. */
function Trunk({ children }: { children: string }) {
    return <span className={styles.trunk}>{children}</span>;
}

/**
 * Two lines per version, the same shape git draws for a side branch:
 *
 *     | * 1e8dd0f 2026-09-22 (tag: v42, feat/ascii) feat: wrapped boxes
 *     |/
 *
 * The `*` is the branch's commit, and `|/` is it joining back into the trunk
 * lane below. The version number is shown as a git tag, since that's what a
 * version number is in git.
 */
function VersionRow({ version, color }: { version: Version; color: string }) {
    return (
        <>
            <a className={styles.row} href={versionUrl(version)}>
                <Trunk>|</Trunk> <span style={{ color: `var(--${color})` }}>*</span>{' '}
                <span className={styles.sha}>{version.commit}</span>{' '}
                <span className={styles.date}>{version.frozen}</span>{' '}
                <span className={styles.decoration}>
                    (<span className={styles.tag}>tag: v{version.number}</span>,{' '}
                    <span className={styles.branch}>{version.branch}</span>)
                </span>{' '}
                {version.lastCommitMessage}
            </a>
            {'\n'}
            <Trunk>|</Trunk>
            <span style={{ color: `var(--${color})` }}>/</span>
            {'\n'}
        </>
    );
}
