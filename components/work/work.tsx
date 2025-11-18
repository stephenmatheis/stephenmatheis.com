import { Section } from '@/components/section';
import work from '@/data/work';
import styles from './work.module.scss';

export function Work() {
    return (
        <Section className={styles.work} heading="Work">
            <div className={styles.list}>
                {work.map(({ name, href, description }) => (
                    <div key={name} className={styles.item}>
                        <h3>{name}</h3>
                        <p>
                            <a href={href} target="_blank">
                                {href.replace('https://', '')}
                            </a>
                        </p>
                        {/* <p className={styles.description}>{description}</p> */}
                    </div>
                ))}
            </div>
        </Section>
    );
}
