import classNames from 'classnames';
import Experience from '@/components/experience';
import Skills from '@/components/skills';
import Projects from '@/components/projects';
import Contact from '@/components/contact';
import styles from './main.module.scss';

export default function Main({}) {
    return (
        <main className={styles.main}>
            <section className={styles.left}>
                <Skills />
                <Projects />
                <Contact />
            </section>
            <section className={styles.right}>
                <Experience />
            </section>
        </main>
    );
}
