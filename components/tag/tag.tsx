'use client';

import styles from './tag.module.scss';

type Props = {
    tag: string;
    selected?: string[];
    spacer?: boolean;
    newTab?: boolean;
    color?: string;
};

export function Tag({
    selected = [],
    tag,
    spacer,
    newTab,
    color = 'muted',
}: Props) {
    return (
        <span
            key={tag}
            className={[
                styles[color],
                styles.tag,
                ...(selected.includes(tag) ? [styles.selected] : []),
            ].join(' ')}
            onClick={(event) => {
                event.stopPropagation();
                event.preventDefault();

                let queryParams: string[];

                if (selected.includes(tag)) {
                    queryParams = selected.filter((t) => t !== tag);
                } else {
                    queryParams = [...new Set([...selected, tag])];
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
