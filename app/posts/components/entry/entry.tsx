import Link from 'next/link';
import { DateTime } from '@/components/date-time';
import styles from './entry.module.scss';

type Props = {
    title: string;
    description?: string;
    excerpt?: string;
    type?: string;
    href: string;
    date?: string;
};

export  function Entry({
    title,
    description,
    excerpt,
    type,
    href,
    date,
}: Props) {
    return (
        <li className={styles.item}>
            <Link
                href={href}
                title={description || title}
                className={styles.link}
                scroll={true}
            >
                {type && <div className={styles.type}>{type}</div>}
                <div className={styles['title-wrapper']}>
                    <span className={`${styles.title}`}>{title}</span>
                    {date && (
                        <DateTime className={styles.date} dateString={date} />
                    )}
                </div>
                {description && (
                    <p className={styles.description}>{description}</p>
                )}
                {excerpt && <p className={styles.excerpt}>{excerpt}</p>}
            </Link>
        </li>
    );
}
