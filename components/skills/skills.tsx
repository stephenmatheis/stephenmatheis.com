import { Indicator } from '@/components/indicator';
import { Comment } from '@/components/comment';
import skills from '@/data/skills';
import styles from './skills.module.scss';

export function Skills() {
    return (
        <div className={styles['skills']}>
            <Indicator label={'Skills'} />
            <Comment text={'Skills'} />
            <div className={styles['groups-ctr']}>
                {skills.map(({ group, items }, index) => {
                    return (
                        <div key={index} className={styles['group']}>
                            <div className={styles['name']}>{group}</div>
                            <span className={styles['items-ctr']}>
                                {items.map((item, index) => {
                                    return (
                                        <span
                                            key={item}
                                            className={styles['item']}
                                        >
                                            {item}
                                            {index !== items.length - 1
                                                ? ','
                                                : ''}
                                        </span>
                                    );
                                })}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
