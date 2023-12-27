import Link from 'next/link';
import { Post } from '@/lib/types';
import styles from './nav.module.scss';

export function Nav({
    previous,
    next,
    home = '/posts',
}: {
    previous?: Post;
    next?: Post;
    home?: string;
}) {
    return (
        <div className={styles.navigation}>
            {/* Prev */}
            <div className={styles.previous}>
                {previous && (
                    <Link href={`/posts/${previous.slug}`}>
                        {previous.title}
                    </Link>
                )}
            </div>

            {/* Posts */}
            <div className={styles.center}>
                <Link href={home}>Posts</Link>
            </div>

            {/* Next */}
            <div className={styles.next}>
                {next && <Link href={`/posts/${next.slug}`}>{next.title}</Link>}
            </div>
        </div>
    );
}
