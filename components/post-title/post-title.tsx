import classNames from 'classnames';
import Link from 'next/link';
import { LinkCtr } from '@/components/link-ctr';
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
                [styles.draft]:
                    process.env.NODE_ENV === 'development' &&
                    status === 'draft',
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
            )}{' '}
            {process.env.NODE_ENV && status && (
                <span
                    style={{
                        textTransform: 'uppercase',
                        color: 'var(--accent)',
                    }}
                    className={styles.status}
                >
                    ({status})
                </span>
            )}
        </h2>
    );
}
