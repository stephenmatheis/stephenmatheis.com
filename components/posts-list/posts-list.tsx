'use client';

import { useState } from 'react';
import type { Post } from '@/lib/types';
import { Search } from '@/components/search';
import { Entry } from '@/components/entry';
import { Tags } from '@/components/tags';
import { LinkCtr } from '../link-ctr';
import styles from './posts-list.module.scss';

function filterTags(post: Post, tags: string[]) {
    if (!post.tags && tags.includes('(none)')) {
        return post;
    }

    if (tags.some((val) => post?.tags?.includes(val))) {
        return post;
    }
}

function formatAsMonthAndYear(dateString: string) {
    return new Date(dateString).toLocaleString('default', {
        month: 'long',
        year: 'numeric',
    });
}

export function PostsList({
    posts,
    tags = [],
}: {
    posts: Post[];
    tags: string[];
}) {
    // TODO: Move to lib
    const allTags = [
        ...new Set(
            posts
                .flatMap(({ tags }) => {
                    return tags;
                })
                .filter((tag) => tag)
                .sort((a: string, b: string) =>
                    a.toLowerCase().localeCompare(b.toLowerCase())
                )
        ),
    ];

    const taggedPosts = tags.length
        ? posts.filter((post) => filterTags(post, tags))
        : posts;
    const [filteredPosts, setFilteredPosts] = useState(taggedPosts);
    const months = [
        ...new Set(filteredPosts.map(({ date }) => formatAsMonthAndYear(date))),
    ].sort((a, b) =>
        a && b ? new Date(b).getTime() - new Date(a).getTime() : 0
    );

    return (
        <>
            <div className={styles.title}>
                {/* <div className={styles['page-title-wrapper']}>
                    <LinkCtr className={styles.reset} href="/posts">
                        {'Posts'}
                    </LinkCtr>
                </div> */}
                <div className={styles['search-wrapper']}>
                    <Search posts={taggedPosts} setPosts={setFilteredPosts} />
                </div>
            </div>
            {allTags.length > 0 && (
                <div id="tags" className={styles.tags}>
                    <Tags tags={allTags} selected={tags} none={true} />
                </div>
            )}
            {filteredPosts.length === 0 ? (
                <div className={styles.none}>
                    No posts match this query.
                </div>
            ) : (
                <ul className={styles.container}>
                    {months.map((date) => {
                        const postsThisMonth = filteredPosts.filter(
                            (post) => formatAsMonthAndYear(post.date) === date
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
