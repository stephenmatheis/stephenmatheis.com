import { versions, type Version } from '../versions';

/**
 * Release notes, written from git facts.
 *
 * Each version's notes come from comparing it with the version before it:
 * did the framework change, how long was the gap, how much work went in, and
 * what was the last thing you wrote before moving on. The sentences are dry on
 * purpose. Release notes are funniest when they're completely deadpan about
 * something like "rewrote everything, then came back eleven days later".
 *
 * These are generated so every version has notes on day one. Any version
 * could later get hand-written notes that replace or add to these.
 */

const millisecondsPerDay = 24 * 60 * 60 * 1000;

function daysBetween(earlier: string, later: string) {
    return Math.round((Date.parse(later) - Date.parse(earlier)) / millisecondsPerDay);
}

/** "1 commit", "2 commits". */
function count(amount: number, singular: string) {
    return `${amount} ${singular}${amount === 1 ? '' : 's'}`;
}

/**
 * Splits "Next.js 16" into its family and major version, so "Next.js 15" to
 * "Next.js 16" reads as an upgrade, not a switch.
 */
function parseFramework(framework: string) {
    const match = framework.match(/^(.*) (\d+)$/);

    return {
        family: match?.[1] ?? framework,
        major: Number(match?.[2] ?? 0),
    };
}

function frameworkNote(version: Version, previous: Version | undefined) {
    if (!previous) {
        return `The first version. Built with ${version.framework}.`;
    }

    if (version.framework === previous.framework) {
        return null;
    }

    const current = parseFramework(version.framework);
    const before = parseFramework(previous.framework);

    if (current.family === before.family) {
        return current.major > before.major
            ? `Upgraded to ${version.framework}.`
            : `Went back to ${version.framework}, for some reason.`;
    }

    // A different framework family. If it's one that was used before the
    // previous version, this is a return from a detour, not a new switch.
    const earlierVersions = versions.slice(0, previous.number - 1);
    const usedBefore = earlierVersions.some((earlier) => parseFramework(earlier.framework).family === current.family);

    if (usedBefore) {
        return `Back on ${current.family} after a detour through ${previous.framework}.`;
    }

    return `Switched from ${previous.framework} to ${version.framework}.`;
}

function effortNote(version: Version) {
    // v1 has no previous version to compare with, so its count is its whole
    // history, all the way back to the repo's first commit.
    if (version.number === 1) {
        return `Everything since ${version.started}: ${count(version.commits, 'commit')} over ${count(version.activeDays, 'day')}.`;
    }

    return `${count(version.commits, 'commit')} over ${count(version.activeDays, 'day')}.`;
}

function timingNote(version: Version) {
    if (version.started === version.frozen) {
        return 'Made in a single day.';
    }

    const days = daysBetween(version.started, version.frozen) + 1;

    return `Worked on for ${count(days, 'day')}, ${version.started} to ${version.frozen}.`;
}

function gapNote(version: Version, previous: Version | undefined) {
    if (!previous) {
        return null;
    }

    const gap = daysBetween(previous.frozen, version.started);

    // Only worth mentioning when it's been a while.
    if (gap < 45) {
        return null;
    }

    return `Started ${Math.round(gap / 30)} months after the previous version.`;
}

function stateNote(version: Version) {
    if (/\bwip\b/i.test(version.lastCommitMessage)) {
        return 'Left unfinished.';
    }

    if (/\bpaused\b/i.test(version.lastCommitMessage)) {
        return 'Paused.';
    }

    return null;
}

function aliasNote(version: Version) {
    if (!version.aliases?.length) {
        return null;
    }

    return `Also lives on ${version.aliases.join(' and ')}, which turned out to be the same site.`;
}

/** The notes for one version, in reading order, skipping ones that don't apply. */
export function releaseNotes(version: Version) {
    const previous = versions[version.number - 2];

    const notes = [
        frameworkNote(version, previous),
        gapNote(version, previous),
        effortNote(version),
        timingNote(version),
        stateNote(version),
        aliasNote(version),
    ];

    return notes.filter((note) => note !== null);
}
