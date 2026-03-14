import { Section } from '@/components/section';
import { updatedGroups } from '@/data/skills';
import styles from './skills.module.scss';

export function Skills() {
    return (
        <Section className={styles.skills} heading="Skills">
            <div className={styles.groups}>
                {updatedGroups.map(({ name, items }, index) => {
                    return (
                        <div key={index} className={styles.group}>
                            <div className={styles.name}>{name}</div>
                            <div className={styles.items}>
                                {items.map((item, index) => {
                                    if (index !== 0) {
                                        return (
                                            <span key={index} className={styles.item}>
                                                {' '}
                                                <span className={styles.spacer}>*</span> {item}
                                            </span>
                                        );
                                    }

                                    return <span key={index}>{item}</span>;
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </Section>
    );
}
