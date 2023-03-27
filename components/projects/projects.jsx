import LinkCtr from '@/components/link-ctr';
import Type from '@/components/type';
import projects from '@/data/projects';
import styles from './projects.module.scss';

export default function Projects({ type, speed }) {
    return (
        <div className={styles['projects']}>
            <div className={styles['comment']}>
                {type ? <Type content={'// Projects'} speed={speed / 2} /> : <span>{'// Projects'}</span>}
            </div>
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