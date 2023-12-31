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
                />
            </div>
            <div>
                <p>
                    I learned how to program computers from smart, kind people.
                    I'm grateful they took the time to teach me their craft.
                </p>
                <p>
                    If you're just starting out,{' '}
                    <Link href="/about#contact">hit me up</Link>. I'm happy to
                    pass along what they taught.
                </p>
            </div>
        </div>
    );
}
