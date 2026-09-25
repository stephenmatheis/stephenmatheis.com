import { versions, type Version } from './versions';

/**
 * Small calculations on top of `versions.ts` that several views need. The
 * data file holds raw facts from git; this is where they get combined into
 * answers like "how long did this one last?" or "what was live on this date?"
 */

const millisecondsPerDay = 24 * 60 * 60 * 1000;

/** Whole days from one YYYY-MM-DD date to another. */
export function daysBetween(earlier: string, later: string) {
    return Math.round((Date.parse(later) - Date.parse(earlier)) / millisecondsPerDay);
}

/**
 * How many days a version was worked on, counting both ends, so one started
 * and finished on the same day lasted 1 day, not 0.
 */
export function daysLasted(version: Version) {
    return daysBetween(version.started, version.frozen) + 1;
}

/**
 * Splits "Next.js 16" into `{ family: 'Next.js', major: 16 }`, so views can
 * tell an upgrade (same family, bigger number) from a switch (new family).
 */
export function parseFramework(framework: string) {
    const match = framework.match(/^(.*) (\d+)$/);

    return {
        family: match?.[1] ?? framework,
        major: Number(match?.[2] ?? 0),
    };
}

/** Tagged "(WIP)" in its last commit: left mid-thought. */
export function isUnfinished(version: Version) {
    return /\bwip\b/i.test(version.lastCommitMessage);
}

/** Tagged "(paused)" in its last commit. */
export function isPaused(version: Version) {
    return /\bpaused\b/i.test(version.lastCommitMessage);
}

/**
 * The newest version that had frozen by the given date: roughly "what was I
 * working on then?" Dates before v1 froze get v1, the earliest there is.
 */
export function versionOnDate(date: string) {
    let found = versions[0];

    for (const version of versions) {
        if (version.frozen <= date) {
            found = version;
        }
    }

    return found;
}

/**
 * "6 years, 7 months", counting whole calendar months from a date to today.
 *
 * It reads the visitor's clock, so only call it in the browser, after the
 * page has loaded (in response to a command, or behind useIsClient). If the
 * server rendered it, the server's "today" and the browser's could disagree.
 */
export function uptime(since: string) {
    const start = new Date(since);
    const now = new Date();

    let months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());

    // Not a whole month yet if today's day of the month hasn't reached the start's.
    if (now.getDate() < start.getDate()) {
        months -= 1;
    }

    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    return `${years} years, ${remainingMonths} months`;
}

/** "1 commit", "2 commits": a number with its noun, pluralized to match. */
export function count(amount: number, singular: string) {
    return `${amount} ${singular}${amount === 1 ? '' : 's'}`;
}

/** "11 commits over 7 days", the effort line several views show. */
export function effort(version: Version) {
    return `${count(version.commits, 'commit')} over ${count(version.activeDays, 'day')}`;
}

/** "07" style numbers, for anywhere that wants columns to line up. */
export function padNumber(number: number, width = 2) {
    return String(number).padStart(width, '0');
}

/** The last commit message without "feat: " or "fix: " in front of it. */
export function lastWords(version: Version) {
    return version.lastCommitMessage.replace(/^\w+(\([^)]*\))?:\s*/, '');
}
