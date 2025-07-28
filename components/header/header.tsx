import { TwoZeroThreeFive } from '@/components/two-zero-three-five';
import styles from './header.module.scss';

export function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <svg
                    className={styles.side}
                    width="57"
                    height="91"
                    viewBox="0 0 57 91"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M57 91H8V90H57V91ZM8 90H5V89H8V90ZM5 89H3V88H5V89ZM3 88H2V87H3V88ZM2 87H1V85H2V87ZM1 83H57V84H1V85H0V9H1V83ZM2 9H1V6H2V9ZM3 6H2V4H3V6ZM4 4H3V3H4V4ZM6 3H4V2H6V3ZM9 2H6V1H9V2ZM57 1H9V0H57V1Z"
                        fill="currentColor"
                    />
                </svg>
                <TwoZeroThreeFive />
                <svg
                    className={styles.side}
                    width="57"
                    height="91"
                    viewBox="0 0 57 91"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M49 91H0V90H49V91ZM52 90H49V89H52V90ZM54 89H52V88H54V89ZM55 88H54V87H55V88ZM56 87H55V85H56V87ZM57 85H56V84H0V83H56V9H57V85ZM56 9H55V6H56V9ZM55 6H54V4H55V6ZM54 4H53V3H54V4ZM53 3H51V2H53V3ZM51 2H48V1H51V2ZM48 1H0V0H48V1Z"
                        fill="currentColor"
                    />
                </svg>
            </div>
        </header>
    );
}
