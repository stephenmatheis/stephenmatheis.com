import classNames from 'classnames';
import Experience from '@/components/experience';
import Skills from '@/components/skills';
import Projects from '@/components/projects';
import Contact from '@/components/contact';
import styles from './main.module.scss';

export default function Main({ type, speed, loading, fade }) {
    return (
        <main
            className={
                classNames(styles['main'],
                    {
                        [styles['fade']]: fade,
                        [styles['loading']]: loading
                    }
                )
            }
        >
            <section className={styles['left']}>
                <Experience type={type} speed={speed} />
            </section>
            <section className={styles['right']}>
                <Skills type={type} speed={speed} />
                <Projects type={type} speed={speed} />
                <Contact type={type} speed={speed} fade={fade} />
            </section>
        </main>
    );
}