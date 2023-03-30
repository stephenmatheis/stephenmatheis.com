import LinkCtr from '@/components/link-ctr';
import styles from './footer.module.scss';

export default function Footer({ type, speed, loading, fade }) {
    return (
        <footer className={styles['footer']}>
            <nav>
                <ol>
                    <li>
                        <LinkCtr
                            text={'Resume'}
                            href={'/resume.pdf'}
                            newTab
                        />
                    </li>
                </ol>
            </nav>
        </footer>
    );
}