// @start-imports
import Link from "next/link";
import styles from './header.module.scss';
// @end-imports

// @start-export
export default function Header({ }) {
    return (
        <header id={styles['header']}>
            <Link href="/"> Stephen Matheis</Link>
        </header>
    )
};
// @end-export

// @start-component
<Header />
// @end-component