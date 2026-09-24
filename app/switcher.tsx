'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { views } from './views';
import styles from './switcher.module.css';

/**
 * The view switcher: a row of view names pinned to the bottom-right corner,
 * on every page.
 *
 * Every view has its own look, from a black terminal to a white browser, and
 * the switcher has to stay readable on all of them without restyling it per
 * view. The trick is `mix-blend-mode: difference` in the stylesheet: white
 * text "subtracts" itself from whatever is underneath, so it comes out light
 * on dark backgrounds and dark on light ones.
 *
 * `[` and `]` step to the previous and next view. Those keys were picked
 * because the views use the arrow keys, digits, and letters themselves.
 */
export function Switcher() {
    const pathname = usePathname();
    const router = useRouter();

    const currentIndex = views.findIndex((view) => view.path === pathname);

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            // Don't hijack brackets while someone is typing, e.g. in the ssh view.
            const target = event.target as HTMLElement;

            if (target.closest('input, textarea, [contenteditable="true"]')) {
                return;
            }

            if (event.key !== '[' && event.key !== ']') {
                return;
            }

            // Wrap around at both ends. Adding views.length before the modulo
            // keeps -1 from turning into a negative index.
            const step = event.key === ']' ? 1 : -1;
            const nextIndex = (Math.max(currentIndex, 0) + step + views.length) % views.length;

            router.push(views[nextIndex].path);
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex, router]);

    return (
        <nav className={styles.switcher} aria-label="Views">
            {views.map((view) => (
                <Link
                    key={view.path}
                    href={view.path}
                    title={view.description}
                    aria-current={view.path === pathname ? 'page' : undefined}
                >
                    {view.name}
                </Link>
            ))}
        </nav>
    );
}
