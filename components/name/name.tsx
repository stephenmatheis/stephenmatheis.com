import { Section } from '@/components/section';
import styles from './name.module.scss';

export function Name() {
    return (
        <Section className={styles.name} heading="">
            <h1>
                Stephen Matheis | <span>Software Engineer</span>
            </h1>
            <div className={styles.muted}>Washington, D.C.</div>
            <div className={styles.muted}>TS/SCI</div>
        </Section>
    );
}
