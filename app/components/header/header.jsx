import Link from 'next/link';
import classNames from 'classnames';
import styles from './header.module.scss';

export default function Header({}) {
    return (
        <>
            <header className={styles['header']}>
                <Link href="/" aria-label="Stephen Matheis' personal website">
                    <div
                        className={classNames([
                            styles['profile'],
                            styles['link-background'],
                        ])}
                    >
                        <span className={styles['name']}>Stephen Matheis</span>{' '}
                        <span className={styles['title']}>
                            Front-end Software Engineer
                        </span>
                    </div>
                </Link>
            </header>
        </>
    );
}
