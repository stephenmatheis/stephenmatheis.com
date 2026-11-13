import { ReactNode } from 'react';
import Link from 'next/link';
import { Syntax } from '@/app/components/Syntax';
import styles from './PageHeader.module.scss';

type Parent = {
    label: string;
    href: string;
};

type PageHeaderProps = {
    parent?: Parent;
    title: string;
    details: ReactNode[];
    spinner?: boolean;
};

export function PageHeader({ parent, title, details, spinner = true }: PageHeaderProps) {
    const spinnerElement = spinner && (
        <>
            {' '}
            <span className="spinner" aria-hidden="true"></span>
        </>
    );

    if (!parent) {
        return (
            <header className={styles.header}>
                <h1>
                    {title}
                    {spinnerElement}
                </h1>
                {details.map((detail, index) => (
                    <p key={index}>{detail}</p>
                ))}
            </header>
        );
    }

    return (
        <header className={styles.header}>
            <nav aria-label="Parent page">
                <Link href={parent.href}>
                    <Syntax muted>
                        ‹{' '}
                    </Syntax>
                    {parent.label}
                </Link>
            </nav>
            <h1>
                <Syntax muted>
                    ~{' '}
                </Syntax>
                {title}
                <Syntax muted>
                    {' '}~
                </Syntax>
            </h1>
            {details.map((detail, index) => (
                <p key={index}>{detail}</p>
            ))}
        </header>
    );
}
