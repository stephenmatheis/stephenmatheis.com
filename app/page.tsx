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
import { Title } from '@/components/title';

export default function AboutPage() {
    return (
        <>
            <Sheet>
                <Content>
                    {/* <About /> */}
                    <div className={styles.column}>
                        <div className={`${styles.row} ${styles.between}`}>
                            <div>
                                <Name />
                                <Title />
                            </div>
                            <Contact />
                        </div>
                        <div className={`${styles.row}`}>
                            <Experience />
                            <div>
                                <Skills />
                                <Work />
                            </div>
                        </div>
                    </div>
                </Content>
            </Sheet>
            <Toolbar />
        </>
    );
}
