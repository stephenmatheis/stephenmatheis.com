import type { Post } from '@/lib/types';
import { UpdatePrompts } from '@/components/update-prompts';
import { DateTime } from '@/components/date-time';
import { PostTitle } from '@/components/post-title';
import { Body } from '@/components/body';
import styles from './posts.module.scss';

export function Posts({ posts }: { posts: Post[] }) {
    const last20Posts = posts.slice(0, 21);
    const dates = [...new Set(last20Posts.map(({ date }) => date))];

    return (
        <>
            <UpdatePrompts
                prompts={last20Posts.map(({ slug, title, link }) => {
                    return {
                        label: title,
                        path: link || `/posts/${slug}`,
                        type: 'post',
                        newTab: link ? true : false,
                    };
                })}
            />
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
                                            { slug, title, link, body, tags },
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
                                                        tags={tags}
                                                        dateIndex={dateIndex}
                                                        postIndex={postIndex}
                                                    />
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
