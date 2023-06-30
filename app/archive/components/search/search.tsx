'use client';

import { ChangeEvent, useRef, useState } from 'react';
import classNames from 'classnames';
import { useDebounce } from '@/hooks/useDebounce';
import styles from './search.module.scss';

export function Search({ posts, setPosts }) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [query, setQuery] = useState('');

    function handleClearSearch() {
        setQuery('');
        setPosts(posts);

        if (!inputRef.current) {
            return;
        }

        inputRef.current.value = '';
    }

    const handleOnInput = useDebounce(
        (event: ChangeEvent<HTMLInputElement>) => {
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
                    ref={inputRef}
                    className={styles.search}
                    onInput={handleOnInput}
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
