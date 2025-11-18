import { Name } from '@/components/name';
import { Experience } from '@/components/experience';
import { Contact } from '@/components/contact';
import { Skills } from '@/components/skills';
import { Work } from '@/components/work';
import styles from './page.module.scss';

export default function AboutPage() {
    return (
        <div className={styles.page}>
            <div className={styles.left}>
                <Name />
                <Experience />
            </div>
            <div className={styles.right}>
                <Contact />
                <Skills />
                {/* <Work /> */}
            </div>
        </div>
    );
}
