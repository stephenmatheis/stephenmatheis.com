import { daysLasted, isUnfinished, uptime } from '../facts';
import { desktopHeight, desktopWidth } from '../fitted-frame';
import { firstCommit, versions } from '../versions';
import styles from './terminal.module.css';

/**
 * `neofetch`: the command people run to show off their setup. It prints the
 * distro's logo in ASCII art, with system specs next to it (OS, kernel,
 * uptime, packages) and a row of color swatches underneath.
 *
 * Here the "system" is the archive. Every spec is a real number worked out
 * from `versions.ts`, just relabeled to fit neofetch's format.
 */

/**
 * The logo: a big tilde, the same "~" as the favicon. It goes up over a hump,
 * down through a trough, and back up, drawn in plain ASCII so it lines up in
 * any monospace font.
 */
const logo = [
    '     .-"""-.',
    "   .'       '.",
    '  /           \\          /',
    ' /             \\        /',
    "'               '.    .'",
    "                  '--'",
].join('\n');

/**
 * Terminal color swatches: the eight standard colors, then their bright
 * versions. Neofetch prints these at the bottom to show off your theme.
 */
const swatches = [
    ['#1d1f21', '#e06c75', '#98c379', '#e5c07b', '#61afef', '#c678dd', '#56b6c2', '#c8c8c8'],
    ['#5c6370', '#ff7b86', '#b5e890', '#ffd68a', '#82c4ff', '#de9bf0', '#7fd6e0', '#ffffff'],
];

/** Everything neofetch shows, worked out from the version list. */
function archiveSpecs() {
    const latest = versions[versions.length - 1];

    // Next.js versions used, oldest to newest, for the "kernel" range.
    const nextMajors = versions
        .map((version) => version.framework.match(/^Next\.js (\d+)$/)?.[1])
        .filter((major) => major !== undefined)
        .map(Number);

    // Anything that wasn't Next.js was a detour.
    const detours = versions.filter((version) => !version.framework.startsWith('Next.js'));

    // v1 is left out of "longest": its dates cover the repo's whole history
    // before it, not one experiment.
    const longest = versions
        .slice(1)
        .reduce((best, version) => (daysLasted(version) > daysLasted(best) ? version : best));

    const madeInOneDay = versions.filter((version) => version.started === version.frozen).length;
    const unfinished = versions.filter(isUnfinished).length;

    return [
        ['OS', `stephenmatheis.com v${latest.number}`],
        ['Kernel', `Next.js ${Math.min(...nextMajors)} → ${Math.max(...nextMajors)}`],
        ['Uptime', `${uptime(firstCommit.date)} (since ${firstCommit.date})`],
        ['Packages', `${versions.length} (versions)`],
        ['Shell', 'bash (fake)'],
        ['Resolution', `${desktopWidth}x${desktopHeight}`],
        ['Detours', detours.map((version) => `${version.framework} (v${version.number})`).join(', ')],
        ['Longest', `${longest.name}, ${daysLasted(longest)} days (v${longest.number})`],
        ['Speedruns', `${madeInOneDay} versions made in one day`],
        ['Unfinished', `${unfinished} versions tagged WIP`],
        ['Memory', `${versions.length} / ${versions.length} versions still running`],
    ];
}

export function Neofetch() {
    const title = 'guest@stephenmatheis';

    return (
        <div className={styles.neofetch}>
            <pre className={styles.neofetchLogo}>{logo}</pre>

            <div>
                <div className={styles.neofetchTitle}>{title}</div>

                {/* The underline under the title is as long as the title. */}
                <div>{'-'.repeat(title.length)}</div>

                {archiveSpecs().map(([label, value]) => (
                    <div key={label}>
                        <span className={styles.neofetchLabel}>{label}</span>: {value}
                    </div>
                ))}

                <div className={styles.swatches}>
                    {swatches.map((row, rowIndex) => (
                        <div key={rowIndex}>
                            {row.map((color) => (
                                <span key={color} style={{ color }}>
                                    ███
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
