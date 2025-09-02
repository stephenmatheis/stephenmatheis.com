import { Name } from '@/components/name';
import { Experience } from '@/components/experience';
import { Contact } from '@/components/contact';
import { Skills } from '@/components/skills';
import { Work } from '@/components/work';
import { Sheet } from '@/components/sheet';
import { Content } from '@/components/content';
import { About } from '@/components/about';
import { Toolbar } from '@/components/toolbar';
import styles from './page.module.scss';

export default function AboutPage() {
    return (
        <>
            <Sheet>
                <Content>
                    {/* <About /> */}

                    <div className={styles.column}>
                        <div className={`${styles.row} ${styles.right} ${styles.flex1}`}>
                            <Name />
                        </div>
                        <Experience />
                        <Skills />
                        <div className={`${styles.row} ${styles.between}`}>
                            <Work />
                            <Contact />
                        </div>
                    </div>
                </Content>
            </Sheet>
            <Toolbar />
        </>
    );
}
