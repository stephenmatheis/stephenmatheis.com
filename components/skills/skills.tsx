import { Section } from '@/components/section';
import skills from '@/data/skills';
import styles from './skills.module.scss';

export function Skills() {
    return (
        <Section className={styles.skills} heading="Skills">
            <div className={styles.groups}>
                {skills.map(({ group, items }) => (
                    <div key={group} className={styles.group}>
                        <h3>{group}</h3>
                        <ul>
                            {items.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </Section>
    );
}
