import styles from './page.module.scss';

export default function AboutPage() {
    return (
        <>
            <div className={styles.page}>
                <div className={styles.details}>
                    <header>
                        <div className={styles.company}>
                            <svg
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M8.5332 0H14.9332V32H8.5332V0Z" fill="black" />
                                <path d="M25.6001 0H32.0001V32H25.6001V0Z" fill="black" />
                                <rect x="4.2666" width="2.13333" height="32" fill="black" />
                                <rect x="17.0669" width="2.13333" height="32" fill="black" />
                                <rect width="2.13333" height="32" fill="black" />
                            </svg>
                        </div>
                    </header>
                    <main>
                        <div className={styles.row}>
                            <div className={styles.address}>
                                <div>
                                    <strong>Payed To</strong>
                                </div>
                                <div>NEXTDOTGOV</div>
                                <div>Springfield, VA 22152</div>
                                <div>invoice@nextdotgov.com</div>
                            </div>
                            <div className={styles.info}>
                                <div>
                                    <strong>Date Issued</strong>
                                </div>
                                <div>02 Feb 2026</div>
                            </div>
                            <div className={styles.info}>
                                <div>
                                    <strong>Receipt Number</strong>
                                </div>
                                <div>0002</div>
                                <br />
                                <div>
                                    <strong>Invoice Number</strong>
                                </div>
                                <div>0001</div>
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.address}>
                                <div>
                                    <strong>Billed To</strong>
                                </div>
                                <div>Alex Foos</div>
                            </div>
                        </div>
                        <div className={styles.grid}>
                            {/* Headers */}
                            <div>
                                <strong>Item</strong>
                            </div>
                            <div>
                                <strong>Project</strong>
                            </div>
                            <div className={styles.number}>
                                <strong>Hours</strong>
                            </div>
                            <div className={styles.number}>
                                <strong>Rate</strong>
                            </div>
                            <div className={styles.number}>
                                <strong>Price</strong>
                            </div>

                            {/* Item */}
                            <div>Software Development</div>
                            <div>v n t r</div>
                            <div className={styles.number}>67.5</div>
                            <div className={styles.number}>$100</div>
                            <div className={styles.number}>$6,750</div>

                            {/* <div
                                style={{
                                    gridColumn: 'span 5',
                                    height: '1in',
                                }}
                            /> */}
                        </div>

                        <div className={styles.grid}>
                            {/* Total */}
                            <div>{/* 1 */}</div>
                            <div>{/* 2 */}</div>
                            <div>{/* 3 */}</div>
                            <div>
                                <strong>Total</strong>
                            </div>
                            <div className={styles.number}>$6,750</div>

                            {/* Paid */}
                            <div>{/* 1 */}</div>
                            <div>{/* 2 */}</div>
                            <div>{/* 3 */}</div>
                            <div>
                                <strong>Paid</strong>
                            </div>
                            <div className={styles.number}>$4,750</div>

                            {/* Balance */}
                            <div>{/* 1 */}</div>
                            <div>{/* 2 */}</div>
                            <div>{/* 3 */}</div>
                            <div>
                                <strong>Balance Due</strong>
                            </div>
                            <div className={styles.number}>$0</div>
                        </div>
                    </main>
                </div>
                <footer>
                    <div>
                        <strong>EIN</strong> 39-3007349
                    </div>
                    <div>
                        <strong>Receipt Number</strong> 0002
                    </div>
                </footer>
            </div>
        </>
    );
}
