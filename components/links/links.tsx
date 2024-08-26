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
                <span className={[styles.name, styles.part].join(' ')}>
                    Stephen Matheis
                </span>{' '}
                <span className={styles.title}>Software Developer</span>
            </div>
            <nav>
                <ul>
                    <li>
                        <a
                            href="https://github.com/stephenmatheis"
                            target="_blank"
                        >
                            GitHub
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://codepen.io/stephenmatheis"
                            target="_blank"
                        >
                            CodePen
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.linkedin.com/in/stephenmatheis/"
                            target="_blank"
                        >
                            LinkedIn
                        </a>
                    </li>
                    <li>
                        <Link href="/resume">Resume</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
