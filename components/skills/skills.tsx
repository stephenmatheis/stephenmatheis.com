import { Section } from '@/components/section';
import skills from '@/data/skills';
import styles from './skills.module.scss';

export function Skills() {
    return (
        <Section className={styles.skills} heading="Skills">
            <div className={styles.groups}>
                {skills.map(({ items }, index) => {
                    return (
                        <div key={index} className={styles.group}>
                            <span className={styles.items}>
                                {items.map((item) => {
                                    return (
                                        <span key={item} className={styles.item}>
                                            {item}
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
