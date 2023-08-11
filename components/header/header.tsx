import Link from 'next/link';
import styles from './header.module.scss';

export function Header() {
    return (
        <>
            <header className={styles['header']} data-header>
                <Link href="/" aria-label="Stephen Matheis' personal website">
                    <span className={styles.text}>
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
            </header>
        </>
    );
}
