import Type from '@/components/type';
import skills from '@/data/skills';
import Comment from '../comment';
import styles from './skills.module.scss';

export default function Skills({ type, speed }) {
    return (
        <div className={styles['skills']}>
            <Comment type={type} speed={speed} text={'Skills'} />
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