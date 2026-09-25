'use client';

import { useEffect, useRef, useState } from 'react';
import { effort, lastWords } from '../facts';
import { versions, versionUrl, type Version } from '../versions';
import styles from './boot-menu.module.css';

/** GRUB's classic countdown before it boots the highlighted entry on its own. */
const countdownSeconds = 10;

/** How fast the fake boot log scrolls, one line at a time. */
const bootLineMilliseconds = 140;

/**
 * The lines a Linux kernel would print while booting, rewritten about the
 * version being booted. The bracketed numbers are seconds since boot, which
 * is how real kernel logs are timestamped.
 */
function bootLog(version: Version) {
    return [
        `[    0.000000] Booting stephenmatheis.com v${version.number} (${version.name})`,
        `[    0.000000] Command line: BOOT_IMAGE=/vmlinuz branch=${version.branch} commit=${version.commit} ro quiet`,
        `[    0.004102] Framework: ${version.framework}`,
        `[    0.021337] Memory: ${effort(version)} available`,
        `[    0.064000] Worked on ${version.started} to ${version.frozen}`,
        `[    0.113000] Mounting ${versionUrl(version)} ...`,
        `[  OK  ] Reached target Last Words: "${lastWords(version)}".`,
        '[  OK  ] Started Stephen Matheis, Front-end Software Engineer.',
    ];
}

/**
 * A GRUB boot menu, the screen Linux machines show before the OS starts,
 * with one entry per version.
 *
 * Like the real one, it boots the highlighted entry after a countdown, and
 * pressing any key stops the countdown. ↑/↓ move, Enter boots. Booting plays
 * a fake kernel log, then loads the version.
 */
export function BootMenu() {
    // Newest version highlighted by default, like the latest kernel.
    const [selectedIndex, setSelectedIndex] = useState(versions.length - 1);
    const [secondsLeft, setSecondsLeft] = useState<number | null>(countdownSeconds);
    const [booting, setBooting] = useState<Version | null>(null);
    const [visibleLines, setVisibleLines] = useState(0);

    const selectedRef = useRef<HTMLLIElement>(null);

    function boot(version: Version) {
        setSecondsLeft(null);
        setBooting(version);
        setVisibleLines(0);
    }

    // Keep the highlighted entry scrolled into view inside the menu box.
    useEffect(() => {
        selectedRef.current?.scrollIntoView({ block: 'nearest' });
    }, [selectedIndex]);

    // The countdown: tick once a second, and on the last tick, boot whatever
    // is highlighted. The boot happens inside the timer's callback rather
    // than the effect itself, so the effect only schedules work.
    useEffect(() => {
        if (secondsLeft === null || booting) {
            return;
        }

        const timeout = window.setTimeout(() => {
            if (secondsLeft <= 1) {
                boot(versions[selectedIndex]);
            } else {
                setSecondsLeft(secondsLeft - 1);
            }
        }, 1000);

        return () => window.clearTimeout(timeout);
    }, [secondsLeft, booting, selectedIndex]);

    // The boot log: reveal one line at a time, then load the version.
    useEffect(() => {
        if (!booting) {
            return;
        }

        const lineCount = bootLog(booting).length;

        if (visibleLines < lineCount) {
            const timeout = window.setTimeout(() => setVisibleLines(visibleLines + 1), bootLineMilliseconds);

            return () => window.clearTimeout(timeout);
        }

        const timeout = window.setTimeout(() => window.location.assign(versionUrl(booting)), 600);

        return () => window.clearTimeout(timeout);
    }, [booting, visibleLines]);

    useEffect(() => {
        if (booting) {
            return;
        }

        function handleKeyDown(event: KeyboardEvent) {
            // Any key stops the countdown, exactly like GRUB.
            setSecondsLeft(null);

            if (event.key === 'ArrowUp') {
                event.preventDefault();
                setSelectedIndex((index) => Math.max(0, index - 1));
            } else if (event.key === 'ArrowDown') {
                event.preventDefault();
                setSelectedIndex((index) => Math.min(versions.length - 1, index + 1));
            } else if (event.key === 'Home') {
                setSelectedIndex(0);
            } else if (event.key === 'End') {
                setSelectedIndex(versions.length - 1);
            } else if (event.key === 'Enter') {
                boot(versions[selectedIndex]);
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [booting, selectedIndex]);

    if (booting) {
        return (
            <main className={styles.screen}>
                <pre className={styles.log}>{bootLog(booting).slice(0, visibleLines).join('\n')}</pre>
            </main>
        );
    }

    return (
        <main className={styles.screen}>
            <p className={styles.title}>GNU GRUB version 2.12</p>

            {/*
             * Each entry is a button, so it can be clicked and focused like
             * any control. The arrow keys are handled for the whole page
             * above, the way GRUB responds to arrows no matter what.
             */}
            <ul className={styles.menu} aria-label="Versions to boot">
                {versions.map((version, index) => {
                    const selected = index === selectedIndex;

                    return (
                        <li key={version.number} ref={selected ? selectedRef : undefined}>
                            <button
                                type="button"
                                className={styles.entry}
                                aria-current={selected ? 'true' : undefined}
                                onClick={() => {
                                    setSecondsLeft(null);
                                    setSelectedIndex(index);
                                }}
                                onDoubleClick={() => boot(version)}
                            >
                                {selected ? '*' : ' '}stephenmatheis.com v{version.number} · {version.name} (
                                {version.framework})
                            </button>
                        </li>
                    );
                })}
            </ul>

            <p className={styles.help}>
                Use the ↑ and ↓ keys to select which entry is highlighted.
                <br />
                Press enter to boot the selected version (or double-click it).
                {secondsLeft !== null && (
                    <>
                        <br />
                        The highlighted entry will be executed automatically in {secondsLeft}s.
                    </>
                )}
            </p>
        </main>
    );
}
