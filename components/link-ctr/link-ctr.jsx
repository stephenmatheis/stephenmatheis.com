import Link from 'next/link';
import Type from '@/components/type/type';
import styles from './link-ctr.module.scss';
import classNames from 'classnames';

export default function LinkCtr({ emoji, href, text, label, showLinkBackground = true, newTab }) {
    return (
        <div key={text} className={classNames(
            styles['link-ctr'],
            { [styles['hide-background']]: !showLinkBackground }
        )}>
            {
                newTab ?
                    <a
                        className={styles['link-text']}
                        href={href}
                        target="_blank"
                        aria-label={label}
                    >
                        {text}
                    </a>
                    :
                    <Link href={href} aria-label={label}>
                        {emoji && <span className={styles['emoji']}>{emoji}</span>}
                        <span className={styles['link-text']}>{text}</span>
                    </Link>
            }
        </div>
    )
}
