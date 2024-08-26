import Image from 'next/image';
import Link from 'next/link';
import contact from '@/data/contact';
import me from '@/public/images/icon-400.webp';
import styles from './header.module.scss';

export function Header() {
    const { text, href, label }: { text: string; href: string; label: string } =
        contact.find(({ header }) => header)!;

    return (
        <header className={[styles.header].join(' ')}>
            <div className={styles.avatar}>
                <Image src={me} alt="My memoji" priority />
            </div>
            <Link className={styles.name} href="/" aria-label="Home page">
                <span className={styles.text}>
                    <span className={[styles.name, styles.part].join(' ')}>
                        Stephen Matheis
                    </span>{' '}
                    <span className={styles.title}>Software Developer</span>
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
