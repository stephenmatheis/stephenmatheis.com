import { Section } from '@/components/section';
import { Project } from '@/components/project';
import projects from '@/data/projects';
import styles from './projects.module.scss';

export function Projects() {
    return (
        <Section className={styles.projects} heading="Projects">
            <div className={styles['projects-wrapper']}>
                {projects.map(({ name, link, description }) => (
                    <Project
                        key={name}
                        name={name}
                        link={link}
                        description={description}
                    />
                ))}
            </div>
        </Section>
    );
}
