import { Time } from '@/components/Time';
import styles from './Statusbar.module.scss';

export function Statusbar() {
    return (
        <div className={styles.statusbar}>
            <div className={styles.left}>
                <div className={`${styles.mode} ${styles.normal}`}>
                    <span>VERSION</span>
                </div>
                <div className={styles.file}>
                    <span>2.0.35</span>
                </div>
            </div>
            <div className={styles.center}></div>
            <div className={styles.right}>
                <div className={styles.outerbar}>
                    <a className={styles.download} href="/stephen-matheis-resume.pdf" target="_blank">
                        <svg width="12" height="12" viewBox="0 0 16 16" strokeLinejoin="round">
                            <path
                                d="M14.5 13.5V6.5V5.41421C14.5 5.149 14.3946 4.89464 14.2071 4.70711L9.79289 0.292893C9.60536 0.105357 9.351 0 9.08579 0H8H3H1.5V1.5V13.5C1.5 14.8807 2.61929 16 4 16H12C13.3807 16 14.5 14.8807 14.5 13.5ZM13 13.5V6.5H9.5H8V5V1.5H3V13.5C3 14.0523 3.44772 14.5 4 14.5H12C12.5523 14.5 13 14.0523 13 13.5ZM9.5 5V2.12132L12.3787 5H9.5ZM5.13 5.00062H4.505V6.25062H5.13H6H6.625V5.00062H6H5.13ZM4.505 8H5.13H11H11.625V9.25H11H5.13H4.505V8ZM5.13 11H4.505V12.25H5.13H11H11.625V11H11H5.13Z"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                fill="currentColor"
                            />
                        </svg>
                        <span>Download</span>
                    </a>
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

/* 
    <div className={styles.statusbar}>
    <div className={styles.left}>
        <div className={`${styles.mode} ${styles.normal}`}>
            <span>VERSION</span>
        </div>
        <div className={styles.file}>
            <span>2.0.35</span>
        </div>
        <div className={styles.file}>
            <span>resume</span>
        </div>
        <div className={styles.stats}>
            <span className={styles.stat}>bg: #282828</span> <span className={styles.stat}>fg: #ebdbb2</span>{' '}
            <span className={styles.stat}>font: hack</span> <span className={styles.stat}>size: 12px</span>{' '}
            <span className={styles.stat}>height: 18px</span>
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
            <div className={styles.position}>hjkl</div>
            <div className={styles.line}>42:42</div>
            <div className={styles.innerbar}>
                <Time />
            </div>
        </div>
    </div>
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

*/
