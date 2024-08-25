import Link from 'next/link';
import contact from '@/data/contact';
import styles from './header.module.scss';

export function Header() {
    const { text, href, label }: { text: string; href: string; label: string } =
        contact.find(({ header }) => header)!;

    return (
        <header className={[styles.header].join(' ')}>
            <Link
                className={styles.name}
                href="/"
                aria-label="Stephen Matheis Front-end Software Engineer"
            >
                <span className={styles.text}>
                    <span className={[styles.name, styles.part].join(' ')}>
                        Stephen Matheis
                    </span>{' '}
                    <span className={[styles.title, styles.part].join(' ')}>
                        Front-end Software Engineer
                    </span>
                </span>
            </Link>
            <div className={styles.right}>
                <Link href={href} aria-label={label}>
                    {text}
                </Link>
            </div>
        </header>
    );
}
