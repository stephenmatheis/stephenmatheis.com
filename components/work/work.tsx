import { Section } from '@/components/section';
import work from '@/data/work';
import styles from './work.module.scss';

export function Work() {
    return (
        <Section className={styles.work} heading="Work">
            <div className={styles.list}>
                {work.map(({ name, href, description }) => (
                    <div key={name} className={styles.item}>
                        <p>
                            <a href={href} target="_blank" aria-label={name}>
                                {name} <span>({href.replace('https://', '')})</span>
                            </a>
                            {'. '}
                            <span className={styles.description}>{description}</span>
                        </p>
                        {/* <p className={styles.description}>{description}</p> */}
                    </div>
                ))}
            </div>
        </Section>
    );
}
