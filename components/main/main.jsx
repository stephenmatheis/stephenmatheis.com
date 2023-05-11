import classNames from 'classnames';
import Experience from '@/components/experience';
import Skills from '@/components/skills';
import Projects from '@/components/projects';
import Contact from '@/components/contact';
import styles from './main.module.scss';

export default function Main({ speed, loading, fade }) {
    return (
        <main
            className={classNames(styles['main'], {
                [styles['fade']]: fade,
                [styles['loading']]: loading,
            })}
        >
            <section className={styles['left']}>
                <Experience speed={speed} />
            </section>
            <section className={styles['right']}>
                <Skills speed={speed} />
                <Projects speed={speed} />
                <Contact speed={speed} fade={fade} />
            </section>
        </main>
    );
}
