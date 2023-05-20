import classNames from 'classnames';
import Experience from '@/components/experience';
import Skills from '@/components/skills';
import Projects from '@/components/projects';
import Contact from '@/components/contact';
import styles from './main.module.scss';

export default function Main({ loading, fade }) {
    return (
        <main
            className={classNames(styles['main'], {
                [styles['fade']]: fade,
                [styles['loading']]: loading,
            })}
        >
            <section className={styles['left']}>
                <Experience />
            </section>
            <section className={styles['right']}>
                <Skills />
                <Projects />
                <Contact fade={fade} />
            </section>
        </main>
    );
}
