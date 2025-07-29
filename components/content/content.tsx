'use client';

import Link from 'next/link';
import { useOverlay } from '@/providers/overlay';
import { Name } from '@/components/name';
import { Experience } from '@/components/experience';
import { Contact } from '@/components/contact';
import { Skills } from '@/components/skills';
import { Projects } from '@/components/projects';
import styles from './content.module.scss';

// TODO: Add a console game.

export function Content() {
    const { overlays } = useOverlay();

    return (
        <main className={styles.content}>
            <div className={styles.left}>
                <Name />
                <Experience />
            </div>
            <div className={styles.right}>
                <Contact />
                <Skills />
                <Projects />
            </div>
        </main>
    );
}
