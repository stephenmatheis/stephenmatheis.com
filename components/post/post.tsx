import { notFound } from 'next/navigation';
import { DateTime } from '@/components/date-time';
import { LinkCtr } from '@/components/link-ctr';
import { Footer } from '@/components/footer';
import { Body } from '@/components/body';
import { Nav } from '@/components/nav';
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

    const { previous, next, title, body, date, link, lastModified } = post;

    return (
        <main className={styles.post}>
            <h1>
                {link ? (
                    <LinkCtr href={link} newTab>
                        {title}
                    </LinkCtr>
                ) : (
                    title
                )}
            </h1>
            <article>
                <DateTime className={styles.date} dateString={date} />
                <Body>{body}</Body>
            </article>
            {/* TODO: */}
            {/* {lastModified && (
                <div className={styles.date}>
                    Last modified <Date dateString={lastModified} />
                </div>
            )} */}
            <Nav previous={previous} next={next} />
            <div className={styles['footer-wrapper']}>
                <Footer />
            </div>
        </main>
    );
}
