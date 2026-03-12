import { Section } from '@/components/section';
import skills, { updatedGroups } from '@/data/skills';
import styles from './skills.module.scss';

export function Skills() {
    return (
        <Section className={styles.skills} heading="Skills">
            <div className={styles.groups}>
                {/* {skills.map((skill) => (
                    <div key={skill}>{skill}</div>
                ))} */}
                {updatedGroups.map(({ name, items }, index) => {
                    return (
                        <div key={index} className={styles.group}>
                            <div className={styles.name}>{name}</div>
                            {/* <ul>
                                {items.map((item, j) => {
                                    return <li key={j}>{item}</li>;
                                })}
                            </ul> */}
                            <div className={styles.items}>{items.join(', ')}</div>
                        </div>
                    );
                })}
            </div>
        </Section>
    );
}
