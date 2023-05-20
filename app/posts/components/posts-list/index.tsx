import type { Post } from '@/lib/types';
import Entry from '../entry';
import styles from './posts-list.module.scss';

export default function Posts({ posts }: { posts: Post[] }) {
    return (
        <ul className={styles.container}>
            {posts.map(({ slug, title, date, description, excerpt }) => {
                return (
                    <Entry
                        key={`post-item-${slug}`}
                        href={`/posts/${slug}`}
                        title={title}
                        date={date}
                        description={description}
                        excerpt={excerpt}
                    />
                );
            })}
        </ul>
    );
}
