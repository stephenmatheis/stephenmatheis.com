import { LinkCtr } from '@/components/link-ctr';
import styles from './project.module.scss';
import classNames from 'classnames';

export function Project({ name, link, description }) {
    return (
        <div key={name} className={classNames(styles['project-ctr'])}>
            <LinkCtr href={link} newTab>
                {name}
            </LinkCtr>
            <div className={styles['description-ctr']}>
                <div className={styles.description}>{description}</div>
            </div>
        </div>
    );
}
