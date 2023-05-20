import Link from 'next/link';
import classNames from 'classnames';
import PostsList from './components/posts-list';
import getPosts from '@/lib/get-posts';
import styles from './page.module.scss';

export default async function Blog() {
    const posts = await getPosts();

    return (
        <div className={styles.page}>
            <Link href="/resume" aria-label="Stephen Matheis' personal website">
                <div
                    className={classNames([
                        styles['profile'],
                        styles['link-background'],
                    ])}
                >
                    <span className={styles['name']}>Stephen Matheis</span>{' '}
                    <span className={styles['title']}>
                        Front-end Software Engineer
                    </span>
                </div>
            </Link>
            <main>
                <PostsList posts={posts} />
            </main>
        </div>
    );
}
