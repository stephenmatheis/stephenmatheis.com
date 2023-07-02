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
                        ? `/archive?tags=${queryParams.join(',')}`
                        : '/archive'
                }`;

                if (newTab) {
                    window.open(href);
                } else {
                    location.href = href;
                }
            }}
            key={tag}
            className={[
                styles[color],
                styles.tag,
                ...(tags.includes(tag) ? [styles.selected] : []),
            ].join(' ')}
        >
            <span className={styles.name}>{tag}</span>
            {spacer && <span className={styles.spacer}>,</span>}
        </span>
    );
}
