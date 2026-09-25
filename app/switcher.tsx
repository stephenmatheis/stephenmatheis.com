'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { viewGroups, views } from './views';
import styles from './switcher.module.css';

/**
 * The view switcher, pinned to the bottom-right corner of every page.
 *
 * With nearly thirty views, a row of every name no longer fits, so it's two
 * pieces:
 *
 * - A small bar: ‹ previous, the current view's name, next ›, and a "views"
 *   button. It uses `mix-blend-mode: difference`, so it inverts whatever is
 *   behind it and stays readable on light and dark views alike.
 * - A menu that opens above it, listing every view by group. It has a solid
 *   background instead, because a whole menu of inverted text over a busy
 *   page would be hard to read.
 *
 * They're separate fixed elements, not one inside the other. A blend mode
 * only blends with what's behind its own stacking context, so if the bar
 * lived inside a positioned wrapper, it would blend with the empty wrapper
 * instead of the page.
 *
 * Keys: `[` and `]` step through views, and `\` opens or closes the menu.
 * The views use arrows, digits, and letters themselves, so the switcher
 * sticks to keys nothing else needs.
 */
export function Switcher() {
    const pathname = usePathname();
    const router = useRouter();

    /**
     * Which page the menu was opened on, or null when it's closed.
     *
     * Storing the page instead of a plain true/false means the menu closes by
     * itself when you navigate: the new page doesn't match, so it reads as
     * closed. No effect is needed to watch for page changes and reset it.
     */
    const [menuOpenedOn, setMenuOpenedOn] = useState<string | null>(null);
    const menuOpen = menuOpenedOn === pathname;

    function toggleMenu() {
        setMenuOpenedOn((openedOn) => (openedOn === pathname ? null : pathname));
    }

    const currentIndex = Math.max(
        views.findIndex((view) => view.path === pathname),
        0,
    );

    // Wrap around at both ends. Adding views.length before the modulo keeps
    // -1 from turning into a negative index.
    const previous = views[(currentIndex - 1 + views.length) % views.length];
    const next = views[(currentIndex + 1) % views.length];
    const current = views[currentIndex];

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            // Don't hijack keys while someone is typing, e.g. in the ssh view.
            const target = event.target as HTMLElement;

            if (target.closest('input, textarea, [contenteditable="true"]')) {
                return;
            }

            if (event.key === '[') {
                router.push(previous.path);
            } else if (event.key === ']') {
                router.push(next.path);
            } else if (event.key === '\\') {
                setMenuOpenedOn((openedOn) => (openedOn === pathname ? null : pathname));
            } else if (event.key === 'Escape') {
                setMenuOpenedOn(null);
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [previous, next, router, pathname]);

    return (
        <>
            {menuOpen && (
                <nav id="view-menu" className={styles.menu} aria-label="All views">
                    {viewGroups.map((group) => (
                        <div key={group.id} className={styles.group}>
                            <h2>{group.label}</h2>

                            {views
                                .filter((view) => view.group === group.id)
                                .map((view) => (
                                    <Link
                                        key={view.path}
                                        href={view.path}
                                        title={view.description}
                                        aria-current={view.path === current.path ? 'page' : undefined}
                                    >
                                        {view.name}
                                    </Link>
                                ))}
                        </div>
                    ))}
                </nav>
            )}

            <div className={styles.bar}>
                <Link href={previous.path} title={`Previous: ${previous.name} ( [ )`} aria-label="Previous view">
                    ‹
                </Link>

                <span className={styles.current} title={current.description}>
                    [{current.name}]
                </span>

                <Link href={next.path} title={`Next: ${next.name} ( ] )`} aria-label="Next view">
                    ›
                </Link>

                <button
                    type="button"
                    onClick={toggleMenu}
                    aria-expanded={menuOpen}
                    aria-controls="view-menu"
                    title="All views ( \ )"
                >
                    views
                </button>
            </div>
        </>
    );
}
