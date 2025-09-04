import { Heading } from '@/components/heading';
import styles from './skills.module.scss';

const skills = ['JavaScript/TypeScript', 'HTML', 'CSS/SCSS', 'Node.js', 'React', 'Next.js', 'AWS', 'MongoDB', 'Figma'];

export function Skills() {
    return (
        <div className={styles.skills}>
            <Heading>Skills</Heading>
            <div className={styles.items}>
                {skills.map((skill) => (
                    <div key={skill} className={styles.skill}>
                        {skill}
                    </div>
                ))}
            </div>
        </div>
    );
}
