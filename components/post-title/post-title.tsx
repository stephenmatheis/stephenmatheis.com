import classNames from 'classnames';
import Link from 'next/link';
import { LinkCtr } from '@/components/link-ctr';
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
    return (
        <h2
            className={classNames(styles.title, {
                [styles.first]: dateIndex === 0 && postIndex === 0,
                [styles.external]: link,
            })}
        >
            {link ? (
                <span className={styles['title-text']}>
                    <LinkCtr href={link} newTab>
                        {title}
                    </LinkCtr>
                    <Link
                        href={`/posts/${slug}`}
                        className={styles['post-link']}
                    >
                        *
                    </Link>
                </span>
            ) : (
                <LinkCtr href={`/posts/${slug}`}>{title}</LinkCtr>
            )}
        </h2>
    );
}
