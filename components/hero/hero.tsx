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
        </div>
    );
}
