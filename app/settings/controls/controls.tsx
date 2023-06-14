'use client';

import { useState } from 'react';
import { Comment } from '@/components/comment';
import { Toggle } from '@/components/toggle';
import styles from './controls.module.scss';

export function Controls({}) {
    const [shouldResize, setShouldResize] = useState(false);

    return (
        <div className={styles.controls}>
            <Comment text={'Settings'} />
            <div />
            <div className={styles.label}>Mode</div>
            <Toggle
                options={['Light', 'Dark']}
                localStorageKey={'prefers-color-scheme'}
                shouldResize={shouldResize}
                setShouldResize={setShouldResize}
                addDataAttr
            />
            <div className={styles.label}>Font Size</div>
            <Toggle
                options={['12px', '16px', '20px']}
                localStorageKey={'font-size'}
                shouldResize={shouldResize}
                setShouldResize={setShouldResize}
                addCssVariable
            />
            <div className={styles.label}>Light theme</div>
            <Toggle
                options={['Green', 'Blue', 'Red', 'Monochrome']}
                defaultOption="Green"
                localStorageKey={'light-theme'}
                shouldResize={shouldResize}
                setShouldResize={setShouldResize}
                addDataAttr
            />
            <div className={styles.label}>Dark theme</div>
            <Toggle
                options={['Green', 'Blue', 'Red', 'Monochrome']}
                defaultOption="Green"
                localStorageKey={'dark-theme'}
                shouldResize={shouldResize}
                setShouldResize={setShouldResize}
                addDataAttr
            />
        </div>
    );
}
