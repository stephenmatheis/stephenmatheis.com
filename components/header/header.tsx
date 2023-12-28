'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import contact from '@/data/contact';
import styles from './header.module.scss';

type Route = {
    label: string;
    path: string;
    newTab: boolean | undefined;
};

type HeaderProps = {
    anchors?: Route[];
    printOnly?: boolean;
};

export function Header({ anchors, printOnly = false }: HeaderProps) {
    const pathname = usePathname();
    const { text, href }: { text: string; href: string } = contact.find(
        ({ header }) => header
    )!;
    const linksRef = useRef<HTMLDivElement>(null!);

    function close() {
        linksRef.current.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

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
            <Link className={styles.right} href={href} aria-label={text}>
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
                    <button type="button" aria-label="Close" onClick={close}>
                        <svg width="36" height="36" viewBox="0 0 36 36">
                            <polyline points="12 12, 24 24" />
                            <polyline points="12 24, 24 12" />
                        </svg>
                    </button>
                </div>
                <div className={styles.links}>
                    {/* Anchors */}
                    {anchors?.length && (
                        <div className={[styles.row, styles.anchors].join(' ')}>
                            {anchors?.map(({ label, path, newTab }: Route) => {
                                return (
                                    <Link
                                        key={label}
                                        href={path}
                                        aria-label={label}
                                        {...(newTab
                                            ? { target: '_blank' }
                                            : {})}
                                        onClick={() => {
                                            close();
                                        }}
                                    >
                                        {/* FIXME: new tab sigil */}
                                        {newTab ? '#' : '#'} {label}
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                    {/* Links */}
                    <div className={styles.row}>
                        {[
                            { label: 'About', path: '/about' },
                            { label: 'Blog', path: '/blog' },
                            { label: 'Posts', path: '/posts' },
                        ].map(({ label, path, newTab }: Route) => {
                            return (
                                <Link
                                    key={label}
                                    href={path}
                                    aria-label={label}
                                    {...(newTab ? { target: '_blank' } : {})}
                                    onClick={() => {
                                        if (path === pathname) {
                                            close();
                                        }
                                    }}
                                >
                                    {label}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </header>
    );
}
