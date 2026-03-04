import { Section } from '@/components/section';
import work from '@/data/work';
import styles from './work.module.scss';

export function Work() {
    return (
        <Section className={styles.work} heading="Projects">
            <div className={styles.list}>
                {work.map(({ name, href, description }) => (
                    <div key={name} className={styles.item}>
                        <div className={styles.heading}>
                            <a href={href} target="_blank">
                                [<span>{name}</span>]({href.replace('https://', '')})
                            </a>
                        </div>
                        <p className={styles.description}>{description}</p>
                    </div>
                ))}
            </div>
        </Section>
    );
}
