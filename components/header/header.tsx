import Link from 'next/link';
import styles from './header.module.scss';

export function Header() {
    return (
        <header className={styles.header}>
            <Link className={styles.name} href="/" aria-label="Home page">
                <span className={styles.text}>
                    <span className={[styles.name, styles.part].join(' ')}>Stephen Matheis</span>{' '}
                    <span className={styles.title}>Software Engineer</span>
                </span>
            </Link>
        </header>
    );
}
