import LinkCtr from '@/components/link-ctr';
import styles from './footer.module.scss';

export default function Footer({ loading, fade }) {
    return (
        <footer className={styles['footer']}>
            <nav>
                <ol>
                    <li>
                        <LinkCtr text={'Placeholder'} href="#" newTab />
                        {/* Placeholder */}
                    </li>
                </ol>
            </nav>
        </footer>
    );
}
