import styles from './ControlsGuide.module.scss';

export function ControlsGuide() {
    return (
        <div className={styles.guide}>
            <div className={styles.group}>
                <div className={styles.cmd}>h</div>
                <div className={styles.label}>
                    <svg width="16" height="16" viewBox="0 0 16 16" strokeLinejoin="round">
                        <path
                            d="M6.46966 13.7803L6.99999 14.3107L8.06065 13.25L7.53032 12.7197L3.56065 8.75001H14.25H15V7.25001H14.25H3.56065L7.53032 3.28034L8.06065 2.75001L6.99999 1.68935L6.46966 2.21968L1.39644 7.2929C1.00592 7.68342 1.00592 8.31659 1.39644 8.70711L6.46966 13.7803Z"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            fill="currentColor"
                        />
                    </svg>
                </div>
            </div>
            <div className={styles.group}>
                <div className={styles.cmd}>j</div>
                <div className={styles.label}>
                    <svg width="16" height="16" viewBox="0 0 16 16" strokeLinejoin="round">
                        <path
                            d="M8.74999 1.75V1H7.24999V1.75V12.4393L3.28032 8.46967L2.74999 7.93934L1.68933 9L2.21966 9.53033L7.29288 14.6036C7.68341 14.9941 8.31657 14.9941 8.7071 14.6036L13.7803 9.53033L14.3107 9L13.25 7.93934L12.7197 8.46967L8.74999 12.4393V1.75Z"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            fill="currentColor"
                        />
                    </svg>
                </div>
            </div>
            <div className={styles.group}>
                <div className={styles.cmd}>k</div>
                <div className={styles.label}>
                    <svg width="16" height="16" viewBox="0 0 16 16" strokeLinejoin="round">
                        <path
                            d="M8.70711 1.39644C8.31659 1.00592 7.68342 1.00592 7.2929 1.39644L2.21968 6.46966L1.68935 6.99999L2.75001 8.06065L3.28034 7.53032L7.25001 3.56065V14.25V15H8.75001V14.25V3.56065L12.7197 7.53032L13.25 8.06065L14.3107 6.99999L13.7803 6.46966L8.70711 1.39644Z"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            fill="currentColor"
                        />
                    </svg>
                </div>
            </div>
            <div className={styles.group}>
                <div className={styles.cmd}>l</div>
                <div className={styles.label}>
                    <svg width="16" height="16" viewBox="0 0 16 16" strokeLinejoin="round">
                        <path
                            d="M9.53033 2.21968L9 1.68935L7.93934 2.75001L8.46967 3.28034L12.4393 7.25001H1.75H1V8.75001H1.75H12.4393L8.46967 12.7197L7.93934 13.25L9 14.3107L9.53033 13.7803L14.6036 8.70711C14.9941 8.31659 14.9941 7.68342 14.6036 7.2929L9.53033 2.21968Z"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            fill="currentColor"
                        />
                    </svg>
                </div>
            </div>
            <div className={styles.group}>
                <div className={styles.cmd}>i</div>
                <div className={styles.label}>insert</div>
            </div>
            <div className={styles.group}>
                <div className={styles.cmd}>esc</div>
                <div className={styles.label}>normal</div>
            </div>
            <div className={styles.group}>
                <div className={styles.cmd}>return</div>
                <div className={styles.label}>select</div>
            </div>
            <div className={styles.group}>
                <div className={styles.cmd}>q</div>
                <div className={styles.label}>back</div>
            </div>
            <div className={styles.group}>
                <div className={styles.cmd}>z</div>
                <div className={styles.label}>hide</div>
            </div>
        </div>
    );
}
