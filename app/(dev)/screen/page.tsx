import { Readout } from '@/components/readout';
import styles from './page.module.scss';

export default function ResumePage() {
    return (
        <div className={styles.screen}>
            <div className={styles.topright}>
                <Readout />
            </div>
            <div>Write</div>
            <div>Draw</div>
            <br />
            <div>Browse</div>
        </div>
    );
}
