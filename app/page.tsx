'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './page.module.scss';
import Link from 'next/link';

const CELL_WIDTH = 10.5;
const CELL_HEIGHT = 21;
const ROW_OFFSET = 2;
const COL_OFFSET = 8;
const links = [
    {
        href: '/test',
        label: 'TEST-LINK-0001',
    },
    {
        href: '/test',
        label: 'TEST-LINK-0002',
    },
];

function getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function Home() {
    const [cols, setCols] = useState(0);
    const [rows, setRows] = useState(0);
    const pageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function setDimensions() {
            setCols(Math.floor(window.innerWidth / CELL_WIDTH) - COL_OFFSET);
            setRows(Math.floor(window.innerHeight / CELL_HEIGHT) - ROW_OFFSET);
        }

        setDimensions();

        if (pageRef.current) {
            pageRef.current.style.opacity = '1';
        }

        window.addEventListener('resize', setDimensions);

        return () => window.removeEventListener('resize', setDimensions);
    }, []);

    return (
        <div ref={pageRef} className={styles.page} style={{ opacity: '0' }}>
            {Array.from({ length: rows - links.length }).map((_, i) => {
                return (
                    <div key={i} className={styles.line}>
                        <span className={styles.content}>
                            {Array.from({ length: cols })
                                .map(() => {
                                    const randomChar = getRandomIntInclusive(65, 90);

                                    return String.fromCodePoint(randomChar);
                                })
                                .join('')}
                        </span>
                    </div>
                );
            })}
            {links.map(({ href, label }, i) => {
                return (
                    <div key={i} className={styles.line}>
                        <span className={styles.content}>
                            {Array.from({ length: cols - label.length })
                                .map(() => {
                                    const randomChar = getRandomIntInclusive(65, 90);

                                    return String.fromCodePoint(randomChar);
                                })
                                .join('')}
                            <Link href={href} className={styles.link}>
                                {label}
                            </Link>
                        </span>
                    </div>
                );
            })}
        </div>
    );
}
