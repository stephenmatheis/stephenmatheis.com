import styles from './contact.module.scss';

export function Contact() {
    return (
        <div className={styles.contact}>
            <p>
                <a href="mailto:stephen@matheis.email" target="_blank" title="My email address">
                    stephen@matheis.email
                </a>
            </p>
            <p>
                <a href="https://github.com/stephenmatheis" target="_blank" title="My GitHub profile">
                    github.com/stephenmatheis
                </a>
            </p>
            <p>
                <a href="https://stephenmatheis.com" target="_blank" title="My website">
                    stephenmatheis.com
                </a>
            </p>
        </div>
    );
}
