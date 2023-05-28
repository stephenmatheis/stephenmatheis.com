import classNames from 'classnames';
import Image from 'next/image';
import LinkCtr from '@/components/link-ctr/link-ctr';
import PostsList from '@/app/posts/components/posts-list';
import getPosts from '@/lib/get-posts';
import styles from './main.module.scss';

export default async function Main({}) {
    const posts = await getPosts();

    return (
        <main className={classNames(styles.main, styles.fade)}>
            <section className={styles.left}>
                <nav>
                    <LinkCtr text="Posts" href="/posts" />
                    <LinkCtr text="Projects" href="/projects" />
                    <LinkCtr text="About" href="/resume" />
                </nav>
            </section>
            <section className={styles.middle}>
                <div className={styles.memoji}>
                    <Image
                        src="/memoji.png"
                        width={280 / 2}
                        height={350 / 2}
                        alt="My memoji"
                    />
                </div>
            </section>
            <section className={styles.right}>
                {/* Intentionally empty */}
            </section>
        </main>
    );
}
