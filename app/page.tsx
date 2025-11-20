import { Name } from '@/components/name';
import { Experience } from '@/components/experience';
import { Contact } from '@/components/contact';
import { Skills } from '@/components/skills';
import { Work } from '@/components/work';
import styles from './page.module.scss';

export default function AboutPage() {
    return (
        <div className={styles.page}>
            {/* <div>
                <div style={{ color: '#ffffff' }}>Stephen Matheis</div>
                <div style={{ color: '#cccccc' }}>Stephen Matheis</div>
                <div style={{ color: '#888888' }}>Stephen Matheis</div>
            </div> */}
            <div className={styles.left}>
                <Name />
                <div>
                    For the past 11 years I’ve worked exclusively as a professional software engineer building
                    applications for clients like Apple, the Department of War, and the National Oceanic and Atmospheric
                    Administration.
                </div>
                <Experience />
                <Work />
            </div>
            <div className={styles.right}>
                <Contact />
                <Skills />
            </div>
        </div>
    );
}
