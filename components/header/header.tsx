import Link from 'next/link';
import { Comment } from '@/components/comment';
import styles from './header.module.scss';

// ↳

export function Header() {
    return (
        <section className={styles.name}>
            <Comment text="Name" />
            <Link className={styles.website} href="/" title="Go to home">
                <div>
                    <span className={styles.primary}>Stephen Matheis</span>{' '}
                    <span className={styles.color}>Software Engineer</span>
                </div>
                <div className={styles.muted}>stephenmatheis.com</div>
                <div className={styles.muted}>38° N, 77° W</div>
            </Link>
        </section>
    );
}
