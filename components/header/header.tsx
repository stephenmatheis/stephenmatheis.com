'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import contact from '@/data/contact';
import styles from './header.module.scss';

export function Header({ printOnly = false }) {
    const { text, href, label }: { text: string; href: string; label: string } =
        contact.find(({ header }) => header)!;

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
            {/* Name */}
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
            {/* Right aligned text */}
            <Link className={styles.right} href={href} aria-label={label}>
                {text}
            </Link>
            {/* Menu */}
            <div className={styles.menu}>MENU</div>
            {/* Links */}
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
        </header>
    );
}
