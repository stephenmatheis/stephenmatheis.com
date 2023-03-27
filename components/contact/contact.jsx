import LinkCtr from '@/components/link-ctr';
import contact from '@/data/contact';
import Comment from '../comment';
import styles from './contact.module.scss';

export default function Contact({ type, speed, fade }) {
    return (
        <div className={styles['contact']}>
            <Comment type={type} speed={speed} text={'Contact'} />
            <div className={styles['info']}>
                {
                    contact.map(({ emoji, href, text, label }) => {
                        return (
                            <LinkCtr
                                key={text}
                                emoji={emoji}
                                href={href}
                                text={text}
                                label={label}
                                type={type}
                                speed={speed}
                                showLinkBackground={fade}
                            />
                        )
                    })
                }
            </div>
        </div>
    );
}