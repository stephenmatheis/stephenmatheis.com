import Type from '@/components/type';
import skills from '@/data/skills';
import styles from './skills.module.scss';

export default function Skills({ type, speed }) {
    return (
        <div className={styles['skills']}>
            <div className={styles['comment']}>
                {type ? <Type content={'// Skills'} speed={speed / 2} /> : <span>{'// Skills'}</span>}
            </div>
            <div className={styles['groups-ctr']}>
                {
                    skills.map(({ group, items }, index) => {
                        return (
                            <div key={index} className={styles['group']}>
                                <div className={styles['name']}>
                                    {type ? <Type content={group} speed={speed} /> : group}
                                </div>
                                <span className={styles['items-ctr']}>
                                    {
                                        items.map((item, index) => {
                                            return (
                                                <span key={item} className={styles['item']}>
                                                    {type ? <Type content={item} speed={speed} /> : item}
                                                    {index !== items.length - 1 ? ',' : ''}
                                                </span>
                                            )
                                        })
                                    }
                                </span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}