import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { formatDate, getEntries, getEntry } from '../entries';
import styles from './page.module.scss';
import { PageHeader } from '@/app/components/PageHeader';

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
            <PageHeader
                parent={{
                    label: 'Library',
                    href: '/library',
                }}
                title={entry.title}
                details={[
                    entry.updated
                        ? `${formatDate(entry.added)} · updated ${formatDate(entry.updated)}`
                        : formatDate(entry.added),
                    entry.topic,
                    entry.type,
                ]}
            />
            <main className={styles.article}>
                <article className={styles.entry} dangerouslySetInnerHTML={{ __html: entry.html }} />
            </main>
            <footer>{entry.updated && `updated ${formatDate(entry.updated)}`}</footer>
        </>
    );
}
