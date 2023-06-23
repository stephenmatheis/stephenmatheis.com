import { LinkCtr } from '@/components/link-ctr';
import { Comment } from '../comment';
import contact from '@/data/contact';
import styles from './contact.module.scss';

export function Contact({}) {
    return (
        <div className={styles['contact']}>
            <Comment text={'Contact'} />
            <div className={styles['info']}>
                {contact.map(({ emoji, href, text, label }) => {
                    return (
                        <LinkCtr
                            key={text}
                            emoji={emoji}
                            href={href}
                            label={label}
                        >
                            {text}
                        </LinkCtr>
                    );
                })}
            </div>
        </div>
    );
}
