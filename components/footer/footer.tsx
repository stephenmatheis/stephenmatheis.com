import styles from './footer.module.scss';

type FooterProps = {};

export function Footer({}: FooterProps) {
    return (
        <div className={styles.footer}>
            {/* <div>─────────────────────────────────────────────────────────</div> */}
            <div className={styles.barcode}>
                <div className={styles.code}>
                    <svg width="187" height="11" viewBox="0 0 187 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M164.267 0H166.467V11H164.267V0Z" fill="currentColor" />
                        <path d="M167.2 0H169.4V11H167.2V0Z" fill="currentColor" />
                        <rect x="170.133" width="0.733333" height="11" fill="currentColor" />
                        <rect x="171.6" width="0.733333" height="11" fill="currentColor" />
                        <rect x="174.533" width="0.733333" height="11" fill="currentColor" />
                        <path d="M152.533 0H154.733V11H152.533V0Z" fill="currentColor" />
                        <path d="M155.467 0H157.667V11H155.467V0Z" fill="currentColor" />
                        <rect x="158.4" width="0.733333" height="11" fill="currentColor" />
                        <rect x="162.8" width="0.733333" height="11" fill="currentColor" />
                        <rect x="161.333" width="0.733333" height="11" fill="currentColor" />
                        <path d="M140.8 0H143V11H140.8V0Z" fill="currentColor" />
                        <path d="M143.733 0H145.933V11H143.733V0Z" fill="currentColor" />
                        <rect x="146.667" width="0.733333" height="11" fill="currentColor" />
                        <rect x="151.067" width="0.733333" height="11" fill="currentColor" />
                        <rect x="149.6" width="0.733333" height="11" fill="currentColor" />
                        <rect x="134.933" width="0.733333" height="11" fill="currentColor" />
                        <rect x="136.4" width="2.2" height="11" fill="currentColor" />
                        <rect x="133.467" width="0.733333" height="11" fill="currentColor" />
                        <rect x="139.333" width="0.733333" height="11" fill="currentColor" />
                        <rect x="129.067" width="2.2" height="11" fill="currentColor" />
                        <rect x="123.2" width="0.733333" height="11" fill="currentColor" />
                        <rect x="124.667" width="0.733333" height="11" fill="currentColor" />
                        <rect x="117.333" width="0.733333" height="11" fill="currentColor" />
                        <path d="M120.267 0H122.467V11H120.267V0Z" fill="currentColor" />
                        <path d="M126.133 0H128.333V11H126.133V0Z" fill="currentColor" />
                        <rect x="112.933" width="0.733333" height="11" fill="currentColor" />
                        <rect x="112.933" width="0.733333" height="11" fill="currentColor" />
                        <rect x="112.933" width="0.733333" height="11" fill="currentColor" />
                        <rect x="115.867" width="0.733333" height="11" fill="currentColor" />
                        <rect x="108.533" width="0.733333" height="11" fill="currentColor" />
                        <path d="M105.6 0H107.8V11H105.6V0Z" fill="currentColor" />
                        <path d="M110 0H112.2V11H110V0Z" fill="currentColor" />
                        <path d="M99.7334 0H101.933V11H99.7334V0Z" fill="currentColor" />
                        <path d="M102.667 0H104.867V11H102.667V0Z" fill="currentColor" />
                        <rect x="93.8667" width="0.733333" height="11" fill="currentColor" />
                        <rect x="95.3335" width="0.733333" height="11" fill="currentColor" />
                        <rect x="96.7998" width="0.733333" height="11" fill="currentColor" />
                        <rect x="92.3999" width="0.733333" height="11" fill="currentColor" />
                        <rect x="83.6001" width="0.733333" height="11" fill="currentColor" />
                        <rect x="82.1333" width="0.733333" height="11" fill="currentColor" />
                        <path d="M85.0669 0H87.2669V11H85.0669V0Z" fill="currentColor" />
                        <path d="M88 0H90.2V11H88V0Z" fill="currentColor" />
                        <rect x="77.7334" width="0.733333" height="11" fill="currentColor" />
                        <rect x="77.7334" width="0.733333" height="11" fill="currentColor" />
                        <rect x="77.7334" width="0.733333" height="11" fill="currentColor" />
                        <rect x="80.6665" width="0.733333" height="11" fill="currentColor" />
                        <rect x="73.3335" width="0.733333" height="11" fill="currentColor" />
                        <path d="M70.3999 0H72.5999V11H70.3999V0Z" fill="currentColor" />
                        <path d="M74.7998 0H76.9998V11H74.7998V0Z" fill="currentColor" />
                        <rect x="58.6665" width="0.733333" height="11" fill="currentColor" />
                        <rect x="60.1333" width="0.733333" height="11" fill="currentColor" />
                        <path d="M61.6001 0H63.8001V11H61.6001V0Z" fill="currentColor" />
                        <path d="M67.4668 0H69.6668V11H67.4668V0Z" fill="currentColor" />
                        <rect x="66" width="0.733333" height="11" fill="currentColor" />
                        <rect x="57.2002" width="0.733333" height="11" fill="currentColor" />
                        <rect x="48.3999" width="0.733333" height="11" fill="currentColor" />
                        <rect x="46.9331" width="0.733333" height="11" fill="currentColor" />
                        <path d="M49.8667 0H52.0667V11H49.8667V0Z" fill="currentColor" />
                        <path d="M52.7998 0H54.9998V11H52.7998V0Z" fill="currentColor" />
                        <path d="M39.6001 0H41.8001V11H39.6001V0Z" fill="currentColor" />
                        <path d="M44 0H46.2V11H44V0Z" fill="currentColor" />
                        <rect x="38.1333" width="0.733333" height="11" fill="currentColor" />
                        <rect x="35.2002" width="0.733333" height="11" fill="currentColor" />
                        <rect x="42.5332" width="0.733333" height="11" fill="currentColor" />
                        <path d="M23.4668 0H25.6668V11H23.4668V0Z" fill="currentColor" />
                        <rect x="26.3999" width="0.733333" height="11" fill="currentColor" />
                        <path d="M27.8667 0H30.0667V11H27.8667V0Z" fill="currentColor" />
                        <rect x="33.7334" width="0.733333" height="11" fill="currentColor" />
                        <rect x="32.2666" width="0.733333" height="11" fill="currentColor" />
                        <path d="M14.6665 0H16.8665V11H14.6665V0Z" fill="currentColor" />
                        <path d="M20.5332 0H22.7332V11H20.5332V0Z" fill="currentColor" />
                        <rect x="13.2002" width="0.733333" height="11" fill="currentColor" />
                        <rect x="17.6001" width="0.733333" height="11" fill="currentColor" />
                        <rect x="11.7334" width="0.733333" height="11" fill="currentColor" />
                        <rect x="176" width="0.733333" height="11" fill="currentColor" />
                        <rect x="178.933" width="0.733333" height="11" fill="currentColor" />
                        <rect x="186.267" width="0.733333" height="11" fill="currentColor" />
                        <path d="M180.4 0H182.6V11H180.4V0Z" fill="currentColor" />
                        <path d="M183.333 0H185.533V11H183.333V0Z" fill="currentColor" />
                        <rect width="0.733333" height="11" fill="currentColor" />
                        <rect x="2.93311" width="0.733333" height="11" fill="currentColor" />
                        <rect x="10.2666" width="0.733333" height="11" fill="currentColor" />
                        <path d="M4.3999 0H6.5999V11H4.3999V0Z" fill="currentColor" />
                        <path d="M7.3335 0H9.5335V11H7.3335V0Z" fill="currentColor" />
                    </svg>
                </div>
                <div className={styles.text}>*nextdotgov.com*</div>
            </div>
        </div>
    );
}
