import styles from './dots.module.scss';

export function Dots() {
    return (
        <div className={styles.dots}>
            {Array.from({ length: 15 }, (_, i) => (
                <div key={i} className={styles.dot}>
                    <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 33H13V32H20V33Z" fill="currentColor" />
                        <path d="M13 32H10V31H13V32Z" fill="currentColor" />
                        <path d="M23 32H20V31H23V32Z" fill="currentColor" />
                        <path d="M10 31H8V30H10V31Z" fill="currentColor" />
                        <path d="M25 31H23V30H25V31Z" fill="currentColor" />
                        <path d="M8 30H7V29H8V30Z" fill="currentColor" />
                        <path d="M26 30H25V29H26V30Z" fill="currentColor" />
                        <path d="M7 29H5V28H7V29Z" fill="currentColor" />
                        <path d="M28 29H26V28H28V29Z" fill="currentColor" />
                        <path d="M5 28H4V26H5V28Z" fill="currentColor" />
                        <path d="M29 28H28V26H29V28Z" fill="currentColor" />
                        <path d="M4 26H3V25H4V26Z" fill="currentColor" />
                        <path d="M30 26H29V25H30V26Z" fill="currentColor" />
                        <path d="M3 25H2V23H3V25Z" fill="currentColor" />
                        <path d="M31 25H30V23H31V25Z" fill="currentColor" />
                        <path d="M2 23H1V20H2V23Z" fill="currentColor" />
                        <path d="M32 23H31V20H32V23Z" fill="currentColor" />
                        <path d="M1 20H0V13H1V20Z" fill="currentColor" />
                        <path d="M33 20H32V13H33V20Z" fill="currentColor" />
                        <path d="M2 13H1V10H2V13Z" fill="currentColor" />
                        <path d="M32 13H31V10H32V13Z" fill="currentColor" />
                        <path d="M3 10H2V8H3V10Z" fill="currentColor" />
                        <path d="M31 10H30V8H31V10Z" fill="currentColor" />
                        <path d="M4 8H3V7H4V8Z" fill="currentColor" />
                        <path d="M30 8H29V7H30V8Z" fill="currentColor" />
                        <path d="M5 7H4V5H5V7Z" fill="currentColor" />
                        <path d="M29 7H28V5H29V7Z" fill="currentColor" />
                        <path d="M7 5H5V4H7V5Z" fill="currentColor" />
                        <path d="M28 5H26V4H28V5Z" fill="currentColor" />
                        <path d="M8 4H7V3H8V4Z" fill="currentColor" />
                        <path d="M26 4H25V3H26V4Z" fill="currentColor" />
                        <path d="M10 3H8V2H10V3Z" fill="currentColor" />
                        <path d="M25 3H23V2H25V3Z" fill="currentColor" />
                        <path d="M13 2H10V1H13V2Z" fill="currentColor" />
                        <path d="M23 2H20V1H23V2Z" fill="currentColor" />
                        <path d="M20 1H13V0H20V1Z" fill="currentColor" />
                    </svg>
                </div>
            ))}
        </div>
    );
}
