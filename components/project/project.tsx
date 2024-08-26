import Link from 'next/link';
import styles from './project.module.scss';

export function Project({ name, link, description }) {
    return (
        <div key={name} className={styles.project}>
            <Link href={link} target="_blank" aria-label={name}>
                {name}
            </Link>
            <div className={styles.description}>{description}</div>
        </div>
    );
}
