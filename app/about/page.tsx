'use client';

import { useState } from 'react';
import { Experience } from '@/components/experience';
import { Name } from '@/components/name';
import { Contact } from '@/components/contact';
import { Skills } from '@/components/skills';
import { Work } from '@/components/work';
import { Education } from '@/components/education';
import { About } from '@/components/About';
import { Certifications } from '@/components/Certifications';
import { Statusbar } from '@/components/Statusbar';
import { Time } from '@/components/Time';
import { useVimMotions } from '@/hooks/useVimMotions';
import styles from './page.module.scss';

export default function Page() {
    const [selected, setSelected] = useState<number>(0);
    const [horizontal, setHorizontal] = useState<number>(0);

    useVimMotions({
        maxHorizontal: 0,
        horizontal,
        setHorizontal,
        max: 0,
        selected,
        setSelected,
        onEnter() {
            console.log('Enter.');
        },
    });

    return (
        <div className={styles.page}>
            <div className={styles.sheet}>
                <div className={styles.content}>
                    <div className={styles.columns}>
                        <div className={styles.numbers}>
                            {Array.from({ length: 54 }).map((_, index) => {
                                return (
                                    <div key={index} className={styles.number}>
                                        {index + 1}
                                    </div>
                                );
                            })}
                        </div>
                        <div className={styles.left}>
                            <Name />
                            <Contact />
                            <Skills />
                            {/* <Work /> */}
                        </div>
                        <div className={styles.right}>
                            <About />
                            <Experience />
                            <Education />
                            <Certifications />
                        </div>
                    </div>
                    <Statusbar
                        msg="stephen-matheis-resume"
                        outerBar={
                            <a className={styles.download} href="/stephen-matheis-resume.pdf" target="_blank">
                                <svg width="12" height="12" viewBox="0 0 16 16" strokeLinejoin="round">
                                    <path
                                        d="M14.5 13.5V6.5V5.41421C14.5 5.149 14.3946 4.89464 14.2071 4.70711L9.79289 0.292893C9.60536 0.105357 9.351 0 9.08579 0H8H3H1.5V1.5V13.5C1.5 14.8807 2.61929 16 4 16H12C13.3807 16 14.5 14.8807 14.5 13.5ZM13 13.5V6.5H9.5H8V5V1.5H3V13.5C3 14.0523 3.44772 14.5 4 14.5H12C12.5523 14.5 13 14.0523 13 13.5ZM9.5 5V2.12132L12.3787 5H9.5ZM5.13 5.00062H4.505V6.25062H5.13H6H6.625V5.00062H6H5.13ZM4.505 8H5.13H11H11.625V9.25H11H5.13H4.505V8ZM5.13 11H4.505V12.25H5.13H11H11.625V11H11H5.13Z"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        fill="currentColor"
                                    />
                                </svg>
                                <span>Download</span>
                            </a>
                        }
                        innerBar={<Time />}
                    />
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
