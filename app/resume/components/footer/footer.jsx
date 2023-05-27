import LinkCtr from '@/components/link-ctr';
import styles from './footer.module.scss';

export default function Footer({}) {
    return (
        <footer className={styles['footer']}>
            <nav>
                <ol>
                    <li>
                        <LinkCtr text="Download a copy" href="/resume.pdf" newTab />
                    </li>
                </ol>
            </nav>
        </footer>
    );
}
