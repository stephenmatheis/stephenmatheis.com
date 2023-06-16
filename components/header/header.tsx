import Link from 'next/link';
import styles from './header.module.scss';

export function Header({}) {
    return (
        <>
            <header className={styles['header']}>
                <Link href="/" aria-label="Stephen Matheis' personal website">
                    <span className={styles.text}>
                        <span className={[styles.name, styles.part].join(' ')}>
                            Stephen Matheis
                        </span>{' '}
                        <span className={[styles.title, styles.part].join(' ')}>
                            Front-end Software Engineer
                        </span>
                    </span>
                </Link>
            </header>
        </>
    );
}
