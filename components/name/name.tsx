import { Section } from '@/components/section';
import styles from './name.module.scss';

export function Name() {
    return (
        <Section className={styles.name}>
            <br />
            <br />
            <div className={styles.primary}>Stephen Matheis</div>
            <div className={styles.muted}>Software Engineer</div>
            <div className={styles.light}>38° N, 77° W</div>
        </Section>
    );
}
