import classNames from 'classnames';
import Link from 'next/link';
import styles from './link-ctr.module.scss';

type EmojiProps = {
    position: string;
    value: string;
};

type Props = {
    emoji?: EmojiProps | string;
    href: string;
    children: React.ReactNode;
    label?: string;
    newTab?: Boolean;
    className?: string;
};

export default function LinkCtr({
    emoji,
    href,
    children,
    label,
    newTab,
    className,
}: Props) {
    return (
        <span className={classNames(styles['link-ctr'], className)}>
            {newTab ? (
                <a
                    className={styles['link-text']}
                    href={href}
                    target="_blank"
                    aria-label={label}
                >
                    {children}
                </a>
            ) : (
                <Link href={href} aria-label={label}>
                    {(typeof emoji === 'string' ||
                        emoji?.position === 'left') && (
                        <span className={styles['emoji']}>
                            {typeof emoji === 'string' ? emoji : emoji.value}
                        </span>
                    )}
                    <span className={styles['link-text']}>{children}</span>
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
        </span>
    );
}
