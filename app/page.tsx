import { Stars } from '@/components/stars';
import { Planets } from '@/components/planets';
import styles from './page.module.scss';

export default function RootPage() {
    return (
        <div className={styles.home}>
            <div className={styles.background}>
                {/* <Stars count={100} load /> */}
                <Stars count={125} />
                <Stars count={75} color="gray" baseDelay={20} />
                <Stars count={50} color="dark" baseDelay={30} />
            </div>
            <Planets />
        </div>
    );
}
