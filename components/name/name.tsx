import Link from 'next/link';
import { Comment } from '@/components/comment';
import styles from './name.module.scss';

export function Name() {
    return (
        <section className={styles.name}>
            <Comment text="Name" />
            <div className={styles.text}>
                <div>
                    <span className={styles.primary}>Stephen Matheis</span>{' '}
                    <span className={styles.color}>Software Engineer</span>
                </div>
                <Link className={styles.muted} href="/" title="Go to home">
                    stephenmatheis.com
                </Link>
                <div className={styles.light}>38° N, 77° W</div>
            </div>
        </section>
    );
}
