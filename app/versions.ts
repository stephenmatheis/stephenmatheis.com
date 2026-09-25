/**
 * Every past version of this site, oldest first.
 *
 * Each one is a git branch in this repo. Vercel builds every branch as a
 * preview deployment, and each version's number is a custom domain attached
 * to its branch: v1.stephenmatheis.com → `archive`, and so on. Nothing gets
 * copied or exported. A version stays whatever its branch last deployed.
 *
 * The number is the order the versions were frozen, meaning the date of each
 * branch's last real commit (package bumps and deploy fixes don't count).
 * Branches that were exact copies of each other share one number.
 *
 * Everything here is a fact pulled from git. The views decide what to make of
 * those facts. For example, `log/notes.ts` turns them into release notes.
 *
 * To add a version:
 *
 * 1. Attach `v<next number>.stephenmatheis.com` to its branch in the Vercel
 *    project's domain settings.
 * 2. Add an entry here.
 * 3. Run `npm run screenshots -- <next number>` to capture its screenshot.
 */

export type Version = {
    /** Position in the archive, and the subdomain: `v${number}`. */
    number: number;

    /** Display name. Starts out derived from the branch; rename freely. */
    name: string;

    /** The git branch the subdomain is attached to. */
    branch: string;

    /** Short SHA of the branch's last real commit, like `git log --oneline` shows. */
    commit: string;

    /** What the version was built with, as of its last real commit. */
    framework: string;

    /** Date of the first commit that's new in this version, as YYYY-MM-DD. */
    started: string;

    /** Date of the branch's last real commit, as YYYY-MM-DD. */
    frozen: string;

    /**
     * Commits in this version that the previous version's branch doesn't
     * have. v1 has no previous version, so it counts everything since 2020.
     */
    commits: number;

    /** How many different days those commits landed on. */
    activeDays: number;

    /** Subject line of the branch's last real commit, exactly as written. */
    lastCommitMessage: string;

    /**
     * Other branches with the same code, folded into this number when the
     * archive was numbered.
     */
    aliases?: string[];
};

/**
 * The first commit in this repo's history. Every version's branch ultimately
 * grew out of it. The graph draws it at the bottom, and the terminal's
 * `neofetch` counts the site's "uptime" from it.
 */
export const firstCommit = {
    sha: '8291e21',
    date: '2020-02-16',
    message: 'init',
};

