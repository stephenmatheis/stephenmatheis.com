import { Experience } from '@/components/experience';
import { Contact } from '@/components/contact';
import { Skills } from '@/components/skills';
import { Projects } from '@/components/projects';
import { Education } from '../education';
import styles from './content.module.scss';
import { Interests } from '../interests';

export function Content() {
    return (
        <main className={styles.content}>
            <section className={styles.left}>
                <Experience />
            </section>
            <section className={styles.right}>
                <Contact />
                <Skills />
                <Projects />
                {/* <Education /> */}
                <Interests />
            </section>
        </main>
    );
}
