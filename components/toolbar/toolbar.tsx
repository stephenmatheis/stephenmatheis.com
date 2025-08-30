'use client';

import { useGuides } from '@/providers/guides-provider';
import styles from './toolbar.module.scss';

export function Toolbar() {
    const { isOn, setIsOn } = useGuides();

    return (
        <div className={styles.toolbar}>
            <button className={isOn ? styles.on : ''} onClick={() => setIsOn((prev) => !prev)}>
                Guides {isOn ? 'On' : 'Off'}
            </button>
        </div>
    );
}
