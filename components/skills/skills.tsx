import { Section } from '@/components/section';
import skills from '@/data/skills';
import styles from './skills.module.scss';

export function Skills() {
    return (
        <Section className={styles.skills} heading="Skills">
            <div className={styles.groups}>
                {skills.map(({ group, items }, index) => {
                    return (
                        <div key={index} className={styles.group}>
                            <div className={styles.name}>{group}</div>
                            <span className={styles.items}>{items.join(', ')}</span>
                        </div>
                    );
                })}
            </div>
        </Section>
    );
}
