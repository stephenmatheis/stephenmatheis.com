import { Time } from '@/components/Time';
import styles from './Statusbar.module.scss';

export function Statusbar() {
    return (
        <div className={styles.statusbar}>
            <div className={styles.left}>
                <div className={`${styles.mode} ${styles.normal}`}>
                    <span>NORMAL</span>
                </div>
                <div className={styles.file}>
                    <span>resume</span>
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.plugins}>
                    <svg width="16" height="16" viewBox="0 0 16 16" strokeLinejoin="round">
                        <path
                            d="M8 0.154663L8.34601 0.334591L14.596 3.58459L15 3.79466V4.25V11.75V12.2053L14.596 12.4154L8.34601 15.6654L8 15.8453L7.65399 15.6654L1.40399 12.4154L1 12.2053V11.75V4.25V3.79466L1.40399 3.58459L7.65399 0.334591L8 0.154663ZM2.5 11.2947V5.44058L7.25 7.81559V13.7647L2.5 11.2947ZM8.75 13.7647L13.5 11.2947V5.44056L8.75 7.81556V13.7647ZM8 1.84534L12.5766 4.22519L7.99998 6.51352L3.42335 4.2252L8 1.84534Z"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            fill="currentColor"
                        />
                    </svg>
                    <span>2</span>
                </div>
                <div className={styles.outerbar}>
                    <div className={styles.position}>Top</div>
                    <div className={styles.line}>1:1</div>
                    <div className={styles.innerbar}>
                        <Time />
                    </div>
                </div>
            </div>
        </div>
    );
}

/* 

<svg width="16" height="16" viewBox="0 0 16 16" strokeLinejoin="round">
    <path
        d="M1.75 2H1V3.5H1.75H14.25H15V2H14.25H1.75ZM1 7H1.75H9.25H10V8.5H9.25H1.75H1V7ZM1 12H1.75H11.25H12V13.5H11.25H1.75H1V12Z"
        fillRule="evenodd"
        clipRule="evenodd"
        fill="currentColor"
    />
</svg> 

*/
