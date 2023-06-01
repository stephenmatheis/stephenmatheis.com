import LinkCtr from '@/components/link-ctr';
import contact from '@/data/contact';
import Comment from '../comment';
import styles from './contact.module.scss';

export default function Contact({}) {
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
