import { DateTime } from '@/components/date-time';
import { LinkCtr } from '@/components/link-ctr';
import { Body } from '@/components/body';
import type { Post } from '@/lib/types';
import styles from './posts.module.scss';

export function Posts({ posts }: { posts: Post[] }) {
    return (
        <>
            {posts.map(({ slug, title, date, body }) => {
                return (
                    <>
                        <article className={styles.post}>
                            <h2 className={styles.title}>
                                <LinkCtr href={`/timeline/${slug}`}>
                                    {title}
                                </LinkCtr>
                            </h2>
                            <DateTime
                                className={styles.date}
                                dateString={date}
                            />
                            <Body>{body}</Body>
                        </article>
                    </>
                );
            })}
        </>
    );
}
