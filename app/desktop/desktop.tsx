'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { FittedFrame } from '../fitted-frame';
import { useIsClient } from '../use-is-client';
import { versions, versionShot, versionUrl, type Version } from '../versions';
import styles from './desktop.module.css';

/**
 * A Windows 95–style desktop with an icon for every version.
 *
 * Double-click an icon (or select it and press Enter) to open the version in
 * a window. Windows can be dragged by their title bars, stacked, and closed.
 * The taskbar lists what's open, and the Start menu has everything by year.
 *
 * The taskbar is along the top instead of the bottom, which Windows allowed,
 * so it doesn't collide with the view switcher in the bottom-right corner.
 */

type OpenWindow = {
    /** Unique per window, so the same version can be open twice. */
    id: number;
    version: Version;
    x: number;
    y: number;

    /** Stacking order: the window clicked most recently has the highest. */
    order: number;
};

/** Each new window opens a bit down and right of the last, like Windows. */
const cascadeStep = 28;

export function Desktop() {
    const [windows, setWindows] = useState<OpenWindow[]>([]);
    const [selectedIcon, setSelectedIcon] = useState<number | null>(null);
    const [startOpen, setStartOpen] = useState(false);

    // Counters that only ever go up, for window ids and stacking order.
    const nextId = useRef(1);
    const nextOrder = useRef(1);

    function openWindow(version: Version) {
        const cascade = (windows.length % 8) * cascadeStep;

        setWindows((current) => [
            ...current,
            {
                id: nextId.current++,
                version,
                x: 120 + cascade,
                y: 60 + cascade,
                order: nextOrder.current++,
            },
        ]);
        setStartOpen(false);
    }

    function focusWindow(id: number) {
        setWindows((current) =>
            current.map((openWindow) =>
                openWindow.id === id ? { ...openWindow, order: nextOrder.current++ } : openWindow,
            ),
        );
    }

    function moveWindow(id: number, x: number, y: number) {
        setWindows((current) =>
            current.map((openWindow) => (openWindow.id === id ? { ...openWindow, x, y } : openWindow)),
        );
    }

    function closeWindow(id: number) {
        setWindows((current) => current.filter((openWindow) => openWindow.id !== id));
    }

    const topOrder = Math.max(0, ...windows.map((openWindow) => openWindow.order));

    // Versions grouped by the year they froze, for the Start menu.
    const years = [...new Set(versions.map((version) => version.frozen.slice(0, 4)))];

    return (
        <main className={styles.desktop}>
            <header className={styles.taskbar}>
                <button
                    type="button"
                    className={styles.startButton}
                    aria-expanded={startOpen}
                    onClick={() => setStartOpen((open) => !open)}
                >
                    <span className={styles.logo} aria-hidden="true" />
                    Start
                </button>

                <div className={styles.tasks}>
                    {windows.map((openWindow) => (
                        <button
                            key={openWindow.id}
                            type="button"
                            className={styles.task}
                            aria-pressed={openWindow.order === topOrder}
                            onClick={() => focusWindow(openWindow.id)}
                        >
                            v{openWindow.version.number} {openWindow.version.name}
                        </button>
                    ))}
                </div>

                <Clock />
            </header>

            {startOpen && (
                <nav className={styles.startMenu} aria-label="Start menu">
                    <div className={styles.startBanner}>
                        stephenmatheis<b>95</b>
                    </div>
                    <div className={styles.startItems}>
                        {years.map((year) => (
                            <div key={year}>
                                <div className={styles.startYear}>📁 {year}</div>
                                {versions
                                    .filter((version) => version.frozen.startsWith(year))
                                    .map((version) => (
                                        <button key={version.number} type="button" onClick={() => openWindow(version)}>
                                            v{version.number} {version.name}
                                        </button>
                                    ))}
                            </div>
                        ))}
                    </div>
                </nav>
            )}

            {/* Clicking empty desktop deselects the icon and closes the Start menu. */}
            <div
                className={styles.icons}
                onPointerDown={(event) => {
                    if (event.target === event.currentTarget) {
                        setSelectedIcon(null);
                        setStartOpen(false);
                    }
                }}
            >
                {versions.map((version) => (
                    <button
                        key={version.number}
                        type="button"
                        className={styles.icon}
                        aria-pressed={selectedIcon === version.number}
                        onClick={() => setSelectedIcon(version.number)}
                        onDoubleClick={() => openWindow(version)}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                openWindow(version);
                            }
                        }}
                    >
                        <span className={styles.iconImage}>
                            <Image src={versionShot(version)} alt="" fill sizes="48px" />
                        </span>
                        <span className={styles.iconLabel}>
                            v{version.number} {version.name}.htm
                        </span>
                    </button>
                ))}
            </div>

            {windows.map((openWindow) => (
                <Window
                    key={openWindow.id}
                    openWindow={openWindow}
                    active={openWindow.order === topOrder}
                    onFocus={() => focusWindow(openWindow.id)}
                    onMove={(x, y) => moveWindow(openWindow.id, x, y)}
                    onClose={() => closeWindow(openWindow.id)}
                />
            ))}
        </main>
    );
}

