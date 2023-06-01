import { Post } from '@/lib/types';
import LinkCtr from '@/components/link-ctr';
import styles from './nav.module.scss';

export default function Nav({
    previous,
    next,
}: {
    previous?: Post;
    next?: Post;
}) {
    return (
        <div className={styles.navigation}>
            {/* Prev */}
            <div className={styles.previous}>
                {previous && (
                    <LinkCtr href={`/posts/${previous.slug}`} emoji="❬">
                        {previous.title}
                    </LinkCtr>
                )}
            </div>

            {/* Posts */}
            <div className={styles.posts}>
                <LinkCtr href="/posts">Posts</LinkCtr>
            </div>

            {/* Next */}
            <div className={styles.next}>
                {next && (
                    <LinkCtr
                        href={`/posts/${next.slug}`}
                        emoji={{ position: 'right', value: '❭' }}
                    >
                        {next.title}
                    </LinkCtr>
                )}
            </div>
        </div>
    );
}
