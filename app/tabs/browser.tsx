'use client';

import { useState } from 'react';
import { versions, versionUrl } from '../versions';
import styles from './browser.module.css';

/**
 * A browser window with one tab per version, all 42 open at once.
 *
 * With that many tabs, each one gets squeezed until only its icon shows,
 * exactly like a real browser. The tab strip is a flex row where every tab
 * can shrink to nothing (`min-width: 0`), except the active one, which keeps
 * enough room to read its title.
 *
 * Tabs can be closed, and `+` reopens the most recently closed one, like
 * ⌘⇧T. Closing all of them gets you a small reward.
 */
export function Browser() {
    // Open tabs, as version numbers, in tab-strip order.
    const [openTabs, setOpenTabs] = useState(() => versions.map((version) => version.number));

    // Closed tabs, most recent last, so `+` can reopen them in reverse order.
    const [closedTabs, setClosedTabs] = useState<number[]>([]);

    // Start on the newest version, the rightmost tab.
    const [activeTab, setActiveTab] = useState(versions.length);

    const activeVersion = versions[activeTab - 1];

    function closeTab(number: number) {
        const index = openTabs.indexOf(number);
        const remaining = openTabs.filter((tab) => tab !== number);

        setOpenTabs(remaining);
        setClosedTabs((closed) => [...closed, number]);

        // Closing the active tab activates its neighbor, like real browsers:
        // the one to the right, or the one to the left if it was the last.
        if (number === activeTab && remaining.length > 0) {
            setActiveTab(remaining[Math.min(index, remaining.length - 1)]);
        }
    }

    function reopenLastClosed() {
        const number = closedTabs.at(-1);

        if (number === undefined) {
            return;
        }

        setClosedTabs((closed) => closed.slice(0, -1));

        // Put it back in its original spot, keeping the strip in version order.
        setOpenTabs((open) => [...open, number].sort((a, b) => a - b));
        setActiveTab(number);
    }

    function reopenAll() {
        setOpenTabs(versions.map((version) => version.number));
        setClosedTabs([]);
        setActiveTab(versions.length);
    }

    const allClosed = openTabs.length === 0;

    return (
        <main className={styles.window}>
            <div className={styles.tabStrip} role="tablist" aria-label="Versions">
                <span className={styles.trafficLights} aria-hidden="true">
                    <span />
                    <span />
                    <span />
                </span>

                {openTabs.map((number) => {
                    const version = versions[number - 1];
                    const isActive = number === activeTab;

                    return (
                        <div
                            key={number}
                            className={styles.tab}
                            role="tab"
                            aria-selected={isActive}
                            tabIndex={isActive ? 0 : -1}
                            title={`${version.name} · ${versionUrl(version)}`}
                            onClick={() => setActiveTab(number)}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter' || event.key === ' ') {
                                    setActiveTab(number);
                                }
                            }}
                        >
                            <span className={styles.favicon}>{number}</span>
                            <span className={styles.tabTitle}>{version.name}</span>
                            <button
                                type="button"
                                className={styles.closeTab}
                                aria-label={`Close ${version.name}`}
                                onClick={(event) => {
                                    // Don't also activate the tab being closed.
                                    event.stopPropagation();
                                    closeTab(number);
                                }}
                            >
                                ×
                            </button>
                        </div>
                    );
                })}

                <button
                    type="button"
                    className={styles.newTab}
                    onClick={reopenLastClosed}
                    disabled={closedTabs.length === 0}
                    aria-label="Reopen closed tab"
                    title="Reopen closed tab"
                >
                    +
                </button>
            </div>

            <div className={styles.toolbar}>
                <span className={styles.navigation} aria-hidden="true">
                    ← → ↻
                </span>
                <span className={styles.addressBar}>{allClosed ? '' : versionUrl(activeVersion)}</span>
            </div>

            <div className={styles.content}>
                {allClosed ? (
                    <div className={styles.empty}>
                        <p>You closed all {versions.length} tabs.</p>
                        <p>Feels good, right?</p>
                        <button type="button" onClick={reopenAll}>
                            Reopen them all
                        </button>
                    </div>
                ) : (
                    // Keyed so switching tabs loads the new site fresh.
                    <iframe
                        key={activeTab}
                        className={styles.page}
                        src={versionUrl(activeVersion)}
                        title={activeVersion.name}
                    />
                )}
            </div>
        </main>
    );
}
