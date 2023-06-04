import { PostsList } from '../posts-list';
import getPosts from '@/lib/get-posts';
import styles from './main.module.scss';

export async function Main({}) {
    const posts = await getPosts();

    return (
        <main className={styles.main}>
            <PostsList posts={posts} />
        </main>
    );
}
