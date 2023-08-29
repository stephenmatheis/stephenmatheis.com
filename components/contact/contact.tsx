import { Comment } from '@/components/comment';
import { LinkCtr } from '@/components/link-ctr';
import contact from '@/data/contact';
import styles from './contact.module.scss';

export function Contact() {
    return (
        <div className={styles['contact']}>
            <Comment text={'Contact'} />
            <div className={styles['info']}>
                {contact.map(({ text, href, label }) => {
                    return (
                        <div key={text}>
                            <LinkCtr href={href} label={label}>
                                {text}
                            </LinkCtr>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
