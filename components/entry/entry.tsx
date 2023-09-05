import Link from 'next/link';
import { DateTime } from '@/components/date-time';
import styles from './entry.module.scss';

type Props = {
    title: string;
    description?: string;
    tags?: string[];
    type?: string;
    href: string;
    date?: string;
};

export function Entry({ title, type, href, date, tags = [] }: Props) {
    return (
        <li className={styles.item}>
            <Link
                href={href}
                title={title}
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
            </Link>
        </li>
    );
}
