'use client';

import type { Post } from '@/lib/types';
import { Entry } from '../entry';
import styles from './posts-list.module.scss';
import { useState } from 'react';
import classNames from 'classnames';

export function PostsList({ posts }: { posts: Post[] }) {
    const [filteredPosts, setFilteredPosts] = useState(posts);
    const [query, setQuery] = useState('');

    function handleInput(event: React.ChangeEvent<HTMLInputElement>): void {
        const query = event.target.value.toLowerCase();
        setQuery(query);

        const filteredPosts = posts.filter((post) => {
            const { title, date, description, body } = post;

            if (title?.toLowerCase().includes(query)) {
                return post;
            }

            if (date?.toLowerCase().includes(query)) {
                return post;
            }

            if (description?.toLowerCase().includes(query)) {
                return post;
            }

            if (body?.toLowerCase().includes(query)) {
                return post;
            }
        });

        if (query) {
            setFilteredPosts(filteredPosts);
        } else {
            setFilteredPosts(posts);
        }
    }

    function handleClearSearch() {
        setQuery('');
        setFilteredPosts(posts);
    }

    return (
        <>
            <div className={styles['search-row']}>
                <div className={styles['search-ctr']}>
                    <input
                        value={query}
                        className={styles.search}
                        onInput={handleInput}
                        placeholder="search"
                    />
                    <button
                        className={classNames({ [styles.active]: query })}
                        onClick={handleClearSearch}
                    >
                        &times;
                    </button>
                </div>
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
