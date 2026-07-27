'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { colorVars, ColorProps } from '../colors';
import { EventProps } from '../events';
import styles from './Hotspot.module.scss';

const VIEWPORT_MARGIN = 8;

type HotspotProps = ColorProps &
    EventProps & {
        leftPct: number;
        topPct: number;
        legDx: number;
        legDy: number;
        label: string;
        children: React.ReactNode;
    };

type Rect = { left: number; top: number; right: number; bottom: number };

// Scored as two independent axes rather than one all-or-nothing check: a
// panel taller than the viewport can never satisfy a combined check on any
// of the 4 candidates, which left the horizontal axis (the one that COULD
// still be satisfied) up to overlap-avoidance alone and occasionally
// picked a badly off-screen side. Splitting them means a too-tall panel
// still gets pinned correctly left-right even though it can't help clipping
// top/bottom.
function fitsHorizontally(rect: Rect) {
    return rect.left >= VIEWPORT_MARGIN && rect.right <= window.innerWidth - VIEWPORT_MARGIN;
}

function fitsVertically(rect: Rect) {
    return rect.top >= VIEWPORT_MARGIN && rect.bottom <= window.innerHeight - VIEWPORT_MARGIN;
}

function overlaps(a: Rect, b: Rect) {
    return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
}

// A marker at a real point on a component; click it and a panel floats
// out on an elbowed (or, at legDx=0, straight) leader line. legDx/legDy
// are a preferred direction — once the panel mounts, its rendered bounds
// get checked against the viewport AND every other currently-open panel
// (queried straight from the DOM — Hotspot instances don't share a
// parent, so this is simpler than threading a shared registry through
// context), and whichever of the 4 dx/dy sign combinations clears both
// wins. A candidate that at least fits the viewport beats one that
// doesn't, even if it still overlaps a sibling — cut off by the browser
// window is worse than overlapping.
//
// leftPct/topPct are plain CSS percentages against the nearest positioned
// ancestor — that's why this works unchanged on a variable-height
// component like Frame, not just a fixed-aspect one like Ring: 0%/100%
// always mean "the current edge," whatever the current size happens to
// be. Wrap the host component in a `position: relative` container (plus
// `display: inline-block`, or an explicit width if the host's own width
// is itself a percentage) for Hotspot children to position against.
export function Hotspot({
    leftPct,
    topPct,
    legDx: preferredDx,
    legDy: preferredDy,
    label,
    children,
    background,
    foreground,
    accent,
    onMouseEnter,
    onMouseLeave,
    onMouseOver,
    onClick,
}: HotspotProps) {
    const [open, setOpen] = useState(false);
    // null = "use the preferred direction" — the measurement below only
    // ever runs against a render that used the preferred position, never
    // against a previously-flipped one, which is what let the flip stick
    // on the wrong side after closing and reopening.
    const [flip, setFlip] = useState<{ dx: number; dy: number } | null>(null);
    // A separate, purely additive nudge on top of flip's orientation pick —
    // dx/dy's sign also selects which edge of the panel anchors to the
    // corner (see the transform below), so folding a nudge into dx/dy
    // directly can cross zero and flip the anchor edge outright instead of
    // sliding the panel smoothly into view.
    const [correction, setCorrection] = useState<{ x: number; y: number } | null>(null);
    const hotspotRef = useRef<HTMLButtonElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!open) {
            setFlip(null);
            setCorrection(null);
            return;
        }

        const hotspot = hotspotRef.current;
        const panel = panelRef.current;
        if (!hotspot || !panel) return;

        const hotspotRect = hotspot.getBoundingClientRect();
        const hotspotX = hotspotRect.left + hotspotRect.width / 2;
        const hotspotY = hotspotRect.top + hotspotRect.height / 2;
        const { width, height } = panel.getBoundingClientRect();

        // Scoped to this hotspot's own positioning root (panel.offsetParent —
        // the nearest `position:relative` ancestor, i.e. the caller's stage
        // wrapper), not the whole document: a Ring's hotspots shouldn't have
        // to dodge a Frame's panels three sections down the page.
        const scopeRoot = panel.offsetParent ?? document;
        const siblingRects = Array.from(scopeRoot.getElementsByClassName(styles.panel))
            .filter((el) => el !== panel)
            .map((el) => el.getBoundingClientRect());

        function candidateRect(dx: number, dy: number): Rect {
            const cornerX = hotspotX + dx;
            const cornerY = hotspotY + dy;
            const left = dx >= 0 ? cornerX : cornerX - width;
            const top = dy >= 0 ? cornerY : cornerY - height;

            return { left, top, right: left + width, bottom: top + height };
        }

        const candidates: Array<[number, number]> = [
            [preferredDx, preferredDy],
            [-preferredDx, preferredDy],
            [preferredDx, -preferredDy],
            [-preferredDx, -preferredDy],
        ];

        let best = candidates[0];
        let bestScore = -1;

        for (const candidate of candidates) {
            const rect = candidateRect(candidate[0], candidate[1]);
            const score =
                (fitsHorizontally(rect) ? 1 : 0) +
                (fitsVertically(rect) ? 1 : 0) +
                (siblingRects.every((r) => !overlaps(rect, r)) ? 1 : 0);

            if (score > bestScore) {
                best = candidate;
                bestScore = score;
            }

            if (score === 3) break;
        }

        const [dx, dy] = best;
        setFlip(dx !== preferredDx || dy !== preferredDy ? { dx, dy } : null);

        // The 4 candidates are fixed offsets, not a search — none of them
        // may land fully on-screen (a panel taller than a short window,
        // say). Nudge the winner the rest of the way into bounds rather
        // than accepting whatever the nearest preset produced; the panel's
        // own max-height keeps this from ever being asked to shrink
        // something that's simply bigger than the viewport.
        const bestRect = candidateRect(dx, dy);
        let correctionX = 0;
        let correctionY = 0;

        if (bestRect.left < VIEWPORT_MARGIN) correctionX = VIEWPORT_MARGIN - bestRect.left;
        else if (bestRect.right > window.innerWidth - VIEWPORT_MARGIN)
            correctionX = window.innerWidth - VIEWPORT_MARGIN - bestRect.right;

        if (bestRect.top < VIEWPORT_MARGIN) correctionY = VIEWPORT_MARGIN - bestRect.top;
        else if (bestRect.bottom > window.innerHeight - VIEWPORT_MARGIN)
            correctionY = window.innerHeight - VIEWPORT_MARGIN - bestRect.bottom;

        setCorrection(correctionX !== 0 || correctionY !== 0 ? { x: correctionX, y: correctionY } : null);
        // Re-measures every time it opens (window size or the host component's
        // size may have changed since last time) — deliberately not depending
        // on the computed flip, or correcting the position would re-trigger
        // this effect.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, preferredDx, preferredDy]);

    const legDx = flip?.dx ?? preferredDx;
    const legDy = flip?.dy ?? preferredDy;
    const cornerLeft = `calc(${leftPct}% + ${legDx}px)`;
    const cornerTop = `calc(${topPct}% + ${legDy}px)`;

    return (
        <div
            style={colorVars({ background, foreground, accent })}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onMouseOver={onMouseOver}
            onClick={onClick}
        >
            <button
                ref={hotspotRef}
                type="button"
                className={styles.hotspot}
                data-open={open}
                onClick={() => setOpen((v) => !v)}
                aria-label={label}
                style={{ left: `${leftPct}%`, top: `${topPct}%` }}
            />

            {open && (
                <>
                    <span
                        className={styles.legH}
                        style={{
                            left: legDx >= 0 ? `${leftPct}%` : cornerLeft,
                            top: `${topPct}%`,
                            width: `${Math.abs(legDx)}px`,
                        }}
                    />
                    <span
                        className={styles.legV}
                        style={{
                            left: cornerLeft,
                            top: legDy >= 0 ? `${topPct}%` : cornerTop,
                            height: `${Math.abs(legDy)}px`,
                        }}
                    />
                    <div
                        ref={panelRef}
                        className={styles.panel}
                        style={{
                            left: cornerLeft,
                            top: cornerTop,
                            transform: `translate(calc(${legDx >= 0 ? '0%' : '-100%'} + ${correction?.x ?? 0}px), calc(${legDy >= 0 ? '0%' : '-100%'} + ${correction?.y ?? 0}px))`,
                        }}
                    >
                        <span className={`${styles.corner} ${styles.tl}`} />
                        <span className={`${styles.corner} ${styles.tr}`} />
                        <span className={`${styles.corner} ${styles.bl}`} />
                        <span className={`${styles.corner} ${styles.br}`} />
                        {children}
                    </div>
                </>
            )}
        </div>
    );
}
