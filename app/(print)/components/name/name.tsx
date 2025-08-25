import { Section } from '@/app/(print)/components/section';
import styles from './name.module.scss';

export function Name() {
    return (
        <Section className={styles.name}>
            <div className={styles.row}>
                <span className={styles.primary}>Stephen Matheis</span>
                <span className={styles.muted}>Software Engineer</span>
            </div>
        </Section>
    );
}
