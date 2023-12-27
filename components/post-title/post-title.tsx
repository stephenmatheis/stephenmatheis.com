import classNames from 'classnames';
import Link from 'next/link';
import styles from './post-title.module.scss';

export function PostTitle({
    slug,
    title,
    link,
    status,
}: {
    slug: string;
    title: string;
    link?: string;
    status?: string;
}) {
    return (
        <h2
            className={classNames(styles.title, {
                [styles.external]: link,
            })}
        >
            {link ? (
                <span className={styles['title-text']}>
                    <a href={link} target="_blank">
                        {title}
                    </a>
                    <Link
                        href={`/posts/${slug}`}
                        className={styles['post-link']}
                    >
                        *
                    </Link>
                </span>
            ) : (
                <Link href={`/posts/${slug}`}>{title}</Link>
            )}
            {process.env.NODE_ENV === 'development' && status && (
                <span
                    style={{
                        textTransform: 'uppercase',
                        color:
                            status === 'draft'
                                ? 'var(--muted)'
                                : 'var(--primary)',
                        marginLeft: '1ch',
                    }}
                >
                    ({status})
                </span>
            )}
        </h2>
    );
}
