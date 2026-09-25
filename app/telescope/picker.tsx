'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { effort, lastWords } from '../facts';
import { versions, versionShot, versionUrl, type Version } from '../versions';
import { fuzzyMatch } from './fuzzy';
import styles from './picker.module.css';

/**
 * Telescope, Neovim's fuzzy finder, searching the versions.
 *
 * It floats over a pretend Neovim buffer, like the real plugin: a prompt,
 * the matching results, and a preview of whichever result is selected. Type
 * to filter, ↑/↓ (or Ctrl-n / Ctrl-p) to move, Enter to open.
 */

/** The text each version is searched by, and shown as, in the results. */
function searchLine(version: Version) {
    return `v${version.number} ${version.name} · ${version.branch} · ${version.framework}`;
}

/**
 * Draws a result line with its matched letters highlighted, the way
 * Telescope colors the characters your query hit.
 */
function Highlighted({ text, positions }: { text: string; positions: number[] }) {
    const matched = new Set(positions);

    return (
        <>
            {[...text].map((character, index) =>
                matched.has(index) ? (
                    <mark key={index} className={styles.match}>
                        {character}
                    </mark>
                ) : (
                    character
                ),
            )}
        </>
    );
}

export function Picker() {
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);

    const selectedRef = useRef<HTMLLIElement>(null);

    // Score every version against the query, drop non-matches, best first.
    // With an empty query everything matches, newest first.
    const results = versions
        .map((version) => ({ version, match: fuzzyMatch(query, searchLine(version)) }))
        .filter((result) => result.match !== null)
        .sort((a, b) => b.match!.score - a.match!.score || b.version.number - a.version.number);

    // Typing can shrink the list below the current selection, so clamp it.
    const safeIndex = Math.min(selectedIndex, Math.max(0, results.length - 1));
    const selected = results[safeIndex]?.version;

    useEffect(() => {
        selectedRef.current?.scrollIntoView({ block: 'nearest' });
    }, [safeIndex, query]);

    function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
        const down = event.key === 'ArrowDown' || (event.ctrlKey && (event.key === 'n' || event.key === 'j'));
        const up = event.key === 'ArrowUp' || (event.ctrlKey && (event.key === 'p' || event.key === 'k'));

        if (down) {
            event.preventDefault();
            setSelectedIndex(Math.min(results.length - 1, safeIndex + 1));
        } else if (up) {
            event.preventDefault();
            setSelectedIndex(Math.max(0, safeIndex - 1));
        } else if (event.key === 'Enter' && selected) {
            window.location.assign(versionUrl(selected));
        } else if (event.key === 'Escape') {
            setQuery('');
        }
    }

    return (
        <main className={styles.editor}>
            {/* The pretend buffer underneath: line numbers and empty-line tildes. */}
            <div className={styles.buffer} aria-hidden="true">
                {Array.from({ length: 60 }, (_, index) => (
                    <div key={index}>
                        <span className={styles.lineNumber}>{index < 3 ? index + 1 : ''}</span>
                        {index === 0 && <span className={styles.code}>{'// the archive, 42 versions deep'}</span>}
                        {index >= 3 && <span className={styles.tilde}>~</span>}
                    </div>
                ))}
            </div>

            <div className={styles.statusLine} aria-hidden="true">
                <span className={styles.mode}>NORMAL</span>
                <span>versions.ts</span>
                <span className={styles.statusRight}>utf-8 · typescript · 1:1</span>
            </div>

            <div className={styles.floating}>
                <div className={styles.left}>
                    <label className={styles.prompt}>
                        <span className={styles.title}>Find Versions</span>
                        <span className={styles.caret}>&gt;</span>
                        <input
                            value={query}
                            onChange={(event) => {
                                setQuery(event.target.value);
                                setSelectedIndex(0);
                            }}
                            onKeyDown={handleKeyDown}
                            aria-label="Search versions"
                            autoComplete="off"
                            spellCheck={false}
                            // The picker is the whole page, so it opens ready to type,
                            // the same as Telescope does.
                            // eslint-disable-next-line jsx-a11y/no-autofocus
                            autoFocus
                        />
                        <span className={styles.count}>
                            {results.length} / {versions.length}
                        </span>
                    </label>

                    <div className={styles.results}>
                        <span className={styles.title}>Results</span>
                        <ul>
                            {results.map(({ version, match }, index) => (
                                <li
                                    key={version.number}
                                    ref={index === safeIndex ? selectedRef : undefined}
                                    data-selected={index === safeIndex || undefined}
                                >
                                    <button
                                        type="button"
                                        tabIndex={-1}
                                        onClick={() => setSelectedIndex(index)}
                                        onDoubleClick={() => window.location.assign(versionUrl(version))}
                                    >
                                        <span className={styles.pointer}>{index === safeIndex ? '> ' : '  '}</span>
                                        <Highlighted text={searchLine(version)} positions={match!.positions} />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className={styles.preview}>
                    <span className={styles.title}>Preview</span>
                    {selected ? (
                        <>
                            <div className={styles.shot}>
                                <Image src={versionShot(selected)} alt="" fill sizes="600px" />
                            </div>
                            <pre className={styles.details}>
                                {[
                                    `url         ${versionUrl(selected)}`,
                                    `branch      ${selected.branch} @ ${selected.commit}`,
                                    `built with  ${selected.framework}`,
                                    `worked on   ${selected.started} → ${selected.frozen}`,
                                    `effort      ${effort(selected)}`,
                                    `last words  "${lastWords(selected)}"`,
                                ].join('\n')}
                            </pre>
                        </>
                    ) : (
                        <p className={styles.empty}>No matches.</p>
                    )}
                </div>
            </div>
        </main>
    );
}
