import { DateTime } from '@/components/date-time';
import { LinkCtr } from '@/components/link-ctr';
import { Body } from '../../[slug]/components/body';
import type { Post } from '@/lib/types';
import styles from './posts-list.module.scss';

async function PostBlock({ post }) {
    const { slug, title, body, date } = post;

    return (
        <>
            <article>
                <h2 className={styles.title}>
                    <LinkCtr href={`/timeline/${slug}`}>{title}</LinkCtr>
                </h2>
                <DateTime className={styles.date} dateString={date} />
                <Body>{body}</Body>
            </article>
        </>
    );
}

export function PostsList({ posts }: { posts: Post[] }) {
    return (
        <>
            {posts.map((post) => {
                const { title } = post;

                return (
                    // @ts-expect-error RSC
                    <PostBlock key={title} post={post} />
                );
            })}
        </>
    );
}
