import { Title } from '@/components/title';
import { Viewport } from '@/components/viewport';
import { Content } from '@/components/content';
import { Name } from '@/components/name';
import { Experience } from '@/components/experience';
import { Contact } from '@/components/contact';
import { Skills } from '@/components/skills';
import { Work } from '@/components/work';
import styles from './page.module.scss';

export default function AboutPage() {
    return (
        <>
            <Title>resume</Title>
            <Viewport>
                <Content>
                    <div className={styles.page}>
                        <div className={styles.left}>
                            <Name />
                            <Contact />
                            <Skills />
                            <Work />
                        </div>
                        <div className={styles.right}>
                            <Experience />
                        </div>
                    </div>
                </Content>
                <div id="markup-overlay" />
            </Viewport>
        </>
    );
}
