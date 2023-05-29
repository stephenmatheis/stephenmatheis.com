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
                    <LinkCtr
                        href={`/posts/${previous.slug}`}
                        text={previous.title}
                        emoji="❬"
                    />
                )}
            </div>

            {/* Posts */}
            <div className={styles.posts}>
                <LinkCtr href="/posts" text="Posts" />
            </div>

            {/* Next */}
            <div className={styles.next}>
                {next && (
                    <LinkCtr
                        href={`/posts/${next.slug}`}
                        text={next.title}
                        emoji={{ position: 'right', value: '❭' }}
                    />
                )}
            </div>
        </div>
    );
}
