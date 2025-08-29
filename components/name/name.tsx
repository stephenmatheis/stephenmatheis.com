'use client';

import styles from './name.module.scss';

export function Name() {
    return (
        <h1 className={styles.name}>
            <span>Steve</span>
            <span>Matheis</span>
        </h1>
    );
}
