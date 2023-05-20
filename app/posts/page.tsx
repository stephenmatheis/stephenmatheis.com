import PostsList from './components/posts-list';
import getPosts from '@/lib/get-posts';
import styles from './page.module.scss';

export default async function Blog() {
    const posts = await getPosts();

    return (
        <main className={styles.page}>
            <PostsList posts={posts} />
        </main>
    );
}
