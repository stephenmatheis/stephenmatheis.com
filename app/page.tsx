import { Name } from '@/components/name';
import { Experience } from '@/components/experience';
import { Contact } from '@/components/contact';
import { Skills } from '@/components/skills';
import { Work } from '@/components/work';
import { Sheet } from '@/components/sheet';
import { Content } from '@/components/content';
import { About } from '@/components/about';
import styles from './page.module.scss';
import { Toolbar } from '@/components/toolbar';

export default function AboutPage() {
    return (
        <>
            <Sheet>
                <Content>
                    <div className={styles.flex}>
                        {/* <div className={styles.header}>
                        <Name />
                    </div> */}
                        <div className={styles.grid}>
                            <About />
                            <Contact />
                            <Experience />
                            <Skills />
                            <Work />
                        </div>
                    </div>
                </Content>
            </Sheet>
            <Toolbar />
        </>
    );
}
