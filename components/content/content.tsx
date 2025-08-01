import { Name } from '@/components/name';
import { Experience } from '@/components/experience';
import { Contact } from '@/components/contact';
import { Skills } from '@/components/skills';
import { Work } from '@/components/work';
import styles from './content.module.scss';

export function Content() {
    return (
        <main className={styles.content}>
            <Name />
            <Contact />
            <Experience />
            <Skills />
            <Work />
        </main>
    );
}
