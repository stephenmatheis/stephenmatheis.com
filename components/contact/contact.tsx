import { LinkCtr } from '@/components/link-ctr';
import { Comment } from '@/components/comment';
import { Indicator } from '@/components/indicator';
import contact from '@/data/contact';
import styles from './contact.module.scss';

export function Contact() {
    return (
        <div className={styles['contact']}>
            <Indicator label={'Contact'} />
            <Comment text={'Contact'} />
            <div className={styles['info']}>
                {contact.map(({ href, text, label }) => {
                    return (
                        <LinkCtr key={text} href={href} label={label}>
                            {text}
                        </LinkCtr>
                    );
                })}
            </div>
        </div>
    );
}
