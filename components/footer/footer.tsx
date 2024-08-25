import Link from 'next/link';
import styles from './footer.module.scss';

type Link = {
    label: string;
    path: string;
    newTab?: boolean;
};

type Props = {
    links?: Link[];
    text?: string;
};

export function Footer({ links = [], text }: Props) {
    return (
        <footer className={styles.footer}>
            {links?.length !== 0 && (
                <nav>
                    <ol>
                        {links?.map(({ label, path, newTab }) => {
                            return (
                                <li key={path}>
                                    <Link
                                        href={path}
                                        aria-label={label}
                                        {...(newTab
                                            ? { target: '_blank' }
                                            : {})}
                                    >
                                        {label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ol>
                </nav>
            )}
            {text && <div className={styles.text}>{text}</div>}
        </footer>
    );
}
