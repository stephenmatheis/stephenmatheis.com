import { DateTime } from '@/components/date-time';
import { LinkCtr } from '@/components/link-ctr';
import { Body } from '@/components/body';
import type { Post } from '@/lib/types';
import styles from './posts.module.scss';

export function Posts({ posts }: { posts: Post[] }) {
    const dates = [...new Set(posts.map(({ date }) => date.split('T')[0]))];

    return (
        <>
            {dates.map((date) => {
                return (
                    <div
                        key={date}
                        className={styles['posts-ctr']}
                        data-date={date}
                    >
                        <DateTime className={styles.date} dateString={date} />
                        <div className={styles.posts}>
                            {posts
                                .filter(
                                    (post) => post.date.split('T')[0] === date
                                )
                                .map(({ slug, title, date, body }) => {
                                    return (
                                        <article
                                            key={slug}
                                            className={styles.post}
                                        >
                                            <h2 className={styles.title}>
                                                <LinkCtr
                                                    href={`/timeline/${slug}`}
                                                >
                                                    {title}
                                                </LinkCtr>
                                            </h2>

                                            <Body>{body}</Body>
                                        </article>
                                    );
                                })}
                        </div>
                    </div>
                );
            })}
        </>
    );
}
