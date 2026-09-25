'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { daysLasted, isUnfinished, uptime } from '../facts';
import { useIsClient } from '../use-is-client';
import { firstCommit, versions, versionUrl, type Version } from '../versions';
import styles from './process-viewer.module.css';

/**
 * `htop`, the terminal process viewer, where every version is a process.
 *
 * The columns keep htop's names but mean something about the version:
 *
 * - PID: the version number.
 * - VIRT: commits. RES: days actually worked on it.
 * - S (state): R for running (the newest version), Z for zombie (tagged WIP:
 *   dead, but never cleaned up), S for sleeping (everything else).
 * - CPU% / MEM%: its share of all commits and all working days.
 * - TIME+: how many days it lasted, from first commit to last.
 *
 * Keys, like htop: ↑/↓ select, Enter "attaches" (opens the version), F6
 * changes the sort, F9 tries to kill, F10 or q quits.
 */

type SortKey = 'cpu' | 'pid' | 'time';

const sortOrder: SortKey[] = ['cpu', 'pid', 'time'];
const sortLabels: Record<SortKey, string> = {
    cpu: 'CPU%',
    pid: 'PID',
    time: 'TIME+',
};

const totalCommits = versions.reduce((sum, version) => sum + version.commits, 0);
const totalDays = versions.reduce((sum, version) => sum + version.activeDays, 0);
const newest = versions[versions.length - 1];

function state(version: Version) {
    if (version === newest) {
        return 'R';
    }

    return isUnfinished(version) ? 'Z' : 'S';
}

/** The "command" each process was started with. */
function command(version: Version) {
    const server = version.framework.startsWith('React Router') ? 'react-router-serve' : 'next start';

    return `${server} --branch ${version.branch}`;
}

function sorted(key: SortKey) {
    const copy = [...versions];

    if (key === 'cpu') {
        return copy.sort((a, b) => b.commits - a.commits);
    }

    if (key === 'time') {
        return copy.sort((a, b) => daysLasted(b) - daysLasted(a));
    }

    return copy;
}

/**
 * One of the meters at the top: a label, then a bar of `|` characters inside
 * brackets, filled to the given fraction, with a caption at the right end.
 */
function Meter({
    label,
    fraction,
    caption,
    color,
}: {
    label: string;
    fraction: number;
    caption: string;
    color: string;
}) {
    const width = 30;
    const filled = Math.round(fraction * width);

    return (
        <div>
            <span className={styles.meterLabel}>{label.padStart(4)}</span>[
            <span style={{ color }}>{'|'.repeat(filled)}</span>
            {' '.repeat(Math.max(0, width - filled - caption.length))}
            <span className={styles.dim}>{caption}</span>]
        </div>
    );
}

/** Commits per year, for the per-"CPU" meters. */
function commitsByYear() {
    const byYear = new Map<string, number>();

    for (const version of versions) {
        const year = version.frozen.slice(0, 4);

        byYear.set(year, (byYear.get(year) ?? 0) + version.commits);
    }

    return [...byYear.entries()];
}

