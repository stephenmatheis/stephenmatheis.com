'use client';

import { useSearchParams } from 'next/navigation';

import { useMemo, useState } from 'react';
import type { Post } from '@/lib/types';
import { Search } from '@/components/search';
import { Entry } from '@/components/entry';
import styles from './posts-list.module.scss';

export function PostsList({ posts }: { posts: Post[] }) {
    const searchParams = useSearchParams();
    const tags = useMemo(
        () => searchParams.get('tags')?.split(',') || [],
        [searchParams]
    );

    console.log(tags);

    const [filteredPosts, setFilteredPosts] = useState(posts);
    const months = [...new Set(filteredPosts.map(({ date }) => date))].sort(
        (a, b) => (a && b ? new Date(b).getTime() - new Date(a).getTime() : 0)
    );

    return (
        <>
            <div className={styles.title}>
                <Search posts={posts} setPosts={setFilteredPosts} />
            </div>
            {filteredPosts.length === 0 ? (
                <div className={styles.none}>
                    There are no posts that match this query.
                </div>
            ) : (
                <ul className={styles.container}>
                    {months.map((date) => {
                        const postsThisMonth = filteredPosts.filter(
                            (post) => post.date === date
                        );

                        return (
                            <div className={styles.group} key={date}>
                                <h2 className={styles.month}>
                                    {new Date(date).toLocaleString('default', {
                                        month: 'long',
                                        year: 'numeric',
                                    })}
                                </h2>
                                {postsThisMonth.map(
                                    ({
                                        slug,
                                        title,
                                        date,
                                        description,
                                        tags,
                                    }) => {
                                        return (
                                            <Entry
                                                key={`post-item-${slug}`}
                                                href={`/posts/${slug}`}
                                                title={title}
                                                date={date}
                                                description={description}
                                                tags={tags}
                                            />
                                        );
                                    }
                                )}
                            </div>
                        );
                    })}
                </ul>
            )}
        </>
    );
}
