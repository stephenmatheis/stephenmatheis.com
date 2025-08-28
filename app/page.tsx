import { Name } from '@/components/name';
import { Experience } from '@/components/experience';
import { Contact } from '@/components/contact';
import { Skills } from '@/components/skills';
import { Work } from '@/components/work';
import { Sheet } from '@/components/sheet';
import { Content } from '@/components/content';
import { About } from '@/components/about';
import styles from './page.module.scss';
import { Education } from '@/components/education';

export default function AboutPage() {
    return (
        <Sheet>
            <Content>
                <Name />
                <About />
                <Contact />
                <div className={styles.columns}>
                    <div className={styles.left}>
                        <Experience />
                    </div>
                    <div className={styles.right}>
                        <Skills />
                        <Work />
                        <Education />
                    </div>
                </div>
            </Content>
        </Sheet>
    );
}
