import { Section } from '../section';
import styles from './About.module.scss';

export function About() {
    return (
        <Section className={styles.about} heading="">
            Full-stack developer. Holds an active TS/SCI clearance. 15 years of experience writing software for federal
            agencies. Expert in large distributed systems serving global critical.
        </Section>
    );
}
