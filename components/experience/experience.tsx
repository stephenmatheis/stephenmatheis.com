import { Comment } from '@/components/comment';
import experience from '@/data/experience';
import styles from './experience.module.scss';

export function Experience() {
    return (
        <section className={styles.experience}>
            <Comment text="Experience" />
            <div className={styles.jobs}>
                {experience.map(({ company, roles, list }, index) => {
                    return (
                        <div key={index} className={styles.job}>
                            <div className={styles.roles}>
                                {roles.map(({ title, start, end }, index) => {
                                    return (
                                        <div key={index} className={styles.role}>
                                            <div className={styles.title}>
                                                <span>{title}</span>{' '}
                                                {index === 0 && <span className={styles.company}>@ {company}</span>}
                                            </div>
                                            <div className={styles.date}>
                                                {start}–{end}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <ul className={styles.list}>
                                {list?.map((item, index) => {
                                    return (
                                        <li key={index} className={styles.item}>
                                            <span className={styles.bullet}>*</span>
                                            <span
                                                dangerouslySetInnerHTML={{
                                                    __html: item,
                                                }}
                                            />
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
