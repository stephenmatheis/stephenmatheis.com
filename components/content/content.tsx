import Link from 'next/link';
import { Header } from '@/components/header';
import { Experience } from '@/components/experience';
import { Contact } from '@/components/contact';
import { Skills } from '@/components/skills';
import { Projects } from '@/components/projects';
import styles from './content.module.scss';

// TODO: Add a console game.

export function Content() {
    return (
        <main className={styles.content}>
            {/* Left Column Width */}
            <div className={styles.leftwidth}>
                <svg width="392" height="7" viewBox="0 0 392 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M4 7H3V6H4V7ZM389 7H388V6H389V7ZM3 6H2V5H3V6ZM390 6H389V5H390V6ZM2 3H390V2H391V3H392V4H391V5H390V4H2V5H1V4H0V3H1V2H2V3ZM3 2H2V1H3V2ZM390 2H389V1H390V2ZM4 1H3V0H4V1ZM389 1H388V0H389V1Z"
                        fill="currentColor"
                    />
                </svg>
                <div className={styles.label}>56ch</div>
            </div>

            {/* Right Column Width */}
            <div className={styles.rightwidth}>
                <svg width="245" height="7" viewBox="0 0 245 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M4 7H3V6H4V7ZM242 7H241V6H242V7ZM3 6H2V5H3V6ZM243 6H242V5H243V6ZM2 3H243V2H244V3H245V4H244V5H243V4H2V5H1V4H0V3H1V2H2V3ZM3 2H2V1H3V2ZM243 2H242V1H243V2ZM4 1H3V0H4V1ZM242 1H241V0H242V1Z"
                        fill="currentColor"
                    />
                </svg>
                <div className={styles.label}>35ch</div>
            </div>

            {/* Breadcrumbs */}
            <div className={styles.breadcrumbs}>
                {['app', 'page', 'resume'].map((crumb, i, arr) => (
                    <span key={i}>
                        <Link href="/">{crumb}</Link>
                        {i < arr.length - 1 && ' > '}
                    </span>
                ))}
            </div>

            {/* Lines */}
            <div className={styles.linenumbers}>
                {Array.from({ length: 107 }, (_, i) => (
                    <div key={i} className={styles.line}>
                        {i + 1}
                    </div>
                ))}
            </div>

            {/* Status Bar */}
            <div className={styles.statusbar}>
                <div className={styles.block}>
                    <Link href="https://github.com/stephenmatheis/stephenmatheis.com/tree/main" target="_blank">
                        <svg width="11" height="17" viewBox="0 0 11 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 17H1V16H4V17Z" fill="currentColor" />
                            <path d="M1 16H0V13H1V16Z" fill="currentColor" />
                            <path d="M5 16H4V13H5V16Z" fill="currentColor" />
                            <path d="M4 5H3V10H4V11H3V12H4V13H1V12H2V5H1V4H4V5Z" fill="currentColor" />
                            <path d="M8 10H4V9H8V10Z" fill="currentColor" />
                            <path d="M10 8H9V9H8V8H7V7H10V8Z" fill="currentColor" />
                            <path d="M7 7H6V4H7V7Z" fill="currentColor" />
                            <path d="M11 7H10V4H11V7Z" fill="currentColor" />
                            <path d="M1 4H0V1H1V4Z" fill="currentColor" />
                            <path d="M5 4H4V1H5V4Z" fill="currentColor" />
                            <path d="M10 4H7V3H10V4Z" fill="currentColor" />
                            <path d="M4 1H1V0H4V1Z" fill="currentColor" />
                        </svg>
                        main*
                    </Link>
                </div>
                <div className={styles.block}>
                    <Link href="https://www.unicode.org/versions/Unicode8.0.0/" target="_blank">
                        UTF-8
                    </Link>
                    <Link
                        href="https://docs.github.com/en/get-started/git-basics/configuring-git-to-handle-line-endings"
                        target="_blank"
                    >
                        LF
                    </Link>
                    <Link href="https://en.wikipedia.org/wiki/Plain_text" target="_blank">
                        {'¶'} Plain Text
                    </Link>
                </div>
            </div>
            <div className={styles.left}>
                <Header />
                <Experience />
            </div>
            <div className={styles.right}>
                <Contact />
                <Skills />
                <Projects />
            </div>
        </main>
    );
}
