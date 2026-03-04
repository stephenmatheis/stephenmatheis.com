import { Section } from '@/components/section';
import styles from './Certifications.module.scss';

export function Certifications() {
    return (
        <Section className={styles.certifications} heading="Certifications">
            <div className={styles.cert}>
                <div className={styles.name}>
                    Security+ <span>(expired)</span>
                </div>
                <div className={styles.date}>2018 - 2024</div>
            </div>
        </Section>
    );
}
