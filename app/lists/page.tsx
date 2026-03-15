'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Time } from '@/components/Time';
import { useVimMotions } from '@/hooks/useVimMotions';
import styles from './page.module.scss';

const ascii = `██╗     ██╗███████╗████████╗███████╗
██║     ██║██╔════╝╚══██╔══╝██╔════╝
██║     ██║███████╗   ██║   ███████╗
██║     ██║╚════██║   ██║   ╚════██║
███████╗██║███████║   ██║   ███████║
╚══════╝╚═╝╚══════╝   ╚═╝   ╚══════╝`;

const options = [
    {
        icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" strokeLinejoin="round">
                <path
                    d="M14.5 6.5V13.5C14.5 14.8807 13.3807 16 12 16H4C2.61929 16 1.5 14.8807 1.5 13.5V1.5V0H3H8H9.08579C9.351 0 9.60536 0.105357 9.79289 0.292893L14.2071 4.70711C14.3946 4.89464 14.5 5.149 14.5 5.41421V6.5ZM13 6.5V13.5C13 14.0523 12.5523 14.5 12 14.5H4C3.44772 14.5 3 14.0523 3 13.5V1.5H8V5V6.5H9.5H13ZM9.5 2.12132V5H12.3787L9.5 2.12132Z"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    fill="currentColor"
                />
            </svg>
        ),
        label: 'New',
        href: '/lists/new',
        cmd: 'n',
    },
    {
        icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" strokeLinejoin="round">
                <path
                    d="M13.5 4.72094V13.5C13.5 14.0523 13.0523 14.5 12.5 14.5H11.5V11C11.5 10.4477 11.0523 10 10.5 10H5.5C4.94772 10 4.5 10.4477 4.5 11V14.5H3.5C2.94772 14.5 2.5 14.0523 2.5 13.5V1.5H5V3.25V4H6.5V3.25V1.5H9.47383L13.5 4.72094ZM6 14.5H10V11.5H6V14.5ZM4.5 16H3.5C2.11929 16 1 14.8807 1 13.5V1.5V0H2.5H9.64922C9.87629 0 10.0966 0.0772807 10.2739 0.219131L14.6247 3.69976C14.8619 3.88953 15 4.17684 15 4.48062V13.5C15 14.8807 13.8807 16 12.5 16H11.5H10H6H4.5Z"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    fill="currentColor"
                />
            </svg>
        ),
        label: 'Load',
        href: '/lists/load',
        cmd: 'l',
    },
    {
        icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" strokeLinejoin="round">
                <path
                    d="M8.75 4C8.75 2.61929 9.86929 1.5 11.25 1.5H12V0H11.25C9.04086 0 7.25 1.79086 7.25 4V6H4.75H4V7.5H4.75H7.25V12C7.25 13.3807 6.13071 14.5 4.75 14.5H4V16H4.75C6.95914 16 8.75 14.2091 8.75 12V7.5H11.25H12V6H11.25H8.75V4Z"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    fill="currentColor"
                />
            </svg>
        ),
        label: 'Settings',
        href: '/lists/settings',
        cmd: 's',
    },
];

export default function Page() {
    const router = useRouter();
    const [selected, setSelected] = useState<number>(0);
    const [horizontal, setHorizontal] = useState<number>(0);

    useVimMotions({
        maxHorizontal: 0,
        horizontal,
        setHorizontal,
        max: options.length - 1,
        selected,
        setSelected,
        onEnter() {
            router.push(options[selected].href);
        },
    });

    useEffect(() => {
        function handleKeydown(event: KeyboardEvent) {
            if (event.shiftKey || event.metaKey || event.ctrlKey || event.altKey) return;

            for (const option of options) {
                const { href, cmd } = option;

                if (event.key === cmd) {
                    router.push(href);
                }
            }
        }

        window.addEventListener('keydown', handleKeydown);

        return () => {
            window.removeEventListener('keydown', handleKeydown);
        };
    }, [options]);

    return (
        <div className={styles.page}>
            <div className={styles.splash}>
                <div className={styles.ascii}>{ascii}</div>
                <div className={styles.options}>
                    {options.map(({ icon, label, href, cmd }, index) => {
                        return (
                            <Link key={index} href={href} className={styles.option}>
                                <span className={styles.label}>
                                    {icon}
                                    <span>
                                        <span
                                            className={`${styles.highlight} ${index === selected ? styles.selected : styles.normal}`}
                                        >
                                            {label[0]}
                                        </span>
                                        {label.slice(1)}
                                    </span>
                                </span>
                                <span className={styles.cmd}>{cmd}</span>
                            </Link>
                        );
                    })}
                </div>
                <div className={styles.footer}>
                    <Time />
                </div>
            </div>
        </div>
    );
}
