import Link from 'next/link';
import styles from './name.module.scss';

export function Name() {
    return (
        <div className={styles.name}>
            <h1>
                <Link href="/">
                    Stephen Matheis <span>Software Engineer</span>
                </Link>
            </h1>
        </div>
    );
}
