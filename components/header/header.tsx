'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import contact from '@/data/contact';
import styles from './header.module.scss';

export function Header({ printOnly = false }) {
    const { text, href, label }: { text: string; href: string; label: string } =
        contact.find(({ header }) => header)!;
    const linksRef = useRef<HTMLDivElement>(null!);

    useEffect(() => {
        document.documentElement.style.scrollBehavior = 'smooth';
    }, []);

    return (
        <header
            className={[
                styles.header,
                ...(printOnly ? [styles['print-only']] : []),
            ].join(' ')}
            data-header
        >
            <Link
                className={styles.name}
                href="/"
                aria-label="Stephen Matheis Front-end Software Engineer"
            >
                <span className={styles.text} data-link-text-ctr>
                    <span
                        className={[styles.name, styles.part].join(' ')}
                        data-link-text
                    >
                        {/* Stephen Matheis * * * * * * */}
                        {/* Stephen Matheis / / / / / / */}
                        {/* Stephen Matheis ----------- */}
                        Stephen Matheis
                    </span>{' '}
                    <br data-header-break />
                    <span
                        className={[styles.title, styles.part].join(' ')}
                        data-link-text
                    >
                        Front-end Software Engineer
                    </span>
                </span>
            </Link>
            <Link className={styles.right} href={href} aria-label={label}>
                {text}
            </Link>
            <div
                className={styles.menu}
                onClick={() => {
                    linksRef.current.style.display = 'flex';
                    document.body.style.overflow = 'hidden';

                    const btn = linksRef.current.querySelector('button');

                    if (!btn) {
                        return;
                    }

                    const offset = window.scrollY < 36 ? window.scrollY : 36;

                    btn.style.transform = `translateY(-${offset}px)`;
                }}
            >
                <button aria-label="Menu">
                    <svg width="36" height="36" viewBox="0 0 36 36">
                        <polyline points="10 12, 26 12" />
                        <polyline points="10 24, 26 24" />
                    </svg>
                </button>
            </div>
            <div ref={linksRef} className={styles['links-ctr']}>
                <div className={styles.close}>
                    <button
                        type="button"
                        aria-label="Close"
                        onClick={() => {
                            linksRef.current.style.display = 'none';
                            document.body.style.overflow = 'auto';
                        }}
                    >
                        <svg width="36" height="36" viewBox="0 0 36 36">
                            {/* <polyline points="10 10, 26 26" />
                            <polyline points="10 26, 26 10" /> */}
                            <polyline points="12 12, 24 24" />
                            <polyline points="12 24, 24 12" />
                        </svg>
                    </button>
                </div>
                <div className={styles.links}>
                    {[
                        { label: 'Experience', path: '#experience' },
                        { label: 'Skills', path: '#skills' },
                        { label: 'Projects', path: '#projects' },
                        { label: 'Contact', path: '#contact' },
                        {
                            label: 'Download',
                            path: '/resume.pdf',
                            newTab: true,
                        },
                    ].map(({ label, path, newTab }) => {
                        return (
                            <Link
                                key={label}
                                href={path}
                                aria-label={label}
                                {...(newTab ? { target: '_blank' } : {})}
                            >
                                {label}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </header>
    );
}
