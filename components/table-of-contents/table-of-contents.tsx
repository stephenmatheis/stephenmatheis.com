import { Section } from '@/components/section';
import styles from './table-of-contents.module.scss';

export function TableOfContents() {
    return (
        <Section className={styles.toc}>
            <div className={styles.title}>Contents</div>
            <div className={styles.chapters}>
                {[
                    { name: 'Prologue', pg: '3' },
                    { name: 'Chapter 1: Awakening', pg: '5' },
                    { name: 'Chapter 2: Walking', pg: '30' },
                    { name: 'Chapter 3: Hiding', pg: '40' },
                    { name: 'Chapter 3: Running', pg: '50' },
                    { name: 'Chapter 3: A Town', pg: '60' },
                ].map(({ name, pg }) => {
                    return (
                        <div key={name} className={styles.chapter}>
                            <span className={styles.name}>{name}</span>
                            <span className={styles.dots}>
                                {Array.from({ length: 70 - name.length - pg.length - 2 }).map((_, i) => (
                                    <span key={i} className={styles.dot}>
                                        .
                                    </span>
                                ))}
                            </span>
                            <span className={styles.page}>{pg}</span>
                        </div>
                    );
                })}
            </div>
        </Section>
    );
}
