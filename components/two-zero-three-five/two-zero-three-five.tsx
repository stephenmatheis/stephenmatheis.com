import styles from './two-zero-three-five.module.scss';

type TwoZeroThreeFiveProps = {};

export function TwoZeroThreeFive({}: TwoZeroThreeFiveProps) {
    return (
        <div className={styles['two-zero-three-five']}>
            {/* 2 */}
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M44 44H0V16H32V12H0V0H44V28H12V32H44V44Z" fill="currentColor" />
            </svg>

            {/* 0 */}
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M44 44H0V0H44V44ZM12 12V32H32V12H12Z"
                    fill="currentColor"
                />
            </svg>

            {/* 3 */}
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M44 44H0V32H32V28H12V16H32V12H0V0H44V44Z" fill="currentColor" />
            </svg>

            {/* 5 */}
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M44 44H0V32H32V28H0V0H44V12H12V16H44V44Z" fill="currentColor" />
            </svg>
        </div>
    );
}
