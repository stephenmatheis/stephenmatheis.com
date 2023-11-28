import Link from 'next/link';
import styles from './project.module.scss';
import classNames from 'classnames';

export function Project({ name, link, description }) {
    return (
        <div
            key={name}
            className={classNames(styles['project-ctr'])}
            id="projects"
        >
            <Link href={link} target="_blank" aria-label={name}>
                {name}
            </Link>
            <div className={styles['description-ctr']}>
                <div className={styles.description}>{description}</div>
            </div>
        </div>
    );
}
