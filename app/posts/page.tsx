import PostsList from './components/posts-list';
import getPosts from '@/lib/get-posts';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Comment from '@/components/comment';
import styles from './page.module.scss';

export default async function Blog() {
    const posts = await getPosts();

    return (
        <div className={styles.page}>
            <Header />
            <main>
                <Comment text="Posts" />
                <PostsList posts={posts} />
            </main>
            <Footer links={[{ label: 'Home', path: '/' }]} />
        </div>
    );
}
