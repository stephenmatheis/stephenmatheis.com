import { Section } from '@/components/section';
import styles from './contact.module.scss';

export function Contact() {
    return (
        <Section className={styles.contact}>
            <a href="mailto:stephen@matheis.email" target="_blank" title="My email address">
                stephen@matheis.email
            </a>
            <a href="tel:9124922522" target="_blank" title="My phone number">
                (912) 492-2522
            </a>
            <a href="https://github.com/stephenmatheis" target="_blank" title="My GitHub profile">
                github.com/stephenmatheis
            </a>
            <a href="https://codepen.com/stephenmatheis" target="_blank" title="My CodePen profile">
                codepen.com/stephenmatheis
            </a>
            <a href="https://stephenmatheis.com" target="_blank" title="My website">
                stephenmatheis.com
            </a>
        </Section>
    );
}
