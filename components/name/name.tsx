import { Section } from '@/components/section';
import styles from './name.module.scss';

export function Name() {
    return (
        <div className={styles.name}>
            <h1>
                Stephen Matheis <span>|</span> <span>Software Engineer</span>
            </h1>
            <div className={styles.muted}>Washington, D.C.</div>
            <div className={styles.muted}>TS/SCI</div>
        </div>
    );
}
