import { Post } from '@/lib/types';
import {LinkCtr} from '@/components/link-ctr';
import styles from './nav.module.scss';

export function Nav({
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
                    <LinkCtr href={`/timeline/${previous.slug}`} emoji="❬">
                        {previous.title}
                    </LinkCtr>
                )}
            </div>

            {/* Posts */}
            <div className={styles.posts}>
                <LinkCtr href="/timeline">Posts</LinkCtr>
            </div>

            {/* Next */}
            <div className={styles.next}>
                {next && (
                    <LinkCtr
                        href={`/timeline/${next.slug}`}
                        emoji={{ position: 'right', value: '❭' }}
                    >
                        {next.title}
                    </LinkCtr>
                )}
            </div>
        </div>
    );
}
