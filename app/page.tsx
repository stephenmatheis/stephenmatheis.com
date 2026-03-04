import { Experience } from '@/components/experience';
import { Name } from '@/components/name';
import { Contact } from '@/components/contact';
import { Skills } from '@/components/skills';
import { Work } from '@/components/work';
import { Education } from '@/components/education';
import { About } from '@/components/About';
import { Certifications } from '@/components/Certifications';
import { Statusbar } from '@/components/Statusbar';
import styles from './page.module.scss';

export default function Page() {
    return (
        <div className={styles.page}>
            <div className={styles.sheet}>
                <div className={styles.content}>
                    <div className={styles.columns}>
                        <div className={styles.left}>
                            <Name />
                            <Contact />
                            <Skills />
                            <Work />
                        </div>
                        <div className={styles.right}>
                            <About />
                            <Experience />
                            <Education />
                            <Certifications />
                        </div>
                    </div>
                    <Statusbar />
                </div>
            </div>
        </div>
    );
}

/*

<div>
    <div style={{ height: 'var(--line-height)', display: 'flex', alignItems: 'center' }}>
        {Array.from({ length: 10 }).map((_, i) => {
            return (
                <svg
                    key={i}
                    width="12"
                    height="12"
                    viewBox="0 0 45 45"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M18 0H21V45H18V0Z" fill="var(--fg3)" />
                    <path d="M42 0H45V45H42V0Z" fill="var(--fg3)" />
                    <path d="M0 0H3V45H0V0Z" fill="var(--fg3)" />
                    <path d="M6 0H15V45H6V0Z" fill="var(--fg3)" />
                    <path d="M24 0H33V45H24V0Z" fill="var(--fg3)" />
                </svg>
            );
        })}
    </div>
    <div></div>
</div>

*/