export function ProcessViewer() {
    const router = useRouter();
    const isClient = useIsClient();

    const [sortKey, setSortKey] = useState<SortKey>('cpu');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [status, setStatus] = useState('');

    const selectedRowRef = useRef<HTMLTableRowElement>(null);

    const rows = sorted(sortKey);
    const selected = rows[selectedIndex];
    const zombies = versions.filter(isUnfinished).length;

    useEffect(() => {
        selectedRowRef.current?.scrollIntoView({ block: 'nearest' });
    }, [selectedIndex, sortKey]);

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'ArrowDown') {
                event.preventDefault();
                setSelectedIndex((index) => Math.min(rows.length - 1, index + 1));
            } else if (event.key === 'ArrowUp') {
                event.preventDefault();
                setSelectedIndex((index) => Math.max(0, index - 1));
            } else if (event.key === 'Enter') {
                setStatus(`Attaching to PID ${selected.number}…`);
                window.location.assign(versionUrl(selected));
            } else if (event.key === 'F6') {
                event.preventDefault();
                setSortKey((key) => sortOrder[(sortOrder.indexOf(key) + 1) % sortOrder.length]);
                setSelectedIndex(0);
            } else if (event.key === 'F9') {
                event.preventDefault();
                setStatus(`kill: (${selected.number}) - Operation not permitted. v${selected.number} is archived.`);
            } else if (event.key === 'F10' || event.key === 'q') {
                event.preventDefault();
                router.push('/');
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [rows.length, selected, router]);

    return (
        <main className={styles.htop}>
            <section className={styles.header}>
                <div className={styles.meters}>
                    {commitsByYear().map(([year, commits]) => (
                        <Meter
                            key={year}
                            label={year.slice(2)}
                            fraction={commits / totalCommits}
                            caption={`${((commits / totalCommits) * 100).toFixed(1)}%`}
                            color="#8ae234"
                        />
                    ))}
                    <Meter label="Mem" fraction={1} caption={`${versions.length}/${versions.length}`} color="#729fcf" />
                    <Meter label="Swp" fraction={0} caption="0/0" color="#ef2929" />
                </div>

                <div className={styles.summary}>
                    <div>
                        <span className={styles.dim}>Tasks:</span> {versions.length},{' '}
                        <span className={styles.zombie}>{zombies}</span> zombie; 1 running
                    </div>
                    <div>
                        <span className={styles.dim}>Load average:</span> {newest.commits}{' '}
                        {versions[versions.length - 2].commits} {versions[versions.length - 3].commits}
                    </div>
                    <div>
                        <span className={styles.dim}>Uptime:</span> {isClient ? uptime(firstCommit.date) : ''}
                    </div>
                </div>
            </section>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>PID</th>
                            <th>USER</th>
                            <th>PRI</th>
                            <th>NI</th>
                            <th>VIRT</th>
                            <th>RES</th>
                            <th>S</th>
                            <th data-sorted={sortKey === 'cpu' || undefined}>CPU%</th>
                            <th>MEM%</th>
                            <th data-sorted={sortKey === 'time' || undefined}>TIME+</th>
                            <th className={styles.commandColumn}>Command</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((version, index) => {
                            const isSelected = index === selectedIndex;

                            return (
                                <tr
                                    key={version.number}
                                    ref={isSelected ? selectedRowRef : undefined}
                                    data-selected={isSelected || undefined}
                                    onClick={() => setSelectedIndex(index)}
                                    onDoubleClick={() => window.location.assign(versionUrl(version))}
                                >
                                    <td>{version.number}</td>
                                    <td>stephen</td>
                                    <td>20</td>
                                    <td>0</td>
                                    <td>{version.commits}</td>
                                    <td>{version.activeDays}</td>
                                    <td className={state(version) === 'Z' ? styles.zombie : undefined}>
                                        {state(version)}
                                    </td>
                                    <td>{((version.commits / totalCommits) * 100).toFixed(1)}</td>
                                    <td>{((version.activeDays / totalDays) * 100).toFixed(1)}</td>
                                    <td>{daysLasted(version)}:00.00</td>
                                    <td className={styles.commandColumn}>{command(version)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <p className={styles.status} aria-live="polite">
                {status || `Sorted by ${sortLabels[sortKey]}. Enter attaches, double-click works too.`}
            </p>

            <footer className={styles.functionKeys}>
                {[
                    ['F1', 'Help'],
                    ['F5', 'Tree'],
                    ['F6', 'SortBy'],
                    ['F9', 'Kill'],
                    ['F10', 'Quit'],
                ].map(([key, label]) => (
                    <span key={key}>
                        <b>{key}</b>
                        {label}
                    </span>
                ))}
            </footer>
        </main>
    );
}
