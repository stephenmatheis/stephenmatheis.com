'use client';

import { Post } from '@/lib/types';
import { ChangeEvent, useRef, useState } from 'react';
import classNames from 'classnames';
import { useDebounce } from '@/hooks/useDebounce';
import styles from './search.module.scss';

export function Search({ posts, setPosts }) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [showClear, setShowClear] = useState(false);

    function handleClearSearch() {
        setPosts(posts);
        setShowClear(false);

        if (!inputRef.current) {
            return;
        }

        inputRef.current.value = '';
    }

    function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
        setShowClear(event.target.value ? true : false);
    }

    const handleOnInput = useDebounce(
        (event: ChangeEvent<HTMLInputElement>) => {
            const query = event.target.value.toLowerCase();

            if (!query) {
                setPosts(posts);
            }

            const filteredPosts = posts.filter((post: Post) =>
                Object.values(post).some((str) =>
                    str.toString().toLowerCase().includes(query)
                )
            );

            setPosts(filteredPosts);
        },
        100
    );

    return (
        <div className={styles['search-row']}>
            <div className={styles['search-ctr']}>
                <input
                    ref={inputRef}
                    className={styles.search}
                    onInput={handleOnInput}
                    onChange={handleOnChange}
                    placeholder="search"
                />
                <button
                    className={classNames({
                        [styles.active]: showClear,
                    })}
                    onClick={handleClearSearch}
                >
                    &times;
                </button>
            </div>
        </div>
    );
}
