import { Comment } from '@/components/comment';
import { Project } from '@/components/project';
import projects from '@/data/projects';
import styles from './projects.module.scss';

export function Projects() {
    return (
        <section className={styles.projects}>
            <Comment text="Projects" />
            <div className={styles.list}>
                {projects.map(({ name, link, description }) => (
                    <Project key={name} name={name} link={link} description={description} />
                ))}
            </div>
        </section>
    );
}
