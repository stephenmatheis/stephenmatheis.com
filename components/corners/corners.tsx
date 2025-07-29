import styles from './corners.module.scss';

export function Corners() {
    return (
        <>
            <svg
                className={styles.topleft}
                width="28"
                height="33"
                viewBox="0 0 28 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M2 0H28V1H2V0Z" fill="black" />
                <path d="M0 2H1V33H0V2Z" fill="black" />
            </svg>

            <svg
                className={styles.topright}
                width="28"
                height="33"
                viewBox="0 0 28 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M26 0H0V1H26V0Z" fill="black" />
                <path d="M28 2H27V33H28V2Z" fill="black" />
            </svg>

            <svg
                className={styles.bottomleft}
                width="28"
                height="33"
                viewBox="0 0 28 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M2 33H28V32H2V33Z" fill="black" />
                <path d="M0 31H1V0H0V31Z" fill="black" />
            </svg>

            <svg
                className={styles.bottomright}
                width="28"
                height="33"
                viewBox="0 0 28 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M26 33H0V32H26V33Z" fill="black" />
                <path d="M28 31H27V0H28V31Z" fill="black" />
            </svg>
        </>
    );
}
