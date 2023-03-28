import Link from 'next/link';
import Type from '@/components/type/type';
import styles from './link-ctr.module.scss';
import classNames from 'classnames';

export default function LinkCtr({ emoji, href, text, label, type, speed, showLinkBackground = true }) {
    return (
        <div key={text} className={classNames(
            styles['link-ctr'],
            { [styles['hide-background']]: !showLinkBackground }
        )}>
            <Link href={href} aria-label={label}>
                {emoji && <span className={styles['emoji']}>{emoji}</span>}
                {
                    type ?
                        <Type content={text} speed={speed * 2 / 3} className={styles['link-text']} /> :
                        <span className={styles['link-text']}>{text}</span>
                }
            </Link>
        </div>
    )
}
