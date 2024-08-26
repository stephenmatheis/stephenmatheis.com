import Link from 'next/link';
import { Comment } from '@/components/comment';
import contact from '@/data/contact';
import styles from './contact.module.scss';

export function Contact() {
    return (
        <section className={styles.contact}>
            <Comment text="Contact" />
            <div className={styles.info}>
                {contact
                    .filter(({ header }) => !header)
                    .map(({ text, href, label, newTab }) => {
                        return (
                            <div key={text}>
                                <Link
                                    href={href}
                                    aria-label={label}
                                    {...(newTab ? { target: '_blank' } : {})}
                                >
                                    {text}
                                </Link>
                            </div>
                        );
                    })}
            </div>
        </section>
    );
}
