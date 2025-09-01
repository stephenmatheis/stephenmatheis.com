import { Heading } from '@/components/heading';
import skills from '@/data/skills';
import styles from './skills.module.scss';

export function Skills() {
    return (
        <div className={styles.skills}>
            <Heading>Skills</Heading>
            <div className={styles.groups}>
                {skills.map(({ items }, index) => {
                    return (
                        <div key={index} className={styles.group}>
                            <div className={styles.items}>
                                {items.map((item) => {
                                    return (
                                        <div key={item} className={styles.item}>
                                            {item}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
