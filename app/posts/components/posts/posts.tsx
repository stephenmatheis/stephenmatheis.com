import { cookies } from 'next/headers';
import classNames from 'classnames';
import Link from 'next/link';
import { DateTime } from '@/components/date-time';
import { Comment } from '@/components/comment';
import { LinkCtr } from '@/components/link-ctr';
import { Body } from '@/components/body';
import type { Post } from '@/lib/types';
import styles from './posts.module.scss';
import { NewPost } from '../new-post';

export function Posts({ posts }: { posts: Post[] }) {
    const cookieStore = cookies();
    const name = cookieStore.get('name') as { name: string; value: string };
    const last20Posts = posts.slice(0, 21);
    const dates = [...new Set(last20Posts.map(({ date }) => date))];

    return (
        <>
            <div className={styles['page-title']}>
                <Comment text="Posts" />
                <DateTime className={styles.date} dateString={dates[0]} />
            </div>
            {name && <NewPost posts={posts} />}
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
                                            { slug, title, link, body },
                                            postIndex
                                        ) => {
                                            return (
                                                <article
                                                    key={slug}
                                                    className={styles.post}
                                                >
                                                    <h2
                                                        className={classNames(
                                                            styles.title,
                                                            {
                                                                [styles.first]:
                                                                    dateIndex ===
                                                                        0 &&
                                                                    postIndex ===
                                                                        0,
                                                                [styles.external]:
                                                                    link,
                                                            }
                                                        )}
                                                    >
                                                        {link ? (
                                                            <>
                                                                <LinkCtr
                                                                    href={link}
                                                                    newTab
                                                                >
                                                                    {title}
                                                                </LinkCtr>
                                                                <Link
                                                                    href={`/posts/${slug}`}
                                                                    className={
                                                                        styles[
                                                                            'post-link'
                                                                        ]
                                                                    }
                                                                >
                                                                    #
                                                                </Link>
                                                            </>
                                                        ) : (
                                                            <LinkCtr
                                                                href={`/posts/${slug}`}
                                                            >
                                                                {title}
                                                            </LinkCtr>
                                                        )}
                                                    </h2>

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
