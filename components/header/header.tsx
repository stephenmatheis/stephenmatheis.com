import Link from 'next/link';
import contact from '@/data/contact';
import styles from './header.module.scss';

export function Header({ printOnly = false }) {
    const { text, href, label }: { text: string; href: string; label: string } =
        contact.find(({ header }) => header)!;

    return (
        <header
            className={[
                styles.header,
                ...(printOnly ? [styles['print-only']] : []),
            ].join(' ')}
            data-header
        >
            <Link
                className={styles.name}
                href="/"
                aria-label="Stephen Matheis Front-end Software Engineer"
            >
                <span className={styles.text} data-link-text-ctr>
                    <span
                        className={[styles.name, styles.part].join(' ')}
                        data-link-text
                    >
                        Stephen Matheis
                    </span>{' '}
                    <br data-header-break />
                    <span
                        className={[styles.title, styles.part].join(' ')}
                        data-link-text
                    >
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
