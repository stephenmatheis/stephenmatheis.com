import { Experience } from '@/components/experience';
import { Skills } from '@/components/skills';
import { Projects } from '@/components/projects';
import { Contact } from '@/components/contact';
import styles from './content.module.scss';

export function Content() {
    return (
        <main className={styles.content}>
            <section className={styles.left}>
                <Experience />
            </section>
            <section className={styles.right}>
                <Skills />
                <Projects />
                <Contact />
            </section>
        </main>
    );
}
