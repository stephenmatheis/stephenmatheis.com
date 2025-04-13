import Image from 'next/image';
import Link from 'next/link';
import me from '@/public/images/icon-400.webp';
import styles from './links.module.scss';

export function Links() {
    return (
        <div className={styles.links}>
            <Link href="/">
                <div className={styles.avatar}>
                    <Image src={me} alt="My memoji" priority />
                </div>
            </Link>
            <div className={styles.text}>
                <span className={styles.name}>Stephen Matheis</span>{' '}
                <span className={styles.title}>Software Developer</span>
            </div>
            <nav>
                <ul>
                    <li>
                        <a href="https://github.com/stephenmatheis" target="_blank">
                            GitHub
                            <span className={styles.icon}>↗</span>
                        </a>
                    </li>
                    <li>
                        <a href="https://codepen.io/stephenmatheis" target="_blank">
                            CodePen
                            <span className={styles.icon}>↗</span>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/stephenmatheis/" target="_blank">
                            LinkedIn
                            <span className={styles.icon}>↗</span>
                        </a>
                    </li>
                    <li>
                        <Link href="/links">Links</Link>
                    </li>
                    <li>
                        <Link href="/resume">Resume</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
