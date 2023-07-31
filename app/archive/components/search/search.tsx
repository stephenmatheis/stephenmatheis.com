'use client';

import { ChangeEvent, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useDebounce } from '@/hooks/useDebounce';
import styles from './search.module.scss';
import { Post } from '@/lib/types';

export function Search({ posts, setPosts }) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [showClear, setShowClear] = useState(false);
    const [clearBtnText, setClearBtnText] = useState('');

    function handleClearSearch() {
        setPosts(posts);

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

            const filteredPosts = posts.filter((post: Post) => {
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
        // https://stackoverflow.com/a/44755058
        100
    );

    useEffect(() => {
        const currentFont = localStorage.getItem('font-family');

        setClearBtnText(currentFont === '8-Bit' ? 'x' : '&times;');
    }, []);

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
                        [styles.small]: clearBtnText === 'x',
                    })}
                    onClick={handleClearSearch}
                    data-btn-clear
                    dangerouslySetInnerHTML={{ __html: clearBtnText }}
                />
            </div>
        </div>
    );
}
