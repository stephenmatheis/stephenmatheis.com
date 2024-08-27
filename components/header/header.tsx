import Link from 'next/link';
import contact from '@/data/contact';
import styles from './header.module.scss';

export function Header() {
    const { href, name, user } = contact.find(({ header }) => header)!;

    return (
        <header className={[styles.header].join(' ')}>
            <Link className={styles.name} href="/" aria-label="Home page">
                <span className={styles.text}>
                    <span className={[styles.name, styles.part].join(' ')}>
                        Stephen Matheis
                    </span>{' '}
                    <span className={styles.title}>Software Developer</span>
                </span>
            </Link>
            <div className={styles.right}>
                <div className={styles.name}>{name}</div>
                <Link href={href}>{user}</Link>
            </div>
        </header>
    );
}
