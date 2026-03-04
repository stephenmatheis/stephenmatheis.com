import { Section } from '@/components/section';
import styles from './name.module.scss';

export function Name() {
    return (
        <Section className={styles.name} heading="Name">
            <h1>
                Stephen Matheis <span>Software Engineer</span>
            </h1>
        </Section>
    );
}
