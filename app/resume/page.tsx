import { Experience } from '@/components/experience';
import { Name } from '@/components/name';
import { Contact } from '@/components/contact';
import { Skills } from '@/components/skills';
import { Work } from '@/components/work';
import { Time } from '@/components/Time';
import { Education } from '@/components/education';
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
                            <Experience />
                            {/* <Education /> */}
                        </div>
                    </div>
                    <div className={styles.statusbar}>
                        <div className={styles.left}>
                            <div className={`${styles.mode} ${styles.normal}`}>
                                <span>NORMAL</span>
                            </div>
                            <div className={styles.file}>
                                {/* <svg width="16" height="16" viewBox="0 0 16 16" strokeLinejoin="round">
                                    <path
                                        d="M1.75 2H1V3.5H1.75H14.25H15V2H14.25H1.75ZM1 7H1.75H9.25H10V8.5H9.25H1.75H1V7ZM1 12H1.75H11.25H12V13.5H11.25H1.75H1V12Z"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        fill="currentColor"
                                    />
                                </svg> */}
                                <span>resume</span>
                            </div>
                        </div>
                        <div className={styles.right}>
                            <div className={styles.plugins}>
                                <svg width="16" height="16" viewBox="0 0 16 16" strokeLinejoin="round">
                                    <path
                                        d="M8 0.154663L8.34601 0.334591L14.596 3.58459L15 3.79466V4.25V11.75V12.2053L14.596 12.4154L8.34601 15.6654L8 15.8453L7.65399 15.6654L1.40399 12.4154L1 12.2053V11.75V4.25V3.79466L1.40399 3.58459L7.65399 0.334591L8 0.154663ZM2.5 11.2947V5.44058L7.25 7.81559V13.7647L2.5 11.2947ZM8.75 13.7647L13.5 11.2947V5.44056L8.75 7.81556V13.7647ZM8 1.84534L12.5766 4.22519L7.99998 6.51352L3.42335 4.2252L8 1.84534Z"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        fill="currentColor"
                                    />
                                </svg>
                                <span>2</span>
                            </div>
                            <div className={styles.outerbar}>
                                <div className={styles.position}>Top</div>
                                <div className={styles.line}>1:1</div>
                                <div className={styles.innerbar}>
                                    <Time />
                                </div>
                            </div>
                        </div>
                    </div>
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
