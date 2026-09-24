import { execSync } from 'node:child_process';

/**
 * Which commit this copy of the site was built from, for the "you are here"
 * row at the top of the graph.
 *
 * On Vercel, every build gets system environment variables describing the git
 * commit being deployed. The homepage is prerendered at build time, so these
 * get baked in: production shows `main`, and a preview of another branch shows
 * that branch.
 *
 * Locally those variables don't exist, so it asks git directly instead. In
 * `next dev` the page renders on every request, so switching branches shows
 * up on the next reload.
 */
export type HeadCommit = {
    sha: string;

    /** The branch name, or null when HEAD is detached (not on any branch). */
    branch: string | null;
};

export function headCommit(): HeadCommit {
    const vercelSha = process.env.VERCEL_GIT_COMMIT_SHA;
    const vercelBranch = process.env.VERCEL_GIT_COMMIT_REF;

    if (vercelSha && vercelBranch) {
        // Vercel gives the full 40-character hash. `git log --oneline` shows
        // the first seven, so this does too.
        return {
            sha: vercelSha.slice(0, 7),
            branch: vercelBranch,
        };
    }

    try {
        // `--abbrev-ref HEAD` prints the current branch name, or the literal
        // word "HEAD" when no branch is checked out.
        const branch = git('rev-parse --abbrev-ref HEAD');

        return {
            sha: git('rev-parse --short HEAD'),
            branch: branch === 'HEAD' ? null : branch,
        };
    } catch {
        // No git, or not a git checkout (e.g. building from a downloaded
        // copy). The graph still renders, just without a real hash.
        return {
            sha: '0000000',
            branch: null,
        };
    }
}

function git(args: string) {
    return execSync(`git ${args}`, {
        encoding: 'utf8',

        // Keep git's error output out of the build log. A failure is handled
        // by the catch above, so the noise wouldn't help anyone.
        stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
}
