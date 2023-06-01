import LinkCtr from '@/components/link-ctr';
import styles from './footer.module.scss';

type Link = {
    label: string;
    path: string;
    external?: boolean;
};

type Props = {
    links?: Link[];
    text?: string;
};

export default function Footer({ links, text }: Props) {
    const copyright = `Copyright (C) ${new Date().getFullYear()} Stephen Matheis`;

    return (
        <footer className={styles.footer}>
            {links?.length && (
                <nav>
                    <ol>
                        {links.map(({ label, path, external }) => {
                            return (
                                <li key="label">
                                    <LinkCtr href={path} newTab={external}>
                                        {label}
                                    </LinkCtr>
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
