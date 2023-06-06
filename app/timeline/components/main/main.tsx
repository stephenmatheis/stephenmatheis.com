import { PostsList } from '../posts-list';
import { LinkCtr } from '@/components/link-ctr';
import getPosts from '@/lib/get-posts';
import styles from './main.module.scss';

export async function Main({}) {
    const posts = await getPosts();

    return (
        <main className={styles.main}>
            <section className={styles.left}>
                <nav>
                    <LinkCtr href="/timeline">Timeline</LinkCtr>
                    <LinkCtr href="/posts">Posts</LinkCtr>
                    <LinkCtr href="/projects">Projects</LinkCtr>
                    <LinkCtr href="/resume">About</LinkCtr>
                </nav>
            </section>
            <section className={styles.right}>
                <PostsList posts={posts} />
            </section>
        </main>
    );
}
