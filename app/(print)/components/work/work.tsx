import Link from 'next/link';
import { Section } from '@/app/(print)/components/section';
import work from '@/data/work';
import styles from './work.module.scss';

export function Work() {
    return (
        <Section className={styles.work} heading="Work">
            <div className={styles.list}>
                {work.map(({ name, href, description }) => (
                    <div key={name} className={styles.item}>
                        <div className={styles.href}>
                            <Link href={href} target="_blank" aria-label={name}>
                                {name}
                            </Link>
                        </div>
                        <div className={styles.description}>{description}</div>
                    </div>
                ))}
            </div>
        </Section>
    );
}
