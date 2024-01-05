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
    footerClass?: string;
};

export function Footer({ links = [], text, footerClass }: Props) {
    const copyright = `Copyright (C) 2020–${new Date().getFullYear()} Stephen Matheis`;

    return (
        <footer
            className={[
                styles.footer,
                ...(footerClass ? [footerClass] : []),
            ].join(' ')}
        >
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
            <div className={styles.copyright}>{copyright}</div>
        </footer>
    );
}
