'use client';

import { useSearchParams } from 'next/navigation';
import styles from './tag.module.scss';

type Props = {
    tag: string;
    spacer?: boolean;
    newTab?: boolean;
    color?: string;
};

export function Tag({ tag, spacer, newTab, color = 'muted' }: Props) {
    const searchParams = useSearchParams();
    const tags = searchParams.get('tags')?.split(',') || [];

    return (
        <span
            key={tag}
            className={[
                styles[color],
                styles.tag,
                ...(tags.includes(tag) ? [styles.selected] : []),
            ].join(' ')}
            onClick={(event) => {
                event.stopPropagation();
                event.preventDefault();

                let queryParams: string[];

                if (tags.includes(tag)) {
                    queryParams = tags.filter((t) => t !== tag);
                } else {
                    queryParams = [...new Set([...tags, tag])];
                }

                const href = `${
                    queryParams.length
                        ? `/posts?tags=${queryParams.join(',')}`
                        : '/posts'
                }`;

                if (newTab) {
                    window.open(href);
                } else {
                    location.href = href;
                }
            }}
        >
            <span className={styles.name}>{tag}</span>
            {spacer && <span className={styles.spacer}>,</span>}
        </span>
    );
}
