import { Section } from '@/components/section';
import styles from './contact.module.scss';

export function Contact() {
    return (
        <Section className={styles.contact} heading="Contact">
            <div className={styles.line}>
                <a href="tel:9124922522" target="_blank" title="My phone number">
                    [<span>phone</span>]((912) 492-2522)
                </a>
            </div>
            <div className={styles.line}>
                <a href="mailto:stephen@matheis.email" target="_blank" title="My email address">
                    [<span>email</span>](stephen@matheis.email)
                </a>
            </div>
            <div className={styles.line}>
                <a href="https://github.com/stephenmatheis" target="_blank" title="My GitHub profile">
                    [<span>github</span>](github.com/stephenmatheis)
                </a>
            </div>
            <div className={styles.line}>
                <a href="https://codepen.com/stephenmatheis" target="_blank" title="My CodePen profile">
                    [<span>codepen</span>](codepen.com/stephenmatheis)
                </a>
            </div>
            <div className={styles.line}>
                <a href="https://stephenmatheis.com" target="_blank" title="My website">
                    [<span>site</span>](stephenmatheis.com)
                </a>
            </div>
        </Section>
    );
}
