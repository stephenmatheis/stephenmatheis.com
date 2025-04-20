import { ToggleTheme } from '../toggle-theme';
import styles from './footer.module.scss';

export function Footer() {
    return (
        <div className={styles.footer}>
            <a href="/stephen-matheis-resume.pdf" target="_blank" title="Link to download my resume as a pdf.">
                Download Resume
            </a>
            <ToggleTheme />
        </div>
    );
}
