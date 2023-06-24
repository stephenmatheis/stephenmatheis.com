'use client';

import { useState } from 'react';
import type { Post } from '@/lib/types';
import { Comment } from '@/components/comment';
import { Search } from '../search';
import { Entry } from '../entry';
import styles from './posts-list.module.scss';

export function PostsList({ posts }: { posts: Post[] }) {
    const [filteredPosts, setFilteredPosts] = useState(posts);
    const months = [...new Set(filteredPosts.map(({ date }) => date))];

    return (
        <>
            <div className={styles.title}>
                <Comment text="Archive" />
                <Search posts={posts} setPosts={setFilteredPosts} />
            </div>
            <ul className={styles.container}>
                {months.map((date) => {
                    const postsThisMonth = filteredPosts.filter(
                        (post) => post.date === date
                    );

                    return (
                        <div className={styles.group} key={date}>
                            <h2 className={styles.month}>{date}</h2>
                            {postsThisMonth.map(
                                ({
                                    slug,
                                    title,
                                    date,
                                    description,
                                    excerpt,
                                }) => {
                                    return (
                                        <Entry
                                            key={`post-item-${slug}`}
                                            href={`/posts/${slug}`}
                                            title={title}
                                            date={date}
                                            description={description}
                                            excerpt={excerpt}
                                        />
                                    );
                                }
                            )}
                        </div>
                    );
                })}
            </ul>
        </>
    );
}
