import { Page } from '@/components/page';
import { Main } from '@/components/main';
import { Sidebar } from '@/components/sidebar';
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
                    <Sidebar />
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
                {/* Intentionally empty to center `section.middle`. */}
                <section className={styles.right} />
            </Main>
        </Page>
    );
}
