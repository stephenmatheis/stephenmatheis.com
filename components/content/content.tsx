import { Header } from '@/components/header';
import { Experience } from '@/components/experience';
import { Contact } from '@/components/contact';
import { Skills } from '@/components/skills';
import { Projects } from '@/components/projects';
import styles from './content.module.scss';
import Link from 'next/link';

export function Content() {
    return (
        <main className={styles.content}>
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
            <div className={styles.lines}>
                {Array.from({ length: 58 }, (_, i) => (
                    <div key={i} className={styles.line}>
                        {i + 1}
                    </div>
                ))}
            </div>

            {/* Status Bar */}
            <div className={styles.statusbar}>
                <div className={styles.block}>
                    <a href="https://github.com/stephenmatheis/stephenmatheis.com/tree/main" target="_blank">
                        <span className={styles.git}>
                            <svg
                                width="7"
                                height="11"
                                viewBox="0 0 7 11"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M2.54545 11H0.636364V10.3123H2.54545V11Z" fill="currentColor" />
                                <path d="M0.636364 10.3123H0V8.24914H0.636364V10.3123Z" fill="currentColor" />
                                <path d="M3.18182 10.3123H2.54545V8.24914H3.18182V10.3123Z" fill="currentColor" />
                                <path
                                    d="M2.54545 3.43857H1.90909V6.186H2.54545V5.50172H3.18182V5.49828H5.09091V4.814H5.72727V5.50172H5.09091V6.186H3.18182V6.18943H2.54545V6.87371H1.90909V7.56143H2.54545V8.24914H0.636364V7.56143H1.27273V3.43857H0.636364V2.75086H2.54545V3.43857Z"
                                    fill="currentColor"
                                />
                                <path d="M6.36364 4.81057H4.45455V4.12285H6.36364V4.81057Z" fill="currentColor" />
                                <path d="M4.45455 4.12285H3.81818V2.05971H4.45455V4.12285Z" fill="currentColor" />
                                <path d="M7 4.12285H6.36364V2.05971H7V4.12285Z" fill="currentColor" />
                                <path d="M0.636364 2.75086H0V0.687715H0.636364V2.75086Z" fill="currentColor" />
                                <path d="M3.18182 2.75086H2.54545V0.687715H3.18182V2.75086Z" fill="currentColor" />
                                <path d="M6.36364 2.05971H4.45455V1.37199H6.36364V2.05971Z" fill="currentColor" />
                                <path d="M2.54545 0.687715H0.636364V0H2.54545V0.687715Z" fill="currentColor" />
                            </svg>
                        </span>
                        main*
                    </a>
                </div>
                <div className={styles.block}>
                    <span>UTF-8</span>
                    <span>LF</span>
                    <span>{'¶'} Plain Text</span>
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
