import { DateTime } from '@/components/date-time';
import { Body } from '@/components/body';
import type { Post } from '@/lib/types';
import { UpdatePrompts } from '@/components/update-prompts';
import styles from './posts.module.scss';
import { PostTitle } from '@/components/post-title';

export function Posts({ posts }: { posts: Post[] }) {
    const last20Posts = posts.slice(0, 21);
    const dates = [...new Set(last20Posts.map(({ date }) => date))];

    return (
        <>
            <UpdatePrompts
                prompts={last20Posts.map(({ slug, title, link }) => {
                    return {
                        label: title,
                        href: link || `/posts/${slug}`,
                        type: link ? 'external' : 'post',
                    };
                })}
            />
            <div className={styles['page-title']}>
                <DateTime className={styles.date} dateString={dates[0]} />
            </div>
            <div className={styles['date-groups']}>
                {dates.map((date, dateIndex) => {
                    return (
                        <div
                            key={date}
                            className={styles['posts-ctr']}
                            data-date={date}
                        >
                            {dateIndex !== 0 && (
                                <DateTime
                                    className={styles.date}
                                    dateString={date}
                                />
                            )}
                            <div className={styles.posts}>
                                {last20Posts
                                    .filter((post) => post.date === date)
                                    .map(
                                        (
                                            { slug, title, link, body, tags },
                                            postIndex
                                        ) => {
                                            return (
                                                <article
                                                    key={slug}
                                                    className={styles.post}
                                                >
                                                    {/* DEV: */}

                                                    <PostTitle
                                                        slug={slug}
                                                        title={title}
                                                        link={link}
                                                        tags={tags}
                                                        dateIndex={dateIndex}
                                                        postIndex={postIndex}
                                                    />

                                                    {/* DEV: */}
                                                    <Body>{body}</Body>
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
