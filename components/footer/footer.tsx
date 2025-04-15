import Link from 'next/link';
import styles from './footer.module.scss';

type FooterProps = {};

export function Footer({}: FooterProps) {
    return (
        <div className={styles.footer}>
            <Link href="/resume.pdf" title="Link to download my resume as a pdf.">
                Download Resume
            </Link>
        </div>
    );
}
