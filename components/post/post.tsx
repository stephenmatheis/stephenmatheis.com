import { notFound } from 'next/navigation';
import { DateTime } from '@/components/date-time';
import { LinkCtr } from '@/components/link-ctr';
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
    } = post;

    return (
        <main className={styles.post}>
            <h1>
                <LinkCtr href={link || slug} newTab={!!link}>
                    {title}
                </LinkCtr>
            </h1>
            <article>
                <DateTime dateString={date} className={styles.created} />
                <Body>{body}</Body>
            </article>
            {new Date(lastModified) > new Date(date) && (
                <div className={styles.date}>
                    Last updated on <DateTime dateString={lastModified} />
                </div>
            )}
            {/* <Tags tags={tags} newTab={true} /> */}
            <Nav previous={previous} next={next} />
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
