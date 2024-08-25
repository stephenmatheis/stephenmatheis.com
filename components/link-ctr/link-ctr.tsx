import type { ComponentPropsWithoutRef } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import styles from './link-ctr.module.scss';

type EmojiProps = {
    position: string;
    value: string;
};

interface Props extends ComponentPropsWithoutRef<'a'> {
    emoji?: EmojiProps | string;
    href: string;
    children: React.ReactNode;
    label?: string;
    newTab?: Boolean;
    className?: string;
}

export function LinkCtr({
    emoji,
    href,
    children,
    label,
    newTab,
    className,
    ...props
}: Props) {
    return (
        <>
            {newTab ? (
                <a
                    className={classNames(styles['link'], className)}
                    href={href}
                    target="_blank"
                    aria-label={label}
                    {...props}
                >
                    <span className={styles['text']}>
                        {children}
                    </span>
                </a>
            ) : (
                <Link
                    href={href}
                    aria-label={label}
                    className={classNames(styles['link'], className)}
                    {...props}
                >
                    {(typeof emoji === 'string' ||
                        emoji?.position === 'left') && (
                        <span className={styles['emoji']}>
                            {typeof emoji === 'string' ? emoji : emoji.value}
                        </span>
                    )}
                    <span className={styles['text']}>
                        {children}
                    </span>
                    {typeof emoji === 'object' &&
                        emoji.position === 'right' && (
                            <span
                                className={classNames(
                                    styles['emoji'],
                                    styles['left']
                                )}
                            >
                                {typeof emoji === 'string'
                                    ? emoji
                                    : emoji.value}
                            </span>
                        )}
                </Link>
            )}
        </>
    );
}
