import { Page } from '@/components/page';
import { Main } from '@/components/main';
import { LinkCtr } from '@/components/link-ctr';
import styles from './page.module.scss';

export default function RootPage() {
    return (
        <Page
            links={[
                {
                    label: 'GitHub',
                    path: 'https://github.com/stephenmatheis',
                    external: true,
                },
            ]}
        >
            <Main>
                <section className={styles.left}>
                    <nav>
                        <LinkCtr href="/timeline">Timeline</LinkCtr>
                        <LinkCtr href="/posts">Posts</LinkCtr>
                        <LinkCtr href="/projects">Projects</LinkCtr>
                        <LinkCtr href="/resume">About</LinkCtr>
                    </nav>
                </section>
                <section className={styles.middle}>
                    <video
                        autoPlay
                        loop
                        playsInline
                        muted
                        preload="auto"
                        style={{ width: 640 / 2, height: 480 / 2 }}
                        src="/memoji-loop-22s.mov"
                    />
                </section>
                <section className={styles.right}>
                    {/* Intentionally empty to center `section.middle`. */}
                </section>
            </Main>
        </Page>
    );
}
