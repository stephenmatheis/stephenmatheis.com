import { Section } from '../section';
import styles from './About.module.scss';

export function About() {
    return (
        <Section className={styles.about} heading="">
            Full-stack developer. Holds an active TS/SCI clearance. 15 years of experience writing software for federal
            agencies. Expert in large distributed systems serving global critical.        </Section>
    );
}

//  [ NOTE: Add something about my
// experience with ESRI and the USWDS (spell it out). Need to mention UI/UX somewhere. And Agile software
// development. Like how I lead stand ups or was an uncertified Scrum master. Lead planning poker. Point
// estimation. Backlog grooming. Sprint planning. Retrospectives. Documentation. Include the world 'mobile,'
// probably at Aeyon.]
