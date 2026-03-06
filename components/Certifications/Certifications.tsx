import { Section } from '@/components/section';
import styles from './Certifications.module.scss';

export function Certifications() {
    return (
        <Section className={styles.certifications} heading="Certifications">
            <div className={styles.cert}>
                <div className={styles.name}>
                    Security+ <span>(expired)</span>
                </div>
                <div className={styles.date}>Apr 20 2024</div>
            </div>
            <div className={styles.cert}>
                <div className={styles.name}>
                    Apple Certified Support Professional <span>(10.11)</span>
                </div>
                <div className={styles.date}>Apr 29 2016</div>
            </div>
            <div className={styles.cert}>
                <div className={styles.name}>Administering SharePoint 2013 Server Farms</div>
                <div className={styles.date}>Aug 25 2015</div>
            </div>
        </Section>
    );
}
