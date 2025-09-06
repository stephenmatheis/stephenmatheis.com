import { Section } from '@/components/section';
import skills from '@/data/skills';
import styles from './skills.module.scss';

export function Skills() {
    return (
        <Section className={styles.skills} heading="Skills">
            {skills.map((skill) => (
                <p key={skill}>{skill}</p>
            ))}

            {/* {skills.join(', ')} */}
        </Section>
    );
}
