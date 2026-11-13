import { ReactNode } from 'react';
import Link from 'next/link';
import { Syntax } from '@/app/components/Syntax';
import styles from './Frontmatter.module.scss';

type Line = {
    key: string;
    value: ReactNode;
};

type Page = {
    label: string;
    href: string;
};

type FrontmatterProps = {
    lines: Line[];
    currentPage: string;
    pagesPlacement?: 'inline' | 'column';
};

const pages: Page[] = [
    {
        label: 'home',
        href: '/',
    },
    {
        label: 'library',
        href: '/library',
    },
];

function PagesList({ currentPage }: { currentPage: string }) {
    return (
        <>
            <Syntax muted>[</Syntax>
            {pages.map((page, index) => (
                <span key={page.href}>
                    {page.label === currentPage ? (
                        <span aria-current="page">{page.label}</span>
                    ) : (
                        <Link href={page.href}>{page.label}</Link>
                    )}
                    {index < pages.length - 1 && <Syntax muted>, </Syntax>}
                </span>
            ))}
            <Syntax muted>]</Syntax>
        </>
    );
}

function FrontmatterLine({ name, children }: { name: string; children: ReactNode }) {
    return (
        <div className={styles.line}>
            <Syntax muted>{name}: </Syntax>
            <span className={styles.value}>{children}</span>
        </div>
    );
}

export function Frontmatter({ lines, currentPage, pagesPlacement = 'inline' }: FrontmatterProps) {
    return (
        <header className={`${styles.frontmatter} ${pagesPlacement === 'column' ? styles.withColumn : ''}`}>
            <div className={styles.block}>
                <Syntax muted>---</Syntax>
                <FrontmatterLine name="name">
                    <Link href="/">Stephen Matheis</Link> <span className="spinner" aria-hidden="true"></span>
                </FrontmatterLine>
                {lines.map((line) => (
                    <FrontmatterLine key={line.key} name={line.key}>
                        {line.value}
                    </FrontmatterLine>
                ))}
                {pagesPlacement === 'inline' && (
                    <nav aria-label="Pages">
                        <FrontmatterLine name="pages">
                            <PagesList currentPage={currentPage} />
                        </FrontmatterLine>
                    </nav>
                )}
                <Syntax muted>---</Syntax>
            </div>
            {pagesPlacement === 'column' && (
                <nav aria-label="Pages" className={styles.column}>
                    <ul>
                        {pages.map((page) => (
                            <li key={page.href}>
                                <Syntax muted>[ </Syntax>
                                {page.label === currentPage ? (
                                    <span aria-current="page">{page.label}</span>
                                ) : (
                                    <Link href={page.href}>{page.label}</Link>
                                )}
                                <Syntax muted> ]</Syntax>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </header>
    );
}
