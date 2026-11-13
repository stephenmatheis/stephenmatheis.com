import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Syntax } from '@/app/components/Syntax';
import { formatDate, getEntries, getEntry } from '../entries';
import styles from './page.module.scss';

export const dynamicParams = false;

export function generateStaticParams() {
    return getEntries().map((entry) => ({
        slug: entry.slug,
    }));
}

export async function generateMetadata({ params }: PageProps<'/library/[slug]'>): Promise<Metadata> {
    const { slug } = await params;
    const entry = getEntry(slug);

    return {
        title: entry ? `${entry.title} · Library` : 'Library',
    };
}

export default async function LibraryEntry({ params }: PageProps<'/library/[slug]'>) {
    const { slug } = await params;
    const entry = getEntry(slug);

    if (!entry) {
        notFound();
    }

    return (
        <>
            <header>
                <p>
                    <Syntax>[</Syntax>
                    <Link href="/library">Library</Link>
                    <Syntax>]</Syntax> / {entry.topic}
                </p>
                <h1>{entry.title}</h1>
                <p className="details">
                    {entry.type} · added {formatDate(entry.added)}
                    {entry.updated && ` · updated ${formatDate(entry.updated)}`} · {entry.tags.join(', ')}
                </p>
            </header>
            <main className={styles.article}>
                <article className={styles.entry} dangerouslySetInnerHTML={{ __html: entry.html }} />
            </main>
        </>
    );
}
