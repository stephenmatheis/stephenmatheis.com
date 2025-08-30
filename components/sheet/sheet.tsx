'use client';

import { useGuides } from '@/providers/guides-provider';
import styles from './sheet.module.scss';

export function Sheet({ children }: { children: React.ReactNode }) {
    const { isOn } = useGuides();

    return <div className={`${styles.sheet} ${isOn ? ` ${styles.guide}` : ''}`}>{children}</div>;
}
