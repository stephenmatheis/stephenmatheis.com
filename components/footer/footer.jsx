import LinkCtr from '@/components/link-ctr';
import styles from './footer.module.scss';

export default function Footer({ links }) {
    return (
        <footer className={styles['footer']}>
            <nav>
                <ol>
                    {links?.length &&
                        links.map(({ label, path, external }) => {
                            return (
                                <li key="label">
                                    <LinkCtr
                                        text={label}
                                        href={path}
                                        newTab={external}
                                    />
                                </li>
                            );
                        })}
                </ol>
            </nav>
        </footer>
    );
}
