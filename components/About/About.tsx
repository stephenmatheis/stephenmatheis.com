import { Section } from '../section';
import styles from './About.module.scss';

export function About() {
    return (
        <Section className={styles.about} heading="">
            Full-stack developer. Holds an active TS/SCI clearance. 15 years of experience delivering web and mobile
            solutions for federal agencies. Expert in large distributed systems serving critical missions around the
            world.
        </Section>
    );
}
