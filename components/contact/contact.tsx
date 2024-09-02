import Link from 'next/link';
import { Comment } from '@/components/comment';
import contact from '@/data/contact';
import styles from './contact.module.scss';

export function Contact() {
    return (
        <section className={styles.contact}>
            <Comment text="Contact" />
            <div className={styles.list}>
                {contact.map((item, index) => {
                    return (
                        <div key={index} className={styles.item}>
                            <div className={styles.name}>{item.name}</div>
                            <div className={styles.text}>
                                <Link href={item.href}>
                                    {item.user || item.text}
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
