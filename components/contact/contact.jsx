import LinkCtr from '@/components/link-ctr';
import Type from '@/components/type';
import contact from '@/data/contact';
import styles from './contact.module.scss';

export default function Contact({ type, speed, fade }) {
    return (
        <div className={styles['contact']}>
            <div className={styles['comment']}>
                {type ? <Type content={'// Contact'} speed={speed / 2} /> : <span>{'// Contact'}</span>}
            </div>
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