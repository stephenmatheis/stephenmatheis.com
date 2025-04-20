import styles from './footer.module.scss';

type FooterProps = {};

export function Footer({}: FooterProps) {
    return (
        <div className={styles.footer}>
            <a href="/resume.pdf" target="_blank" title="Link to download my resume as a pdf.">
                Download Resume
            </a>
        </div>
    );
}
