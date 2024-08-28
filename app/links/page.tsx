/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image';
import Link from 'next/link';
import macbook from '@/public/images/macbook.webp';
import styles from './page.module.scss';

const groups = [
    {
        name: 'Uses',
        links: [
            {
                label: 'One',
                href: '/',
            },
            {
                label: 'Two',
                href: '/',
            },
            {
                label: ' Three',
                href: '/',
            },
        ],
    },
    {
        name: 'Tools',
        links: [
            {
                label: 'One',
                href: '/',
            },
            {
                label: 'Two',
                href: '/',
            },
            {
                label: ' Three',
                href: '/',
            },
        ],
    },
];

export default function LinksPage() {
    return (
        <div className={styles.links}>
            <Link href="/">
                <div className={styles.avatar}>
                    <Image
                        src={macbook}
                        alt="My memoji behind a MacBook"
                        priority
                    />
                </div>
            </Link>
            <div className={styles.text}>
                <span className={[styles.name, styles.part].join(' ')}>
                    Links
                </span>{' '}
                <span className={styles.title}>
                    <span>to stuff I</span>
                    <span className={styles.words}>
                        <span className={styles.word}>read</span>
                        <span className={styles.word}>like</span>
                        <span className={styles.word}>use</span>
                    </span>
                </span>
            </div>
            <nav>
                {groups.map(({ name, links }) => {
                    return (
                        <div key={name} className={styles.group}>
                            <h2>{name}</h2>
                            <ul key={name} className={styles.list}>
                                {links.map(({ label, href }) => {
                                    return (
                                        <li key={label}>
                                            <Link href={href}>One</Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    );
                })}
            </nav>
        </div>
    );
}
