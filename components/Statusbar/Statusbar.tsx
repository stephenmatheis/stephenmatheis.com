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
                    <div className={styles.print}>Updated</div>
                    <div className={styles.innerbar}>{innerBar}</div>
                </div>
            </div>
        </div>
    );
}
