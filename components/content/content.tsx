import { Header } from '@/components/header';
import { Experience } from '@/components/experience';
import { Contact } from '@/components/contact';
import { Skills } from '@/components/skills';
import { Projects } from '@/components/projects';
import styles from './content.module.scss';

export function Content() {
    return (
        <main className={styles.content}>
            {/* Lines */}
            <div className={styles.lines}>
                {Array.from({ length: 58 }, (_, i) => (
                    <div key={i} className={styles.line}>
                        {i + 1}
                    </div>
                ))}
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
