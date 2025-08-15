'use client';

import { usePage } from '@/providers/page-provider';
import { Section } from '@/components/section';
import skills from '@/data/skills';
import styles from './skills.module.scss';

export function Skills() {
    const { page } = usePage();

    return (
        <Section className={styles.skills} heading="Skills" data-page={page}>
            <div className={styles.groups}>
                {skills.map(({ group, items }, index) => {
                    return (
                        <div key={index} className={styles.group}>
                            <div className={styles.name}>{group}</div>
                            <span className={styles.items}>
                                {items.map((item, index) => {
                                    return (
                                        <span key={item} className={styles.item}>
                                            {item}
                                            {index !== items.length - 1 ? ',' : ''}
                                        </span>
                                    );
                                })}
                            </span>
                        </div>
                    );
                })}
            </div>
        </Section>
    );
}
