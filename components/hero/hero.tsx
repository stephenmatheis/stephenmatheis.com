/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import Image from 'next/image';
import me from 'public/me.png';
import styles from './hero.module.scss';

export function Hero() {
    return (
        <div className={styles.hero}>
            <div className={styles['img-ctr']}>
                <Image
                    src={me}
                    alt="Me"
                    width={210}
                    style={{ borderRadius: '50%' }}
                    priority
                />
            </div>
            <div>
                <p>
                    I learned how to program computers from kind, smart people.
                    I'm grateful they took the time to teach me their craft.
                </p>
                <p>
                    <Link href="/about#contact">Hit me up</Link> if you want to talk shop. I'm happy to
                    return the favor.
                </p>
            </div>
        </div>
    );
}
