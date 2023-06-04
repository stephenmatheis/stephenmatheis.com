'use client';

import { useState } from 'react';
import type { Post } from '@/lib/types';
import { Comment } from '@/components/comment';
import { Search } from '../search';
import { Entry } from '../entry';
import styles from './posts-list.module.scss';

export function PostsList({ posts }: { posts: Post[] }) {
    const [filteredPosts, setFilteredPosts] = useState(posts);

    return (
        <>
            <div className={styles.title}>
                <Comment text="Posts" />
                <Search posts={posts} setPosts={setFilteredPosts} />
            </div>
            <ul className={styles.container}>
                {filteredPosts.map(
                    ({ slug, title, date, description, excerpt }) => {
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
            </ul>
        </>
    );
}