type WindowProps = {
    openWindow: OpenWindow;
    active: boolean;
    onFocus: () => void;
    onMove: (x: number, y: number) => void;
    onClose: () => void;
};

/**
 * One draggable window.
 *
 * Dragging uses pointer capture: on pointer down, the title bar "captures"
 * the pointer, so every move event goes to it until release, even when the
 * cursor races ahead over the iframe inside the window. Without capture, the
 * iframe would swallow the moves and the drag would stall.
 */
function Window({ openWindow, active, onFocus, onMove, onClose }: WindowProps) {
    // Where the pointer grabbed the title bar, relative to the window's corner.
    const grabOffset = useRef<{ x: number; y: number } | null>(null);

    function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
        // Leave clicks on the title bar's buttons alone.
        if ((event.target as HTMLElement).closest('button')) {
            return;
        }

        onFocus();
        event.currentTarget.setPointerCapture(event.pointerId);
        grabOffset.current = {
            x: event.clientX - openWindow.x,
            y: event.clientY - openWindow.y,
        };
    }

    function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
        if (!grabOffset.current) {
            return;
        }

        // Keep the title bar on screen so the window can always be grabbed back.
        const x = Math.min(Math.max(event.clientX - grabOffset.current.x, -400), window.innerWidth - 80);
        const y = Math.min(Math.max(event.clientY - grabOffset.current.y, 30), window.innerHeight - 40);

        onMove(x, y);
    }

    function handlePointerUp() {
        grabOffset.current = null;
    }

    const { version } = openWindow;

    return (
        <section
            className={styles.window}
            aria-label={`v${version.number} ${version.name}`}
            style={{
                left: openWindow.x,
                top: openWindow.y,
                zIndex: 10 + openWindow.order,
            }}
            onPointerDown={onFocus}
        >
            <div
                className={styles.titleBar}
                data-active={active || undefined}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
            >
                <span>
                    v{version.number} {version.name} - Internet Explorer
                </span>
                <span className={styles.titleButtons}>
                    <a href={versionUrl(version)} title="Open in its own page">
                        ↗
                    </a>
                    <button type="button" onClick={onClose} aria-label="Close">
                        ×
                    </button>
                </span>
            </div>

            <div className={styles.windowBody}>
                <FittedFrame src={versionUrl(version)} title={version.name} />
            </div>
        </section>
    );
}

/**
 * The taskbar clock, like the one in the corner of every Windows screen.
 * Client-only (see useIsClient), since the server doesn't know your time.
 */
function Clock() {
    const isClient = useIsClient();
    const [now, setNow] = useState(() => new Date());

    useEffect(() => {
        const interval = window.setInterval(() => setNow(new Date()), 10_000);

        return () => window.clearInterval(interval);
    }, []);

    return (
        <time className={styles.clock}>
            {isClient ? now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) : ''}
        </time>
    );
}
