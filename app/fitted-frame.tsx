'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './fitted-frame.module.css';

/**
 * The size every version is shown at: a common laptop window, and the same
 * size as the screenshots.
 */
export const desktopWidth = 1280;
export const desktopHeight = 800;

type FittedFrameProps = {
    src: string;
    title: string;

    /** Called when the page inside has finished loading. */
    onLoad?: () => void;
};

/**
 * An iframe that shows a site as it looks on a desktop, shrunk to fit its box.
 *
 * A plain iframe in a small box makes the site inside think it's on a phone,
 * so it switches to its mobile layout. That's not what an old TV or a camera
 * feed should show. So the iframe is always rendered at the full desktop size,
 * and a CSS transform scales it down to fit. The site lays itself out for
 * 1280 × 800, and we just look at it from further away.
 *
 * A ResizeObserver keeps the scale right as the box changes size, e.g. when
 * the window is resized.
 */
export function FittedFrame({ src, title, onLoad }: FittedFrameProps) {
    const boxRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(0);

    useEffect(() => {
        const box = boxRef.current;

        if (!box) {
            return;
        }

        const observer = new ResizeObserver(([entry]) => {
            // Fit the whole desktop inside the box: whichever side runs out of
            // room first decides the scale.
            const { width, height } = entry.contentRect;

            setScale(Math.min(width / desktopWidth, height / desktopHeight));
        });

        observer.observe(box);

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={boxRef} className={styles.box}>
            <iframe
                className={styles.frame}
                src={src}
                title={title}
                onLoad={onLoad}
                width={desktopWidth}
                height={desktopHeight}
                style={{
                    // Hidden until the first measurement, so it never flashes
                    // at full size before shrinking.
                    visibility: scale === 0 ? 'hidden' : 'visible',
                    transform: `translate(-50%, -50%) scale(${scale})`,
                }}
            />
        </div>
    );
}
