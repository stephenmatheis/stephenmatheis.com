'use client';

import { useState } from 'react';
import classNames from 'classnames';
import { useDebounce } from '@/hooks/useDebounce';
import styles from './search.module.scss';

export function Search({ posts, setPosts }) {
    const [query, setQuery] = useState('');
    const filter = useDebounce(filterPosts, 500);

    function handleInput(event: React.ChangeEvent<HTMLInputElement>): void {
        const query = event.target.value.toLowerCase();
        setQuery(query);

        if (!query) {
            setPosts(posts);
        }

        filter(query);
    }

    function filterPosts(query: string) {
        console.log('=> ', query);

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

        setPosts(filteredPosts);
    }

    function handleClearSearch() {
        setQuery('');
        setPosts(posts);
    }

    return (
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
    );
}