'use client';

import { useRef } from 'react';
import { colorVars, ColorProps } from '../colors';
import styles from './TiltCard.module.scss';

type TiltCardProps = ColorProps & {
    title: string;
    meta?: string;
    href: string;
    className?: string;
};

const MAX_TILT = 10;
const LIFT = 14;

// Perspective tilt driven by cursor position within the card, plus a
// radial "sheen" that tracks the same point — both pushed straight to
// CSS custom properties via setProperty rather than React state, same
// non-rerender technique Ring uses for its own pointer-driven tilt.
export function TiltCard({ title, meta, href, className, background, foreground, accent }: TiltCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);

    function handleMouseMove(event: React.MouseEvent<HTMLAnchorElement>) {
        const bounds = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width;
        const y = (event.clientY - bounds.top) / bounds.height;

        cardRef.current?.style.setProperty('--ry', `${(x - 0.5) * MAX_TILT * 2}deg`);
        cardRef.current?.style.setProperty('--rx', `${(y - 0.5) * -MAX_TILT * 2}deg`);
        cardRef.current?.style.setProperty('--mx', `${x * 100}%`);
        cardRef.current?.style.setProperty('--my', `${y * 100}%`);
    }

    function handleMouseEnter() {
        cardRef.current?.style.setProperty('--tz', `${LIFT}px`);
    }

    function handleMouseLeave() {
        cardRef.current?.style.setProperty('--rx', '0deg');
        cardRef.current?.style.setProperty('--ry', '0deg');
        cardRef.current?.style.setProperty('--tz', '0px');
    }

    return (
        <a
            className={`${styles.wrap} ${className ?? ''}`}
            href={href}
            target="_blank"
            rel="noreferrer"
            style={colorVars({ background, foreground, accent })}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className={styles.card} ref={cardRef}>
                <span className={`${styles.corner} ${styles.tl}`} />
                <span className={`${styles.corner} ${styles.tr}`} />
                <span className={`${styles.corner} ${styles.bl}`} />
                <span className={`${styles.corner} ${styles.br}`} />

                <span className={styles.sheen} />

                <div className={styles.title}>{title}</div>
                {meta !== undefined && <div className={styles.meta}>{meta}</div>}
                <div className={styles.arrow}>→</div>
            </div>
        </a>
    );
}
