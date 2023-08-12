'use client';

import { useEffect, useRef } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import { LinkCtr } from '@/components/link-ctr';
import { Tags } from '@/components/tags';
import { usePrompts } from '@/contexts/prompts';
import styles from './post-title.module.scss';

export function PostTitle({
    slug,
    title,
    link,
    tags,
    dateIndex,
    postIndex,
}: {
    slug: string;
    title: string;
    link?: string;
    tags: string[];
    dateIndex: number;
    postIndex: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const { prompts, selected } = usePrompts();
    const promptIndex = prompts.map(({ label }) => label).indexOf(title);

    useEffect(() => {
        if (selected === promptIndex) {
            ref.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [promptIndex, selected]);

    return (
        <h2
            className={classNames(styles.title, {
                [styles.first]: dateIndex === 0 && postIndex === 0,
                [styles.external]: link,
            })}
            ref={ref}
        >
            {/* DEV: */}

            <div
                className={[
                    ...(selected === promptIndex ? [styles.selected] : []),
                    styles.indicator,
                ].join(' ')}
                // data-prompt-indicator
                // data-selected={selected === promptIndex}
            >
                <svg
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                >
                    <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                </svg>
            </div>

            {/* DEV: */}

            {link ? (
                <span className={styles['title-text']}>
                    <LinkCtr href={link} newTab>
                        {title}
                    </LinkCtr>
                    <Link
                        href={`/posts/${slug}`}
                        className={styles['post-link']}
                    >
                        #
                    </Link>
                </span>
            ) : (
                <LinkCtr href={`/posts/${slug}`}>{title}</LinkCtr>
            )}

            <Tags tags={tags} />
        </h2>
    );
}
