import { ReactNode } from 'react';
import Link from 'next/link';
import styles from './Header.module.scss';

type HeaderProps = {
    spinner?: boolean;
    pageTitle?: string;
    subHeading?: string | ReactNode;
};

export function Header({
    spinner = true,
    pageTitle = 'Front-End Software Engineer',
    subHeading = 'Apple',
}: HeaderProps) {
    return (
        <header className={styles.header}>
            <Link href="/">
                <div className={styles.block}>
                    <p>Stephen Matheis {spinner && <span className="spinner" aria-hidden="true"></span>}</p>
                    <p>{pageTitle}</p>
                    <p>{subHeading}</p>
                </div>
            </Link>
            {/* <nav>
                <ul>
                    <li>
                        <Link href="/library">[ Library ]</Link>
                    </li>
                    <li>
                        <Link href="/test">[ test ]</Link>
                    </li>
                </ul>
            </nav> */}
        </header>
    );
}
