import classNames from 'classnames';
import LinkCtr from '@/components/link-ctr/link-ctr';
import styles from './main.module.scss';

type Props = {};

export default function Main({}: Props) {
    return (
        <main className={classNames(styles.main, styles.fade)}>
            <section className={styles.left}>
                <nav>
                    <LinkCtr href="/posts">Posts</LinkCtr>
                    <LinkCtr href="/projects">Projects</LinkCtr>
                    <LinkCtr href="/resume">About</LinkCtr>
                </nav>
            </section>
            <section className={styles.middle}>
                <video
                    // {...(process.env.NODE_ENV === 'production'
                    //     ? {
                    //           autoPlay: true,
                    //           loop: true,
                    //       }
                    //     : {})}
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
        </main>
    );
}
