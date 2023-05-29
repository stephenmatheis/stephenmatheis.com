import classNames from 'classnames';
import LinkCtr from '@/components/link-ctr/link-ctr';
import styles from './main.module.scss';

type Props = {};

export default function Main({}: Props) {
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
                <video
                    {...(process.env.NODE_ENV === 'production'
                        ? {
                              autoPlay: true,
                              playsInline: true,
                              loop: true,
                          }
                        : {})}
                    muted
                    preload="auto"
                    style={{ width: 640 / 2, height: 480 / 2 }}
                    src="/memoji-loop-22s.mov"
                />
            </section>
            <section className={styles.right}>
                {/* Intentionally empty to center `section.middle`. */}
            </section>
        </main>
    );
}