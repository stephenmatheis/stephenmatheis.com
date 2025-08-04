import { Section } from '@/components/section';
import styles from './name.module.scss';

export function Name() {
    return (
        <Section className={styles.name} heading="Name">
            <div className={styles.text}>
                <div>
                    <span className={styles.primary}>Stephen Matheis</span>{' '}
                    <span className={styles.color}>Software Engineer</span>
                </div>
                <div className={styles.light}>38° N, 77° W</div>
            </div>
        </Section>
    );
}
