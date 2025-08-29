'use client';

import { Section } from '@/components/section';
import styles from './name.module.scss';

export function Name() {
    return (
        <Section className={styles.name}>
            <h1>Stephen Matheis</h1>
            <p>Software Engineer</p>
        </Section>
    );
}
