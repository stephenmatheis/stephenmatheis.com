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
    text: string;
    label?: string;
    showLinkBackground?: Boolean;
    newTab?: Boolean;
};

export default function LinkCtr({
    emoji,
    href,
    text,
    label,
    showLinkBackground = true,
    newTab,
}: Props) {
    return (
        <div
            key={text}
            className={classNames(styles['link-ctr'], {
                [styles['hide-background']]: !showLinkBackground,
            })}
        >
            {newTab ? (
                <a
                    className={styles['link-text']}
                    href={href}
                    target="_blank"
                    aria-label={label}
                >
                    {text}
                </a>
            ) : (
                <Link href={href} aria-label={label}>
                    {(typeof emoji === 'string' ||
                        emoji?.position === 'left') && (
                        <span className={styles['emoji']}>
                            {typeof emoji === 'string' ? emoji : emoji.value}
                        </span>
                    )}
                    <span className={styles['link-text']}>{text}</span>
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
        </div>
    );
}
