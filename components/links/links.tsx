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
                        <a
                            href="https://github.com/stephenmatheis"
                            target="_blank"
                        >
                            GitHub
                            <span className={styles.icon}>
                                <svg width="12" height="12" viewBox="0 0 12 12">
                                    <path d="M3.5 3C3.22386 3 3 3.22386 3 3.5C3 3.77614 3.22386 4 3.5 4V3ZM8.5 3.5H9C9 3.22386 8.77614 3 8.5 3V3.5ZM8 8.5C8 8.77614 8.22386 9 8.5 9C8.77614 9 9 8.77614 9 8.5H8ZM2.64645 8.64645C2.45118 8.84171 2.45118 9.15829 2.64645 9.35355C2.84171 9.54882 3.15829 9.54882 3.35355 9.35355L2.64645 8.64645ZM3.5 4H8.5V3H3.5V4ZM8 3.5V8.5H9V3.5H8ZM8.14645 3.14645L2.64645 8.64645L3.35355 9.35355L8.85355 3.85355L8.14645 3.14645Z" />
                                </svg>
                            </span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://codepen.io/stephenmatheis"
                            target="_blank"
                        >
                            CodePen
                            <span className={styles.icon}>
                                <svg width="12" height="12" viewBox="0 0 12 12">
                                    <path d="M3.5 3C3.22386 3 3 3.22386 3 3.5C3 3.77614 3.22386 4 3.5 4V3ZM8.5 3.5H9C9 3.22386 8.77614 3 8.5 3V3.5ZM8 8.5C8 8.77614 8.22386 9 8.5 9C8.77614 9 9 8.77614 9 8.5H8ZM2.64645 8.64645C2.45118 8.84171 2.45118 9.15829 2.64645 9.35355C2.84171 9.54882 3.15829 9.54882 3.35355 9.35355L2.64645 8.64645ZM3.5 4H8.5V3H3.5V4ZM8 3.5V8.5H9V3.5H8ZM8.14645 3.14645L2.64645 8.64645L3.35355 9.35355L8.85355 3.85355L8.14645 3.14645Z" />
                                </svg>
                            </span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.linkedin.com/in/stephenmatheis/"
                            target="_blank"
                        >
                            LinkedIn
                            <span className={styles.icon}>
                                <svg width="12" height="12" viewBox="0 0 12 12">
                                    <path d="M3.5 3C3.22386 3 3 3.22386 3 3.5C3 3.77614 3.22386 4 3.5 4V3ZM8.5 3.5H9C9 3.22386 8.77614 3 8.5 3V3.5ZM8 8.5C8 8.77614 8.22386 9 8.5 9C8.77614 9 9 8.77614 9 8.5H8ZM2.64645 8.64645C2.45118 8.84171 2.45118 9.15829 2.64645 9.35355C2.84171 9.54882 3.15829 9.54882 3.35355 9.35355L2.64645 8.64645ZM3.5 4H8.5V3H3.5V4ZM8 3.5V8.5H9V3.5H8ZM8.14645 3.14645L2.64645 8.64645L3.35355 9.35355L8.85355 3.85355L8.14645 3.14645Z" />
                                </svg>
                            </span>
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
