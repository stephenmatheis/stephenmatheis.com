'use client';

import { useState } from 'react';
import classNames from 'classnames';
import { useDebounce } from '@/hooks/useDebounce';
import styles from './search.module.scss';

export function Search({ posts, setPosts }) {
    const [query, setQuery] = useState('');

    function handleClearSearch() {
        setQuery('');
        setPosts(posts);
    }

    const handleOnChange = useDebounce(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const query = event.target.value.toLowerCase();
            setQuery(query);

            if (!query) {
                setPosts(posts);
            }

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
        },
        500
    );

    return (
        <div className={styles['search-row']}>
            <div className={styles['search-ctr']}>
                <input
                    className={styles.search}
                    onInput={handleOnChange}
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
