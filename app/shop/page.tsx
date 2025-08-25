import styles from './page.module.scss';

export default function BlogPage() {
    return (
        <div className={styles.shop}>
            <h1>Shop</h1>
            <div className={styles.categories}>
                <div className={styles.category}>
                    <div className={styles.name}>Code</div>
                    <div className={styles.items}>
                        {[{ name: 'one' }].map(({ name }) => {
                            return (
                                <div key={name} className={styles.item}>
                                    <svg
                                        width={56 * 4}
                                        height={77 * 4}
                                        viewBox="0 0 56 77"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g clipPath="url(#clip0_277_879)">
                                            <rect x="6" y="18" width="44" height="53" fill="#F0F0FF" />
                                            <path
                                                d="M51 1H53V2H54V3H55V5H56V72H55V74H54V75H53V76H51V77H5V76H3V75H2V74H1V72H0V5H1V3H2V2H3V1H5V0H51V1ZM7 4H5V5H4V7H3V70H4V72H5V73H7V74H49V73H51V72H52V70H53V7H52V5H51V4H49V3H7V4Z"
                                                fill="#E2E2FF"
                                            />
                                            <path
                                                d="M46 7H48V8H49V10H50V15H18V17H17V18H16V19H14V20H10V19H8V18H7V17H6V9H7V8H8V7H10V6H46V7Z"
                                                fill="#B6B6FF"
                                            />
                                            <path
                                                d="M49 4H51V5H52V7H53V70H52V72H51V73H49V74H7V73H5V72H4V70H3V7H4V5H5V4H7V3H49V4ZM19 19H18V20H17V21H16V22H14V23H10V22H8V21H7V20H6V67H7V69H8V70H10V71H46V70H48V69H49V67H50V50H49V48H48V47H46V46H45V30H46V29H48V28H49V26H50V22H49V20H48V19H46V18H19V19ZM10 7H8V8H7V10H6V17H7V18H8V19H10V20H14V19H16V18H17V17H18V15H50V10H49V8H48V7H46V6H10V7Z"
                                                fill="#8C8CFE"
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_277_879">
                                                <rect width="56" height="77" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <div className={styles.text}>
                                        <div className={styles.name}>{name}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className={styles.category}>
                    <div className={styles.name}>Graphics</div>
                    <div className={styles.items}>
                        {[{ name: 'one' }].map(({ name }) => {
                            return (
                                <div key={name} className={styles.item}>
                                    {/* <svg width="154" height="168">
                                        <use href="#cartridge" />
                                    </svg> */}
                                    <div className={styles.text}>
                                        <div className={styles.name}>{name}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className={styles.category}>
                    <div className={styles.name}>Writing</div>
                    <div className={styles.items}>
                        {[{ name: 'one' }].map(({ name }) => {
                            return (
                                <div key={name} className={styles.item}>
                                    {/* <svg width="154" height="168">
                                        <use href="#cartridge" />
                                    </svg> */}
                                    <div className={styles.text}>
                                        <div className={styles.name}>{name}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
