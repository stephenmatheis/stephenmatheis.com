import Link from 'next/link';
import styles from './nav.module.scss';

export function Nav() {
    return (
        <nav className={styles.nav}>
            <ul>
                <li>
                    <Link href="/">home</Link>
                </li>
                <li>
                    <Link href="/resume">resume</Link>
                </li>
                <li>
                    <Link href="/blog">blog</Link>
                </li>
                <li>
                    <Link href="/apps">apps</Link>
                </li>
            </ul>
        </nav>
    );
}
