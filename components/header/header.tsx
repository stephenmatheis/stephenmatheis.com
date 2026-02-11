import Link from 'next/link';
import { Comment } from '@/components/comment';
import styles from './header.module.scss';

// ↳

export function Header() {
    return (
        <section className={styles.name}>
            <Comment text="Links" />

            <div className={styles.list}>
                <div className={styles.item}>
                    <div className={styles.name}>GitHub</div>
                    <div className={styles.text}>
                        <Link href="https://github/stephenmatheis">stephenmatheis</Link>
                    </div>
                </div>
            </div>
            <div className={styles.list}>
                <div className={styles.item}>
                    <div className={styles.name}>CodePen</div>
                    <div className={styles.text}>
                        <Link href="https://codepen.io/stephenmatheis">stephenmatheis</Link>
                    </div>
                </div>
            </div>
            <div className={styles.list}>
                <div className={styles.item}>
                    <div className={styles.name}>Site</div>
                    <div className={styles.text}>
                        <Link href="https://stephenmatheis.com">stephenmatheis.com</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
