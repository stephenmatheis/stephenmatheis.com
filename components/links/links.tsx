import Image from 'next/image';
import styles from './links.module.scss';
import me from '@/public/favicons/icon-512.png';
import Link from 'next/link';

export function Links() {
    return (
        <div className={styles.links}>
            <Link href="/">
                <div className={styles.avatar}>
                    <Image src={me} alt="My memoji" priority />
                </div>
            </Link>
            <div className={styles.name}>Stephen Matheis</div>
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
                        <a href="" target="_blank">
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
                        <a href="/resume" target="_blank">
                            Resume
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
