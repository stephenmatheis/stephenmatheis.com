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
                <div className={styles.buttons}>
                    <button>Print</button>
                    <button>System</button>
                    <button>Light</button>
                    <button>Dark</button>
                </div>
                <div className={styles.status}>
                    <button>Status #1</button>
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
