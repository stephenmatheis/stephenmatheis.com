import LinkCtr from '@/components/link-ctr';
import contact from '@/data/contact';
import Comment from '../comment';
import styles from './contact.module.scss';

export default function Contact({ fade }) {
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
                            text={text}
                            label={label}
                            showLinkBackground={fade}
                        />
                    );
                })}
            </div>
        </div>
    );
}