export const versions: Version[] = [
    {
        number: 1,
        name: 'Archive',
        branch: 'archive',
        commit: '21a5356',
        framework: 'Next.js 13',
        started: '2020-02-16',
        frozen: '2023-11-12',
        commits: 1061,
        activeDays: 177,
        lastCommitMessage: 'Delete update-version.ts',
    },
    {
        number: 2,
        name: 'Black and White',
        branch: 'black-and-white',
        commit: '991c279',
        framework: 'Next.js 13',
        started: '2023-11-25',
        frozen: '2023-12-05',
        commits: 17,
        activeDays: 4,
        lastCommitMessage: 'feat: black/white dark/light modes',
    },
    {
        number: 3,
        name: 'CRT',
        branch: 'crt',
        commit: '10a4d04',
        framework: 'Next.js 13',
        started: '2023-12-08',
        frozen: '2023-12-08',
        commits: 1,
        activeDays: 1,
        lastCommitMessage: 'feat: CRT look with flicker (WRT)',
    },
    {
        number: 4,
        name: 'Blog',
        branch: 'blog',
        commit: 'd7f10bf',
        framework: 'Next.js 13',
        started: '2023-12-12',
        frozen: '2024-01-08',
        commits: 74,
        activeDays: 17,
        lastCommitMessage: 'feat: resume page jobs desc',
        aliases: ['resume'],
    },
    {
        number: 5,
        name: 'Words',
        branch: 'feat/words',
        commit: '130730e',
        framework: 'Next.js 13',
        started: '2024-02-17',
        frozen: '2024-02-17',
        commits: 1,
        activeDays: 1,
        lastCommitMessage: 'feat: replace hero with words (WIP)',
    },
    {
        number: 6,
        name: 'Nav',
        branch: 'feat/nav',
        commit: 'cab36af',
        framework: 'Next.js 14',
        started: '2024-03-08',
        frozen: '2024-03-08',
        commits: 6,
        activeDays: 1,
        lastCommitMessage: 'feat: one column for screen',
    },
    {
        number: 7,
        name: 'Black and White',
        branch: 'feat/black-and-white',
        commit: 'e0fd267',
        framework: 'Next.js 13',
        started: '2024-08-14',
        frozen: '2024-08-14',
        commits: 1,
        activeDays: 1,
        lastCommitMessage: 'feat: reset (WIP)',
    },
    {
        number: 8,
        name: 'Print',
        branch: 'feat/print',
        commit: 'c4c7f1f',
        framework: 'Next.js 14',
        started: '2024-08-14',
        frozen: '2024-08-14',
        commits: 6,
        activeDays: 1,
        lastCommitMessage: 'feat: update next.js',
    },
    {
        number: 9,
        name: 'Positions',
        branch: 'feat/positions',
        commit: 'a66c6dd',
        framework: 'Next.js 14',
        started: '2024-08-14',
        frozen: '2024-08-18',
        commits: 8,
        activeDays: 4,
        lastCommitMessage: 'feat: dot (WIP)',
    },
    {
        number: 10,
        name: 'Layout',
        branch: 'feat/layout',
        commit: '231a287',
        framework: 'Next.js 14',
        started: '2024-08-25',
        frozen: '2024-08-26',
        commits: 26,
        activeDays: 2,
        lastCommitMessage: 'feat: add avatar to header (WIP)',
    },
    {
        number: 11,
        name: 'New Print Layout',
        branch: 'feat/new-print-layout',
        commit: '5c9f109',
        framework: 'Next.js 14',
        started: '2024-08-26',
        frozen: '2024-09-02',
        commits: 20,
        activeDays: 6,
        lastCommitMessage: 'Update page.module.scss',
    },
    {
        number: 12,
        name: 'Toolbar',
        branch: 'feat/toolbar',
        commit: '6d7e0d2',
        framework: 'Next.js 14',
        started: '2024-09-02',
        frozen: '2024-09-03',
        commits: 7,
        activeDays: 2,
        lastCommitMessage: 'feat: toolbar',
    },
    {
        number: 13,
        name: 'Fun',
        branch: 'feat/fun',
        commit: '3b9fd55',
        framework: 'Next.js 14',
        started: '2024-09-03',
        frozen: '2024-10-10',
        commits: 6,
        activeDays: 3,
        lastCommitMessage: 'fix: links width',
    },
    {
        number: 14,
        name: '8-Bit',
        branch: 'feat/8-bit',
        commit: 'ad1e504',
        framework: 'Next.js 14',
        started: '2024-10-11',
        frozen: '2024-10-11',
        commits: 1,
        activeDays: 1,
        lastCommitMessage: 'feat: update jobs',
        aliases: ['backup/main-thu-nov-14-2024'],
    },
    {
        number: 15,
        name: 'Simple',
        branch: 'feat/simple',
        commit: 'ff3d029',
        framework: 'Next.js 14',
        started: '2024-10-19',
        frozen: '2024-11-13',
        commits: 4,
        activeDays: 3,
        lastCommitMessage: 'feat: code (WIP)',
    },
    {
        number: 16,
        name: 'Cybertruck',
        branch: 'feat/cybertruck',
        commit: '0a06f64',
        framework: 'Next.js 14',
        started: '2024-11-13',
        frozen: '2024-11-14',
        commits: 7,
        activeDays: 2,
        lastCommitMessage: 'feat: truck',
    },
    {
        number: 17,
        name: 'Mono',
        branch: 'feat/mono',
        commit: '69d9860',
        framework: 'Next.js 14',
        started: '2024-11-15',
        frozen: '2024-11-26',
        commits: 2,
        activeDays: 2,
        lastCommitMessage: 'feat: code syntax highlight lib (WIP)',
    },
    {
        number: 18,
        name: 'New Home',
        branch: 'feat/new-home',
        commit: '5d24371',
        framework: 'Next.js 15',
        started: '2024-11-26',
        frozen: '2025-01-22',
        commits: 38,
        activeDays: 10,
        lastCommitMessage: 'feat: doors',
    },
    {
        number: 19,
        name: 'Fiber',
        branch: 'feat/fiber',
        commit: '01e5b1c',
        framework: 'Next.js 15',
        started: '2025-01-22',
        frozen: '2025-04-01',
        commits: 7,
        activeDays: 3,
        lastCommitMessage: 'Update page.tsx',
    },
    {
        number: 20,
        name: 'New',
        branch: 'feat/new',
        commit: 'ff17e3c',
        framework: 'Next.js 14',
        started: '2025-04-12',
        frozen: '2025-04-13',
        commits: 2,
        activeDays: 2,
        lastCommitMessage: 'feat: experimenting with clip-path',
    },
    {
        number: 21,
        name: 'Grid',
        branch: 'feat/grid',
        commit: '98532a3',
        framework: 'Next.js 15',
        started: '2025-04-13',
        frozen: '2025-04-20',
        commits: 7,
        activeDays: 3,
        lastCommitMessage: 'feat: grid (WIP)',
    },
    {
        number: 22,
        name: 'Old Skool',
        branch: 'feat/old-skool',
        commit: 'd40a784',
        framework: 'Next.js 15',
        started: '2025-04-20',
        frozen: '2025-06-23',
        commits: 50,
        activeDays: 12,
        lastCommitMessage: 'feat: loading',
    },
    {
        number: 23,
        name: 'Flex',
        branch: 'feat/flex',
        commit: '87466b9',
        framework: 'Next.js 15',
        started: '2025-07-09',
        frozen: '2025-08-01',
        commits: 89,
        activeDays: 12,
        lastCommitMessage: 'Update viewport.module.scss',
    },
    {
        number: 24,
        name: 'Motion',
        branch: 'feat/motion',
        commit: 'fcdedca',
        framework: 'Next.js 15',
        started: '2025-08-01',
        frozen: '2025-08-15',
        commits: 76,
        activeDays: 12,
        lastCommitMessage: 'feat: scramble on page turn (paused)',
    },
    {
        number: 25,
        name: 'Orientation',
        branch: 'feat/orientation',
        commit: '93bbe5c',
        framework: 'Next.js 15',
        started: '2025-08-10',
        frozen: '2025-08-18',
        commits: 22,
        activeDays: 7,
        lastCommitMessage: 'Update stephen-matheis-resume.pdf',
    },
    {
        number: 26,
        name: 'Narrative Format',
        branch: 'feat/narrative-format',
        commit: 'd97d225',
        framework: 'Next.js 15',
        started: '2025-08-18',
        frozen: '2025-09-04',
        commits: 40,
        activeDays: 11,
        lastCommitMessage: 'feat: about (WIP)',
    },
    {
        number: 27,
        name: 'Resume',
        branch: 'feat/resume',
        commit: '39e4423',
        framework: 'Next.js 15',
        started: '2025-09-04',
        frozen: '2025-09-04',
        commits: 2,
        activeDays: 1,
        lastCommitMessage: 'feat: normal (is boring)',
    },
    {
        number: 28,
        name: 'Pages',
        branch: 'feat/pages',
        commit: '65655e6',
        framework: 'Next.js 15',
        started: '2025-09-04',
        frozen: '2025-09-19',
        commits: 12,
        activeDays: 6,
        lastCommitMessage: 'feat: stub routes',
    },
    {
        number: 29,
        name: 'Update',
        branch: 'feat/update',
        commit: '891e069',
        framework: 'Next.js 15',
        started: '2025-10-22',
        frozen: '2025-10-22',
        commits: 2,
        activeDays: 1,
        lastCommitMessage: 'feat: remove details',
    },
    {
        number: 30,
        name: 'Listless',
        branch: 'feat/listless',
        commit: 'dda7290',
        framework: 'Next.js 16',
        started: '2025-10-03',
        frozen: '2025-11-03',
        commits: 12,
        activeDays: 5,
        lastCommitMessage: 'feat: 3d',
    },
    {
        number: 31,
        name: 'Godly',
        branch: 'feat/godly',
        commit: '07a8dd2',
        framework: 'Next.js 15',
        started: '2025-11-03',
        frozen: '2025-11-04',
        commits: 3,
        activeDays: 2,
        lastCommitMessage: 'feat: loading',
    },
    {
        number: 32,
        name: 'Back in Black',
        branch: 'feat/back-in-black',
        commit: 'e597464',
        framework: 'Next.js 16',
        started: '2025-11-17',
        frozen: '2025-11-20',
        commits: 5,
        activeDays: 2,
        lastCommitMessage: 'feat: gray out colors',
    },
    {
        number: 33,
        name: 'Invoice',
        branch: 'feat/invoice',
        commit: '36e9ea4',
        framework: 'Next.js 16',
        started: '2025-12-27',
        frozen: '2026-02-10',
        commits: 2,
        activeDays: 2,
        lastCommitMessage: 'feat: invoice',
    },
    {
        number: 34,
        name: 'Overlay',
        branch: 'feat/overlay',
        commit: '8bccf8b',
        framework: 'Next.js 16',
        started: '2026-02-11',
        frozen: '2026-02-11',
        commits: 2,
        activeDays: 1,
        lastCommitMessage: 'feat: links',
    },
    {
        number: 35,
        name: 'FUI',
        branch: 'fui',
        commit: '8211e00',
        framework: 'Next.js 16',
        started: '2025-07-23',
        frozen: '2026-05-12',
        commits: 261,
        activeDays: 47,
        lastCommitMessage: 'feat: remove titles',
        aliases: ['nvim', 'redesign'],
    },
    {
        number: 36,
        name: 'Update Next',
        branch: 'update-next',
        commit: '564b8e8',
        framework: 'Next.js 16',
        started: '2026-05-22',
        frozen: '2026-05-22',
        commits: 1,
        activeDays: 1,
        lastCommitMessage: 'update next',
    },
    {
        number: 37,
        name: 'Vite',
        branch: 'vite',
        commit: 'c3e8f2d',
        framework: 'React Router 7',
        started: '2026-05-22',
        frozen: '2026-05-22',
        commits: 1,
        activeDays: 1,
        lastCommitMessage: 'react router framework',
    },
    {
        number: 38,
        name: 'Archive Main',
        branch: 'archive-main',
        commit: 'b0e2028',
        framework: 'Next.js 16',
        started: '2026-05-22',
        frozen: '2026-06-22',
        commits: 66,
        activeDays: 7,
        lastCommitMessage: 'fix: text selection',
    },
    {
        number: 39,
        name: 'TUI',
        branch: 'feat/tui',
        commit: 'e3245ff',
        framework: 'Next.js 16',
        started: '2026-06-22',
        frozen: '2026-06-28',
        commits: 18,
        activeDays: 6,
        lastCommitMessage: 'feat: scrollable input & textarea',
    },
    {
        number: 40,
        name: 'Archive 2',
        branch: 'archive-2',
        commit: '9e3493f',
        framework: 'Next.js 16',
        started: '2026-07-07',
        frozen: '2026-07-07',
        commits: 2,
        activeDays: 1,
        lastCommitMessage: 'feat: links (WIP)',
    },
    {
        number: 41,
        name: 'System',
        branch: 'feat/system',
        commit: '6b6d52a',
        framework: 'Next.js 16',
        started: '2026-07-25',
        frozen: '2026-07-27',
        commits: 9,
        activeDays: 3,
        lastCommitMessage: 'feat: home page experiments',
    },
    {
        number: 42,
        name: 'ASCII',
        branch: 'feat/ascii',
        commit: '1e8dd0f',
        framework: 'Next.js 16',
        started: '2026-08-17',
        frozen: '2026-09-22',
        commits: 11,
        activeDays: 7,
        lastCommitMessage: 'feat: wrapped boxes',
    },
];

/**
 * The public URL for a version. It's derived from the number instead of stored,
 * so the domain scheme lives in one place.
 */
export function versionUrl(version: Version) {
    return `https://v${version.number}.stephenmatheis.com`;
}

/**
 * Path to a version's screenshot: a 1280 × 800 capture of its homepage, taken
 * with headless Chrome. Views that show many versions at once use these instead
 * of 42 live iframes, which would load 42 whole websites.
 */
export function versionShot(version: Version) {
    return `/shots/v${version.number}.png`;
}
