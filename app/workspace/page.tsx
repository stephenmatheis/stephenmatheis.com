import { Name } from '@/components/name';
import { Experience } from '@/components/experience';
import { Contact } from '@/components/contact';
import { Skills } from '@/components/skills';
import styles from './page.module.scss';

export default function AboutPage() {
    return (
        <div className={styles.page}>
            <main>
                <Name />
                <Contact />
                <Skills />
                <Experience />
            </main>
        </div>
    );
}
