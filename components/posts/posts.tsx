import type { Post } from '@/lib/types';
import { DateTime } from '@/components/date-time';
import { PostTitle } from '@/components/post-title';
import { Body } from '@/components/body';
import { Tags } from '@/components/tags';
import styles from './posts.module.scss';

export function Posts({ posts }: { posts: Post[] }) {
    const last20Posts = posts.slice(0, 21);
    const dates = [...new Set(last20Posts.map(({ date }) => date))];

    return (
        <>
            <div className={styles['date-groups']}>
                {dates.map((date, dateIndex) => {
                    return (
                        <div
                            key={date}
                            className={styles['posts-ctr']}
                            data-date={date}
                        >
                            <DateTime
                                className={styles.date}
                                dateString={date}
                            />
                            <div className={styles.posts}>
                                {last20Posts
                                    .filter((post) => post.date === date)
                                    .map(
                                        (
                                            {
                                                slug,
                                                title,
                                                link,
                                                body,
                                                tags,
                                                status,
                                            },
                                            postIndex
                                        ) => {
                                            return (
                                                <article
                                                    key={slug}
                                                    className={styles.post}
                                                >
                                                    <PostTitle
                                                        slug={slug}
                                                        title={title}
                                                        link={link}
                                                        status={status}
                                                    />
                                                    <Body>{body}</Body>
                                                    <div
                                                        className={styles.tags}
                                                    >
                                                        <Tags tags={tags} />
                                                    </div>
                                                </article>
                                            );
                                        }
                                    )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
