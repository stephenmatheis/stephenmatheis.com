import LinkCtr from '@/components/link-ctr';
import projects from '@/data/projects';
import Comment from '../comment';
import styles from './projects.module.scss';

export default function Projects({ type, speed }) {
    return (
        <div className={styles['projects']}>
            <Comment type={type} speed={speed} text={'Projects'} />
            {
                projects.map(({ name, link, description }, index) => {
                    return (
                        <div key={index} className={styles['project-ctr']}>
                            <LinkCtr text={name} href={link} />
                            <div className={styles['description']}>{description}</div>
                        </div>
                    )
                })
            }
        </div>
    );
}