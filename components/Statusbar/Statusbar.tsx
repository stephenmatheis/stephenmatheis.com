'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useMode } from '@/providers/ModeProvider';
import { ControlsGuide } from '@/components/ControlsGuide';
import styles from './Statusbar.module.scss';

type StatusbarProps = {
    msg: ReactNode | string;
    outerBar: ReactNode | string;
    innerBar: ReactNode | string;
};

export function Statusbar({ msg, outerBar, innerBar }: StatusbarProps) {
    const { mode } = useMode();
    const [showGuide, setShowGuide] = useState<boolean>(false);

    useEffect(() => {
        if (mode === 'INSERT') {
            setShowGuide(false);

            return;
        }

        function handleKeydown(event: KeyboardEvent) {
            if (event.shiftKey || event.metaKey || event.ctrlKey || event.altKey) return;

            if (event.key === '/') {
                setShowGuide((prev) => !prev);

                return;
            }
        }

        window.addEventListener('keydown', handleKeydown);

        return () => {
            window.removeEventListener('keydown', handleKeydown);
        };
    }, [mode]);

    return (
        <div className={styles.statusbar}>
            {showGuide && <ControlsGuide />}
            <div className={styles.left}>
                <div className={`${styles.mode} ${styles[mode]}`}>
                    <span className={styles.screen}>{mode}</span>
                    <span className={styles.print}>{mode}</span>
                </div>
                <div className={styles.file}>
                    <span>{msg}</span>
                </div>
            </div>
            <div className={styles.center}></div>
            <div className={styles.right}>
                {/* TODO: if chord started */}
                {/* <span className={styles.chord}>
                    <span>d</span>{' '}
                    <svg width="12" height="12" viewBox="0 0 16 16" strokeLinejoin="round">
                        <path
                            d="M10.5 14.0607L9.96966 13.5303L5.14644 8.7071C4.75592 8.31658 4.75592 7.68341 5.14644 7.29289L9.96966 2.46966L10.5 1.93933L11.5607 2.99999L11.0303 3.53032L6.56065 7.99999L11.0303 12.4697L11.5607 13L10.5 14.0607Z"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            fill="currentColor"
                        />
                    </svg>
                </span> */}
                <span className={styles.help} onClick={() => setShowGuide((prev) => !prev)}>
                    <span className={styles.screen}>show cmds</span> /
                </span>
                <div className={styles.outerbar}>
                    <span className={styles.screen}>{outerBar}</span>
                    <div className={styles.print}>8.5in x 11in</div>
                    <div className={styles.innerbar}>{innerBar}</div>
                </div>
            </div>
        </div>
    );
}

/* 

<svg width="16" height="16" viewBox="0 0 16 16" strokeLinejoin="round">
    <path
        d="M1.75 2H1V3.5H1.75H14.25H15V2H14.25H1.75ZM1 7H1.75H9.25H10V8.5H9.25H1.75H1V7ZM1 12H1.75H11.25H12V13.5H11.25H1.75H1V12Z"
        fillRule="evenodd"
        clipRule="evenodd"
        fill="currentColor"
    />
</svg> 

*/

/* 
    <div className={styles.statusbar}>
    <div className={styles.left}>
        <div className={`${styles.mode} ${styles.normal}`}>
            <span>VERSION</span>
        </div>
        <div className={styles.file}>
            <span>2.0.35</span>
        </div>
        <div className={styles.file}>
            <span>resume</span>
        </div>
        <div className={styles.stats}>
            <span className={styles.stat}>bg: #282828</span> <span className={styles.stat}>fg: #ebdbb2</span>{' '}
            <span className={styles.stat}>font: hack</span> <span className={styles.stat}>size: 12px</span>{' '}
            <span className={styles.stat}>height: 18px</span>
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
            <div className={styles.position}>hjkl</div>
            <div className={styles.line}>42:42</div>
            <div className={styles.innerbar}>
                <Time />
            </div>
        </div>
    </div>
    <div className={styles.left}>
        <div className={`${styles.mode} ${styles.normal}`}>
            <span>NORMAL</span>
        </div>
        <div className={styles.file}>
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

*/
