'use client';

import { useEffect, useRef, useState } from 'react';
import { lastWords } from '../facts';
import { FittedFrame } from '../fitted-frame';
import { versions, versionUrl } from '../versions';
import styles from './bisect.module.css';

/**
 * `git bisect`, pointed at the site's history.
 *
 * Real bisect finds the commit that broke something. You tell git one commit
 * that's good and one that's bad, and it keeps checking out the commit
 * halfway between them. You test it and say "good" or "bad", and each answer
 * throws away half of the remaining history. Even a long history takes just a
 * handful of steps: 42 versions need at most 6 answers.
 *
 * Here "bad" means whatever you want it to mean. The punchline is the same
 * deadpan line git prints: "v26 is the first bad commit".
 */

type Mark = 'good' | 'bad';

/**
 * Git's progress line: roughly how many versions are still in question after
 * this test, and how many more answers that will take.
 */
function progressLine(good: number, bad: number) {
    const remainingAfterThis = Math.floor((bad - good - 1) / 2);
    const steps = remainingAfterThis > 0 ? Math.ceil(Math.log2(remainingAfterThis + 1)) : 0;

    return `Bisecting: ${remainingAfterThis} revisions left to test after this (roughly ${steps} steps)`;
}

/** The version halfway between the current good and bad ones. */
function midpoint(good: number, bad: number) {
    return Math.floor((good + bad) / 2);
}

function checkoutLine(number: number) {
    const version = versions[number - 1];

    return `[${version.commit}] v${version.number} ${version.name}: ${version.lastCommitMessage}`;
}

// Where every session starts: the oldest version assumed good, the newest bad.
const startingGood = 1;
const startingBad = versions.length;

const startingLog = [
    '$ git bisect start',
    `$ git bisect bad v${startingBad}`,
    `$ git bisect good v${startingGood}`,
    progressLine(startingGood, startingBad),
    checkoutLine(midpoint(startingGood, startingBad)),
];

export function Bisect() {
    const [good, setGood] = useState(startingGood);
    const [bad, setBad] = useState(startingBad);
    const [log, setLog] = useState(startingLog);

    const logEndRef = useRef<HTMLDivElement>(null);

    // Adjacent good and bad versions means the search is over: `bad` is the
    // first bad one.
    const finished = bad - good === 1;
    const testing = finished ? bad : midpoint(good, bad);
    const version = versions[testing - 1];

    function mark(verdict: Mark) {
        if (finished) {
            return;
        }

        const nextGood = verdict === 'good' ? testing : good;
        const nextBad = verdict === 'bad' ? testing : bad;
        const lines = [`$ git bisect ${verdict}`];

        if (nextBad - nextGood === 1) {
            const culprit = versions[nextBad - 1];

            lines.push(
                `v${culprit.number} is the first bad commit`,
                `commit ${culprit.commit}`,
                `Date:   ${culprit.frozen}`,
                '',
                `    ${culprit.lastCommitMessage}`,
            );
        } else {
            lines.push(progressLine(nextGood, nextBad), checkoutLine(midpoint(nextGood, nextBad)));
        }

        setGood(nextGood);
        setBad(nextBad);
        setLog((existing) => [...existing, ...lines]);
    }

    // Start over, keeping the old session above in the log like a terminal would.
    function reset() {
        setGood(startingGood);
        setBad(startingBad);
        setLog((existing) => [...existing, '$ git bisect reset', '', ...startingLog]);
    }

    // Keep the newest log line in view.
    useEffect(() => {
        logEndRef.current?.scrollIntoView({ block: 'end' });
    }, [log]);

    // g and b answer from the keyboard. No dependency list on purpose: the
    // listener is re-attached after every render, so it always calls the
    // latest `mark`, which knows the current good and bad versions.
    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'g') {
                mark('good');
            } else if (event.key === 'b') {
                mark('bad');
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    });

    return (
        <main className={styles.bisect}>
            <section className={styles.terminal} aria-label="git bisect log" aria-live="polite">
                <pre>{log.join('\n')}</pre>
                <div ref={logEndRef} />
            </section>

            <section className={styles.testBench}>
                <p className={styles.question}>
                    {finished ? (
                        <>
                            Found it: <strong>v{version.number}</strong>, “{lastWords(version)}”.
                        </>
                    ) : (
                        <>
                            Is{' '}
                            <strong>
                                v{version.number} · {version.name}
                            </strong>{' '}
                            good or bad?
                        </>
                    )}
                </p>

                <div className={styles.preview}>
                    <FittedFrame key={testing} src={versionUrl(version)} title={version.name} />
                </div>

                <div className={styles.actions}>
                    {finished ? (
                        <>
                            <button type="button" onClick={reset}>
                                git bisect reset
                            </button>
                            <a href={versionUrl(version)}>open v{version.number} ↗</a>
                        </>
                    ) : (
                        <>
                            <button type="button" className={styles.good} onClick={() => mark('good')}>
                                good (g)
                            </button>
                            <button type="button" className={styles.bad} onClick={() => mark('bad')}>
                                bad (b)
                            </button>
                        </>
                    )}
                </div>
            </section>
        </main>
    );
}
