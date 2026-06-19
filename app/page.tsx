import Link from 'next/link';
import styles from './page.module.scss';

export default function Home() {
    return (
        <div className={styles.page}>
            <h1>Routes</h1>
            <nav>
                <ul>
                    <li>
                        <Link href="/canvas">/canvas</Link>
                    </li>
                    <li>
                        <Link href="/dom">/dom</Link>
                    </li>
                    <li>
                        <Link href="/grid">/grid</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
