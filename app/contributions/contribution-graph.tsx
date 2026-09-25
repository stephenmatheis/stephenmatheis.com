'use client';

import Image from 'next/image';
import { useState } from 'react';
import { versions, versionShot, versionUrl } from '../versions';
import commitDays from './days.json';
import { effort } from '../facts';
import styles from './contribution-graph.module.css';

/**
 * GitHub's contribution graph, for this site only.
 *
 * Every square is a day, darker green for more commits, with one grid per
 * year: columns are weeks, rows are days of the week. Point at a square to
 * see the day's commits and which version they went into. Click it to pick
 * that version: all of its days light up, and its details appear alongside.
 *
 * The counts come from `days.json`, pulled from git once. Each version
 * counts only its own commits, the ones the previous version doesn't have,
 * and skips package bumps and deploy fixes, the same rules as `versions.ts`.
 */

type CommitDay = {
    date: string;
    commits: number;
    versions: number[];
};

const days = new Map((commitDays as CommitDay[]).map((day) => [day.date, day]));
const totalCommits = (commitDays as CommitDay[]).reduce((sum, day) => sum + day.commits, 0);

const firstYear = Number((commitDays as CommitDay[])[0].date.slice(0, 4));
const lastYear = Number((commitDays as CommitDay[]).at(-1)!.date.slice(0, 4));

// Newest year first, like GitHub's profile page.
const years = Array.from({ length: lastYear - firstYear + 1 }, (_, index) => lastYear - index);

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** GitHub's five shades, from "nothing" to "a lot". */
function level(commits: number) {
    if (commits === 0) {
        return 0;
    }

    if (commits <= 2) {
        return 1;
    }

    if (commits <= 5) {
        return 2;
    }

    if (commits <= 10) {
        return 3;
    }

    return 4;
}

/**
 * Every day of a year, laid out in week columns.
 *
 * Dates are made with Date.UTC and read back with getUTC… methods, so the
 * visitor's timezone can't shift a day into the wrong square.
 */
function yearWeeks(year: number) {
    const weeks: (string | null)[][] = [];
    const january1 = new Date(Date.UTC(year, 0, 1));

    // Pad the first week with empty squares until the weekday of January 1st.
    let week: (string | null)[] = Array.from({ length: january1.getUTCDay() }, () => null);

    for (let date = january1; date.getUTCFullYear() === year; date = new Date(date.getTime() + 86_400_000)) {
        week.push(date.toISOString().slice(0, 10));

        if (week.length === 7) {
            weeks.push(week);
            week = [];
        }
    }

    if (week.length > 0) {
        weeks.push(week);
    }

    return weeks;
}

function describe(date: string) {
    const day = days.get(date);
    const label = new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC',
    });

    if (!day) {
        return `No commits on ${label}`;
    }

    const names = day.versions.map((number) => `v${number} ${versions[number - 1].name}`).join(', ');

    return `${day.commits} commit${day.commits === 1 ? '' : 's'} on ${label} · ${names}`;
}

export function ContributionGraph() {
    const [hovered, setHovered] = useState<string | null>(null);
    const [selectedNumber, setSelectedNumber] = useState<number | null>(null);

    const selected = selectedNumber === null ? null : versions[selectedNumber - 1];

    return (
        <main className={styles.page}>
            <div className={styles.column}>
                <h1 className={styles.heading}>
                    {totalCommits.toLocaleString('en-US')} contributions from {firstYear} to {lastYear}
                </h1>

                <p className={styles.readout} aria-live="polite">
                    {hovered ? describe(hovered) : 'Point at a day. Click to select its version.'}
                </p>

                {years.map((year) => {
                    const weeks = yearWeeks(year);

                    return (
                        <section key={year} className={styles.year} aria-label={String(year)}>
                            <h2>{year}</h2>

                            <div className={styles.calendar}>
                                {/* Month labels, placed over the week where each month begins. */}
                                <div className={styles.months} aria-hidden="true">
                                    {weeks.map((week, weekIndex) => {
                                        const firstOfMonth = week.find((date) => date?.endsWith('-01'));

                                        return (
                                            <span key={weekIndex}>
                                                {firstOfMonth ? monthNames[Number(firstOfMonth.slice(5, 7)) - 1] : ''}
                                            </span>
                                        );
                                    })}
                                </div>

                                <div className={styles.weeks}>
                                    {weeks.map((week, weekIndex) => (
                                        <div key={weekIndex} className={styles.week}>
                                            {week.map((date, dayIndex) => {
                                                if (!date) {
                                                    return <span key={dayIndex} className={styles.blank} />;
                                                }

                                                const day = days.get(date);
                                                const inSelected =
                                                    selectedNumber !== null && day?.versions.includes(selectedNumber);

                                                return (
                                                    <button
                                                        key={date}
                                                        type="button"
                                                        className={styles.day}
                                                        data-level={level(day?.commits ?? 0)}
                                                        data-selected={inSelected || undefined}
                                                        aria-label={describe(date)}
                                                        onMouseEnter={() => setHovered(date)}
                                                        onFocus={() => setHovered(date)}
                                                        onClick={() => day && setSelectedNumber(day.versions.at(-1)!)}
                                                    />
                                                );
                                            })}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    );
                })}

                <div className={styles.legend} aria-hidden="true">
                    Less
                    {[0, 1, 2, 3, 4].map((shade) => (
                        <span key={shade} className={styles.day} data-level={shade} />
                    ))}
                    More
                </div>
            </div>

            {selected && (
                <aside className={styles.panel}>
                    <div className={styles.shot}>
                        <Image src={versionShot(selected)} alt="" fill sizes="320px" />
                    </div>
                    <h2>
                        v{selected.number} · {selected.name}
                    </h2>
                    <p>
                        {effort(selected)}, {selected.started} to {selected.frozen}.
                    </p>
                    <a href={versionUrl(selected)}>Visit v{selected.number} →</a>
                </aside>
            )}
        </main>
    );
}
