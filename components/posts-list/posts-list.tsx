'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import type { Post } from '@/lib/types';
import { Search } from '@/components/search';
import { Entry } from '@/components/entry';
import { Tags } from '@/components/tags';
import styles from './posts-list.module.scss';

function filterTags(post: Post, tags: string[]) {
    if (!post.tags) {
        return;
    }

    if (tags.every((val) => post.tags.includes(val))) {
        return post;
    }
}

export function PostsList({ posts }: { posts: Post[] }) {
    const searchParams = useSearchParams();
    const tags = useMemo(
        () => searchParams.get('tags')?.split(',') || [],
        [searchParams]
    );
    const taggedPosts = tags.length
        ? posts.filter((post) => filterTags(post, tags))
        : posts;
    const [filteredPosts, setFilteredPosts] = useState(taggedPosts);
    const months = [...new Set(filteredPosts.map(({ date }) => date))].sort(
        (a, b) => (a && b ? new Date(b).getTime() - new Date(a).getTime() : 0)
    );
    // TODO: Move to lib
    const allTags = [
        ...new Set(
            posts
                .flatMap(({ tags }) => {
                    return tags;
                })
                .filter((tag) => tag)
                .sort()
        ),
    ];

    // Reset
    useEffect(() => {
        if (!tags.length) {
            setFilteredPosts(filteredPosts);
        }
    }, [filteredPosts, tags]);

    return (
        <>
            <div className={styles.title}>
                <Search posts={taggedPosts} setPosts={setFilteredPosts} />
            </div>
            {/* {allTags.length > 0 && (
                <div id="tags" className={styles.tags}>
                    <Tags tags={allTags} color={'primary'} />
                </div>
            )} */}
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
