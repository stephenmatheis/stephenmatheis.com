import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DateTime } from '@/components/date-time';
import { Footer } from '@/components/footer';
import { Body } from '@/components/body';
import { Nav } from '@/components/nav';
import { Tags } from '@/components/tags';
import { getData } from '@/lib/get-data';
import styles from './post.module.scss';

export async function Post({
    params,
}: {
    params: {
        slug: string;
    };
}) {
    const post = await getData(params);

    if (!post) return notFound();

    const {
        previous,
        next,
        title,
        slug,
        body,
        date,
        link,
        lastModified,
        tags,
        id,
    } = post;

    return (
        <main className={styles.post}>
            <h1>
                {link ? (
                    <a href={link} aria-label={title} target="_blank">
                        {title}
                    </a>
                ) : (
                    <Link href={slug}>{title}</Link>
                )}
            </h1>
            <article>
                <DateTime dateString={date} className={styles.created} />
                <Body id={id}>{body}</Body>
            </article>
            <Tags tags={tags} newTab={true} />
            {new Date(lastModified) > new Date(date) && (
                <div className={styles.date}>
                    Last updated on <DateTime dateString={lastModified} />
                </div>
            )}
            <div className={styles['nav-wrapper']}>
                <Nav previous={previous} next={next} />
            </div>
            <div className={styles['footer-wrapper']}>
                <Footer
                    links={[
                        {
                            label: 'Markdown',
                            path: `${slug}/markdown`,
                            newTab: true,
                        },
                        {
                            label: 'GitHub',
                            path: `https://github.com/stephenmatheis/stephenmatheis.com/blob/main/_posts/${slug}.mdx`,
                            newTab: true,
                        },
                    ]}
                />
            </div>
        </main>
    );
}
