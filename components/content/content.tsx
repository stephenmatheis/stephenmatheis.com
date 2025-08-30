'use client';

import { useGuides } from '@/providers/guides-provider';
import styles from './content.module.scss';

export function Content({ children }: { children: React.ReactNode }) {
    const { isOn } = useGuides();

    return <main className={`${styles.content} ${isOn ? ` ${styles.guide}` : ''}`}>{children}</main>;
}
